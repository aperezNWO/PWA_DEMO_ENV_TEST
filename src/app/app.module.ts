import { NgModule              } from '@angular/core';
import { BrowserModule         } from '@angular/platform-browser';
import { NgxSignaturePadModule } from '@eve-sama/ngx-signature-pad';
import { AppRoutingModule      } from './app-routing.module';
import { AppComponent          } from './app.component';
import { OcrComponent          } from './Modules/ocr/ocr/ocr.component';

@NgModule({
  declarations: [
    AppComponent,
    OcrComponent,
  ],
  imports: [
    BrowserModule,
    NgxSignaturePadModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
