import { Component          } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router             } from '@angular/router';
import { ConfigService      } from 'src/app/_services/config.service';
import { CustomErrorHandler, LoggingInterceptor } from 'src/app/app.module';
//
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  // 
  _appBrand      : string = '';
  _appVersion    : string = '';
  _title         : string = '';
  //
  constructor(private titleService: Title, private configService: ConfigService,public customErrorHandler : CustomErrorHandler,public loggingInterceptor : LoggingInterceptor) {
    // IMPLEMENT AS MAP AND ITERATE
    this._appBrand   = this.configService.getConfigValue("appBrand");
    this._appVersion = this.configService.getConfigValue("appVersion");
    //
    this._title = this._appBrand + " -- v[" + this._appVersion + "]";
    //
    console.log(this._title);
    //
    this.titleService.setTitle(this._title);
  }
}
