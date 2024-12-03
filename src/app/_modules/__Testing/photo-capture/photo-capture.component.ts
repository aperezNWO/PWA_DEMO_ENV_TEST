import { Component, ElementRef, ViewChild } from '@angular/core';
import { saveAs                           } from 'file-saver';
import { MCSDService } from 'src/app/_services/mcsd/mcsd.service';

@Component({
  selector: 'app-photo-capture',
  templateUrl: './photo-capture.component.html',
  styleUrl: './photo-capture.component.css'
})
export class PhotoCaptureComponent {
  @ViewChild('video') video!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;

  capturedImage: string | null = null;

  status       : string | null = null;      
  //
  constructor(public mcsdService : MCSDService)
  {

  }

  ngAfterViewInit() {
    this.startCamera();
  }

  startCamera() {
    navigator.mediaDevices.getUserMedia({ 
      video: { facingMode: { exact: 'environment' } }, // Outward-facing camera
    }).then((stream) => {
        this.video.nativeElement.srcObject = stream;
      })
      .catch((err) => {
        console.error('Error accessing camera:', err);
      });
  }

  capturePhoto() {
    const video = this.video.nativeElement;
    const canvas = this.canvas.nativeElement;
    const context = canvas.getContext('2d');

    if (context) {

      canvas.width = video.videoWidth / 4;
      canvas.height = video.videoHeight / 4;

      console.log("width: " + canvas.width + " height: " + canvas.height);

      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      this.capturedImage = canvas.toDataURL('image/png');
    }
  }

  saveImage() {
    if (this.capturedImage) {
      //const blob = this.dataURLToBlob(this.capturedImage);
      //saveAs(blob, 'captured-photo.png');
      this.uploadImage(this.capturedImage)
    }
  }

  dataURLToBlob(dataURL: string): Blob {
    const byteString = atob(dataURL.split(',')[1]);
    const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
    const byteArray = new Uint8Array(byteString.length);

    for (let i = 0; i < byteString.length; i++) {
      byteArray[i] = byteString.charCodeAt(i);
    }

    return new Blob([byteArray], { type: mimeString });
  }

  uploadImage(base64ImageString : string):void {
    // Replace 'yourBase64ImageString' with the actual base64 image string
    //const base64ImageString = 'yourBase64ImageString';
    //this.statusButton = '..parsing..';
    //
    this.mcsdService.uploadBase64Image(base64ImageString).subscribe(
      (response) => {
        console.log('Image uploaded successfully:', response);
        //
        this.status = JSON.parse(JSON.stringify(response))['message'];
        //this.statusButton = '[save]';
      },
      (error) => {
        //
        console.error('Error uploading image:', error);
        //
        //this.status = error;
        //
        //this.statusButton = '[save]';
      }
    );
  }
}
