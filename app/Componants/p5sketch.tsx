import React, { useRef, useEffect } from 'react';
import p5 from 'p5';
import Link from 'next/link';

interface P5SketchProps {
  // Add props if you need to pass data into the sketch
}

const P5Sketch: React.FC<P5SketchProps> = () => {
  const sketchRef = useRef<HTMLDivElement>(null);

  let words = ["Sketch.al"];
  let myFont: any; // Variable for custom font
  let points: any[] = []; // Variable for storing the points of the text outline
  let textBox: any; // Variable for storing the dimensions of the bounding box
  let fSize = 310; // Default font size
  let ease = 0.3;
  const date = new Date().toDateString().toUpperCase();
  let objectSize = 28; // Default size for objects
  let textSize = 16; // Default text size
  let objects: {
    x: number;
    y: number;
    size: number;
    originalSize: number;
    sizeOffset: number;
    hovered: boolean;
  }[] = [];

  const isMobile = () => window.innerWidth <= 768;

  const adjustForMobile = () => {
    if (isMobile()) {
      fSize = 110; // Adjust font size for mobile
      objectSize = 13; // Adjust object size for mobile
      textSize = 8; // Adjust text size for mobile
    }
  };

  useEffect(() => {
    adjustForMobile();

    const sketch = (p: p5) => {
      p.preload = () => {
        myFont = p.loadFont("/assets/TestFoundersGrotesk-Regular.otf");
      };

      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);

        points = myFont.textToPoints(p.random(words), 0, 0, fSize, {
          sampleFactor: 0.08, // Reduce number of points
        });

        // Initialize objects
        for (let pt of points) {
          objects.push({
            x: pt.x + p.width / 2 - fSize*1.75,
            y: pt.y + p.height / 2 + 100,
            size: objectSize,
            originalSize: objectSize,
            sizeOffset: 50,
            hovered: false,
          });
        }

        textBox = myFont.textBounds(words[0], 0, 0, fSize);
        p.frameRate(30); // Increase frame rate for smoother visuals
      };

      p.draw = () => {
        p.background(0);

        p.textSize(textSize);
        p.textStyle(p.NORMAL);
        p.fill(255, 255, 255);
        p.text(`X: ${p.mouseX} Y: ${p.mouseY}`, 8, 20);
        p.text(`${date}`, 8, 40);
        p.text(`DIGITAL SKETCHBOOK:  @Archie_Lennon`, 8, 60);
       
  

        
        // Check hover only once per frame
        for (let obj of objects) {
          obj.hovered =
            p.mouseX > obj.x - obj.size / 2 &&
            p.mouseX < obj.x + obj.size / 2 &&
            p.mouseY > obj.y - obj.size / 2 &&
            p.mouseY < obj.y + obj.size / 2;
        }

        // Easing function to smoothly adjust the size
        for (let obj of objects) {
          let targetSize = obj.hovered
            ? obj.originalSize + obj.sizeOffset
            : obj.originalSize;

          obj.size += (targetSize - obj.size) * ease;

          p.rectMode(p.CENTER);
          p.noStroke();
          p.fill(255, 255, 255); // Or change to another color
          p.rect(obj.x, obj.y, obj.size, obj.size);
        }
      };
    };

    const p5Instance = new p5(sketch, sketchRef.current!);

    return () => {
      // Cleanup the p5 instance on component unmount
      p5Instance.remove();
    };
  }, []);

  return <div ref={sketchRef} />;
};

export default P5Sketch;
