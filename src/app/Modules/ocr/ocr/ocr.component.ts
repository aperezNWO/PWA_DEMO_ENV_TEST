import { Component, ViewChild                          } from '@angular/core';
import { NgxSignaturePadComponent } from '@eve-sama/ngx-signature-pad/lib/ngx-signature-pad.component';
import { NgxSignatureOptions } from '@eve-sama/ngx-signature-pad/lib/types/ngx-signature-pad';

//
@Component({
  selector: 'app-ocr',
  templateUrl: './ocr.component.html',
  styleUrls: ['./ocr.component.css']
})
export class OcrComponent {
  /** Catch object, call functions via instance object */
  @ViewChild('signature') signature: NgxSignaturePadComponent | undefined;
  /** You can see more introduction in the below about NgxSignatureOptions */
  public options: NgxSignatureOptions = {
    backgroundColor: '#F4F5F5',
    width : 100,
    height: 100,
    css: {
      'border-radius': '16px'
    }
  };
  /** The begin event of sign */
  onBeginSign(): void { }
 
  /** The end event of sign */
  onEndSign(): void { }
  //
  saveSignature() {
     //
     console.log("Saving signature...");
     // PNG
     let dataUrl : string  = this.signature?.toDataURL()!;
     console.log('Data URL:', dataUrl);

     // Create an anchor element
     const downloadLink : HTMLAnchorElement = document.createElement('a');

     // Set href attribute with the data URL
     downloadLink.href = dataUrl;

     // Set a suggested filename for the download
     downloadLink.download = 'signature.png';

     // Append the anchor to the body
     document.body.appendChild(downloadLink);

     // Trigger a click event on the anchor
     downloadLink.click();

     // Remove the anchor from the body
     document.body.removeChild(downloadLink);
  }
  // Trigger a click event on the anchor
  clearSignature() {
     //
     console.log("clearing signature...");
     // PNG
     this.signature?.clear();
  }
}
