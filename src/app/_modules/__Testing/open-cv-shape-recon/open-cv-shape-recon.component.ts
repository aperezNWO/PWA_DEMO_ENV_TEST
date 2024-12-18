import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
//import * as cv from '@techstark/opencv-js';
//declare var cv: any;

@Component({
  selector: 'app-open-cv-shape-recon',
  templateUrl: './open-cv-shape-recon.component.html',
  styleUrl: './open-cv-shape-recon.component.css'
})
export class OpenCvShapeReconComponent {
 
  @ViewChild('canvas', { static: true })  canvas!: ElementRef<HTMLCanvasElement>;

  isOpenCVLoaded = false;
/*


  private src: any;
  private dst: any;
  private cap: any;

  ngOnInit() {
      /*
      // Load OpenCV script dynamically
      const script = document.createElement('script');
      script.src = 'https://docs.opencv.org/4.5.2/opencv.js';
      script.async = true;

      script.onload = () => {
        // Use onRuntimeInitialized to ensure OpenCV is fully loaded
        //cv.onRuntimeInitialized = () => {
        //  this.initializeOpenCV();
        //};
      };

      document.body.appendChild(script);
    /*
    // Initialize OpenCV.js
    cv.onRuntimeInitialized = () => {
      this.startVideo();
    };
  }*/
  /*
  private initializeOpenCV() {
    // Check if OpenCV is loaded correctly
    try {
      // Create a simple Mat to verify initialization
      //const mat = new cv.Mat(200, 200, cv.CV_8UC3, [0, 0, 255]);
      
      // Mark OpenCV as loaded
      this.isOpenCVLoaded = true;

      // Optional: Perform initial processing
      //this.performInitialProcessing(mat);

      // Don't forget to release the matrix to prevent memory leaks
      // mat.delete();
    } catch (error) {
      console.error('OpenCV initialization failed:', error);
      this.isOpenCVLoaded = false;
    }
  }

  private performInitialProcessing(mat: any) {
    // Example of basic image processing
    try {
      // Convert to grayscale
      const grayMat = new cv.Mat();
      cv.cvtColor(mat, grayMat, cv.COLOR_RGBA2GRAY);

      // Release the grayscale matrix
      grayMat.delete();
    } catch (error) {
      console.error('Initial processing error:', error);
    }
  }

  startVideo() {
    const canvas = this.canvas?.nativeElement;
    const context = canvas?.getContext('2d');

    this.cap = new cv.VideoCapture(0); 
    this.src = new cv.Mat();
    this.dst = new cv.Mat();

    const processVideo = () => {
      try {
        this.cap.read(this.src); 

        // Convert to grayscale
        cv.cvtColor(this.src, this.dst, cv.COLOR_RGBA2GRAY);

        // Apply thresholding
        cv.threshold(this.dst, this.dst, 100, 255, cv.THRESH_BINARY);

        // Find contours
        let contours = new cv.MatVector();
        let hierarchy = new cv.Mat();
        cv.findContours(this.dst, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);

        // Draw contours
        //context?.drawImage(this.src.getCanvas(), 0, 0, canvas?.width, canvas?.height); 
        for (let i = 0; i < contours.size(); ++i) {
          let color = new cv.Scalar(255, 0, 0); // Red
          cv.drawContours(this.src, contours, i, color, 1, cv.LINE_8, hierarchy, 0); 

          // Approximate contour to polygon
          let approx = new cv.Mat();
          cv.approxPolyDP(contours.get(i), approx, 0.04 * cv.arcLength(contours.get(i), true), true);

          // Shape classification (basic)
          let count = approx.rows;
          let area = cv.contourArea(contours.get(i));
          let isCircle = false;

          if (count == 3) {
            context?.fillText('Triangle', approx.data32S[0], approx.data32S[1]); 
          } else if (count == 4) {
            context?.fillText('Rectangle/Square', approx.data32S[0], approx.data32S[1]);
          } else if (count > 4 && area > 200) { // Basic circle approximation
            isCircle = true;
            context?.fillText('Circle', approx.data32S[0], approx.data32S[1]);
          }

          approx.delete();
        }

        contours.delete();
        hierarchy.delete();

        // Display the resulting frame
        //context?.drawImage(this.src.getCanvas(), 0, 0, canvas.width, canvas.height); 
      } catch (err) {
        console.error(err);
      } finally {
        requestAnimationFrame(processVideo);
      }
    };

    requestAnimationFrame(processVideo); 
  }*/

    uploadImage(event: any) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const imageDataURL = reader.result as string;
        this.processImage(imageDataURL);
      };
      reader.readAsDataURL(file);
    }

    processImage(imageDataURL: string) {
      this.isOpenCVLoaded = true;
      /*
      // Convert image to OpenCV mat
      const mat = cv.imread(this.canvas?.nativeElement);
      cv.imshow(this.canvas?.nativeElement, mat);

  
      // Convert image to grayscale and apply threshold
      const gray = new cv.Mat();
      cv.cvtColor(mat, gray, cv.COLOR_RGBA2GRAY, 0);
      const thresh = new cv.Mat();
      cv.threshold(gray, thresh, 0, 255, cv.THRESH_BINARY_INV + cv.THRESH_OTSU);
  
      // Find contours
      const contours = new cv.MatVector();
      cv.findContours(thresh, contours, new cv.Mat(), cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);
  
      // Loop through contours and recognize shapes
      for (let i = 0; i < contours.size(); i++) {
        const contour = contours.get(i);
        const area = cv.contourArea(contour);
        const peri = cv.arcLength(contour, true);
        const approx = new cv.Mat();
        cv.approxPolyDP(contour, approx, 0.02 * peri, true);
  
        if (area > 100) { // Ignore small contours
          const sideCount = approx.rows;
          if (sideCount === 3) {
            console.log('Triangle detected');
            // Draw a triangle around the contour
            cv.drawContours(mat, [contour], -1, [0, 255, 0], 2);
          } else if (sideCount === 4) {
            console.log('Square or Rectangle detected');
            // Draw a rectangle around the contour
            cv.drawContours(mat, [contour], -1, [0, 0, 255], 2);
          } else if (sideCount >= 8) { // Approximation for a circle
            console.log('Circle detected');
            // Draw a circle around the contour
            cv.drawContours(mat, [contour], -1, [255, 0, 0], 2);
          }
        }
      }
  
      // Display the resulting image
      cv.imshow(this.canvas?.nativeElement, mat);
  
      // Release mats
      mat.delete();
      gray.delete();
      thresh.delete();
      contours.delete();
      */
    }
}
