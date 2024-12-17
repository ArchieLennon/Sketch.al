import React, { useRef, useEffect } from 'react';
import p5 from 'p5';

interface P5SketchProps {
  // Add props if you need to pass data into the sketch
}

const P5Sketch: React.FC<P5SketchProps> = () => {
  const sketchRef = useRef<HTMLDivElement>(null);

  const words = ["Sketch.al"];
  const fSize = useRef(310); // Font size, mutable for mobile adjustment
  const ease = 0.3;
  const date = new Date().toDateString().toUpperCase();
  const objectSize = useRef(28); // Default size for objects
  const textSize = useRef(16); // Default text size

  const myFont = useRef<any>(null); // Ref for custom font
  const points = useRef<any[]>([]); // Ref for storing text points
  const textBox = useRef<any>(null); // Ref for bounding box dimensions
  const objects = useRef<
    {
      x: number;
      y: number;
      size: number;
      originalSize: number;
      sizeOffset: number;
      hovered: boolean;
    }[]
  >([]);

  const isMobile = () => window.innerWidth <= 768;

  const adjustForMobile = () => {
    if (isMobile()) {
      fSize.current = 110; // Adjust font size for mobile
      objectSize.current = 13; // Adjust object size for mobile
      textSize.current = 8; // Adjust text size for mobile
    }
  };

  useEffect(() => {
    adjustForMobile();

    const sketch = (p: p5) => {
      p.preload = () => {
        myFont.current = p.loadFont("/assets/TestFoundersGrotesk-Regular.otf");
      };

      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);

        // Generate points for the text
        points.current = myFont.current.textToPoints(
          p.random(words),
          0,
          0,
          fSize.current,
          { sampleFactor: 0.08 } // Reduce number of points
        );

        // Initialize objects based on points
        objects.current = points.current.map((pt) => ({
          x: pt.x + p.width / 2 - fSize.current * 1.75,
          y: pt.y + p.height / 2 + 100,
          size: objectSize.current,
          originalSize: objectSize.current,
          sizeOffset: 50,
          hovered: false,
        }));

        // Get bounding box for text
        textBox.current = myFont.current.textBounds(
          words[0],
          0,
          0,
          fSize.current
        );

        p.frameRate(30); // Smoother visuals
      };

      p.draw = () => {
        p.background(0);

        // Display mouse coordinates and date
        p.textSize(textSize.current);
        p.textStyle(p.NORMAL);
        p.fill(255, 255, 255);
        p.text(`X: ${p.mouseX} Y: ${p.mouseY}`, 8, 20);
        p.text(`${date}`, 8, 40);
        p.text(`DIGITAL SKETCHBOOK:  @Archie_Lennon`, 8, 60);

        // Check hover state for each object
        objects.current.forEach((obj) => {
          obj.hovered =
            p.mouseX > obj.x - obj.size / 2 &&
            p.mouseX < obj.x + obj.size / 2 &&
            p.mouseY > obj.y - obj.size / 2 &&
            p.mouseY < obj.y + obj.size / 2;
        });

        // Smoothly animate object sizes
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
      // Cleanup p5 instance
      p5Instance.remove();
    };
  }, []);

  return <div ref={sketchRef} />;
};

export default P5Sketch;
