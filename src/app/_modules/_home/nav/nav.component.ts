import { Component, VERSION                     } from '@angular/core';
import { Title                                  } from '@angular/platform-browser';
import { Router                                 } from '@angular/router';
import { ConfigService                          } from 'src/app/_services/config.service';
import { CustomErrorHandler, LoggingInterceptor } from 'src/app/app.module';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  //
  title          : string = 'PWA_DEMO_ENV_TEST';
  //
  _brand         : string = '';
  _title         : string = '';
  _appName       : string = '';
  _appVersion    : string = '';
  runtimeVersion : string = VERSION.full;
  //
  pages =[
    {
      'url' : '/Home',
      'text': '[Home]',
    },
    {
      'url': '/Dev',
      'text': '[Dev]',
    },
    {
      'url': '/SCM', 
      'text': '[SCM]',
    },
    {
      'url': '/Topics', 
      'text': '[Topics]',
    }    
  ];
  //
  private  navbarCollapsed     : boolean = true;
  //
  public get NavbarCollapsed() : boolean {
    //
    return this.navbarCollapsed;
  }
  //
  public set NavbarCollapsed(p_navbarCollapsed: boolean) {
        //
        this.navbarCollapsed = p_navbarCollapsed;
  }
  //
  constructor(public router: Router, private configService: ConfigService , private titleService : Title, public customErrorHandler: CustomErrorHandler, public loggingInterceptor : LoggingInterceptor) {
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
    this._title = `${this._appName} ${this._appVersion}`;
    //
    this._brand = this._appName;
    //
    //router.navigateByUrl('/Home');
  }
  //
  ngOnInit() {
    //
    this.titleService.setTitle(this._title);
    //
    this.NavbarCollapsed = false;
  }
}
