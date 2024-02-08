import { Component          } from '@angular/core';
import { Router             } from '@angular/router';
import { ConfigService      } from 'src/app/Services/config.service';
import { CustomErrorHandler, LoggingInterceptor } from 'src/app/app.module';
//
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  // 
  _appName       : string = '';
  _appVersion    : string = '';
  title          : string = '';
  //
  constructor(private router: Router, private configService: ConfigService,public customErrorHandler : CustomErrorHandler,public loggingInterceptor : LoggingInterceptor) {
    // IMPLEMENT AS MAP AND ITERATE
    let keyName  : string = '';
    let keyValue : string = '';
    //
    keyName  = 'appName';
    keyValue = this.configService.getConfigValue(keyName);
    //
    this._appName = keyValue;
    //
    keyName          = 'appVersion';
    keyValue         = this.configService.getConfigValue(keyName);
    this._appVersion = keyValue;
    //
    console.log(`${keyName} :  ${this.configService.getConfigValue(keyName)}`);
    //
    this.title = this._appName + " -- v[" + this._appVersion + "]";
  }
}
