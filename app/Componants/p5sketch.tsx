import React, { useRef, useEffect, useCallback } from 'react';
import p5 from 'p5';

const P5Sketch: React.FC = () => {
  const sketchRef = useRef<HTMLDivElement>(null);

  const words = ["Sketch.al"];
  const date = new Date().toDateString().toUpperCase();
  const fSize = useRef(310);
  const objectSize = useRef(28);
  const textSize = useRef(16);

  const myFont = useRef<any>(null);
  const points = useRef<any[]>([]);
  const textBox = useRef<any>(null);
  const objects = useRef<any[]>([]);
  const ease = 0.3;

  const isMobile = () => window.innerWidth <= 768;

  // Memoize the function to avoid unnecessary re-creations
  const adjustForMobile = useCallback(() => {
    if (isMobile()) {
      fSize.current = 110;
      objectSize.current = 13;
      textSize.current = 8;
    }
  }, []);

  useEffect(() => {
    adjustForMobile();

    const sketch = (p: p5) => {
      p.preload = () => {
        myFont.current = p.loadFont("/assets/TestFoundersGrotesk-Regular.otf");
      };

      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);

        points.current = myFont.current.textToPoints(
          p.random(words), // Safe to use `words` here
          0,
          0,
          fSize.current,
          { sampleFactor: 0.08 }
        );

        objects.current = points.current.map((pt) => ({
          x: pt.x + p.width / 2 - fSize.current * 1.75,
          y: pt.y + p.height / 2 + 100,
          size: objectSize.current,
          originalSize: objectSize.current,
          sizeOffset: 50,
          hovered: false,
        }));

        textBox.current = myFont.current.textBounds(
          words[0],
          0,
          0,
          fSize.current
        );

        p.frameRate(30);
      };

      p.draw = () => {
        p.background(0);

        p.textSize(textSize.current);
        p.textStyle(p.NORMAL);
        p.fill(255, 255, 255);
        p.text(`X: ${p.mouseX} Y: ${p.mouseY}`, 8, 20);
        p.text(`${date}`, 8, 40);
        p.text(`DIGITAL SKETCHBOOK:  @Archie_Lennon`, 8, 60);

        objects.current.forEach((obj) => {
          obj.hovered =
            p.mouseX > obj.x - obj.size / 2 &&
            p.mouseX < obj.x + obj.size / 2 &&
            p.mouseY > obj.y - obj.size / 2 &&
            p.mouseY < obj.y + obj.size / 2;
        });

        objects.current.forEach((obj) => {
          const targetSize = obj.hovered
            ? obj.originalSize + obj.sizeOffset
            : obj.originalSize;

          obj.size += (targetSize - obj.size) * ease;

          p.rectMode(p.CENTER);
          p.noStroke();
          p.fill(255, 255, 255);
          p.rect(obj.x, obj.y, obj.size, obj.size);
        });
      };
    };

    const p5Instance = new p5(sketch, sketchRef.current!);

    return () => {
      p5Instance.remove();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adjustForMobile]); // Only `adjustForMobile` is a dependency

  return <div ref={sketchRef} />;
};

export default P5Sketch;
