import { AfterViewInit, Component, ViewChild } from '@angular/core';
//
@Component({
  selector: 'app-ocr',
  templateUrl: './ocr.component.html',
  styleUrl: './ocr.component.css'
})
export class OcrComponent {
  //
  //@ViewChild("signaturePad") signaturePad!: SignaturePad;
  //
  /*signaturePadOptions: Object = {
    'minWidth': 2,
    'canvasWidth': 500,
    'canvasHeight': 300
  };*/
  //
  ngAfterViewInit() {
    //
  }
  drawBegin() {
    // Do something when drawing begins
    console.log('Drawing began');
  }

  drawComplete() {
    // Do something when drawing is complete
    console.log('Drawing complete');
  }

  clearSignature() {
    // Clear the signature pad
    //this.signaturePad.clear();
  }
  //
  saveSignature() {
      //
  }
}
