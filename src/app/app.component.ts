import { Component, VERSION, ViewChild                          } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from './Services/config.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
   //
   title          : string = 'PWA_DEMO_ENV_TEST';
   //
   _title         : string = '';
   _appName       : string = '';
   _appVersion    : string = '';
   runtimeVersion : string = VERSION.full;
   //
  constructor(private router: Router, private configService: ConfigService , private titleService : Title) {
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
    console.log(`${keyName} :  ${this.configService.getConfigValue(keyName)} `)
    //
    router.navigateByUrl('/Home');
  }
  //
  ngOnInit() {
      //
      this.titleService.setTitle(`${this._appName} ${this._appVersion}`);
  }
  //
  getValueFromConfig(key: string) {
    return this.configService.getConfigValue(key);
  }
}
