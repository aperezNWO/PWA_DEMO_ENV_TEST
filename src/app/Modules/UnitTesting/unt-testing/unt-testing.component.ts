import { Component        } from '@angular/core';
import { Router           } from '@angular/router';
import { AlgorithmService } from 'src/app/Services/algorithm.service';
import { Observable       } from 'rxjs';
//
@Component({
  selector: 'app-unt-testing',
  templateUrl: './unt-testing.component.html',
  styleUrl: './unt-testing.component.css',
})
//
export class UntTestingComponent {
  //
  protected lblStatusNodeJs: string = '';
  //
  protected BtnTestNodeJSCaption: string = '[TEST NODE.JS]';
  //
  constructor(
    private algorithmService: AlgorithmService,
    private router: Router,
  ) {
    //
  }
  //
  RedirectHome(): void {
    //
    this.router.navigateByUrl('/Home');
  }
  //
  TestNodeJs(): void {
    //
    console.log('[TEST NODE.JS] \n');
    //
    this.BtnTestNodeJSCaption = '...(retrieving data)...';
    //
    let testNodeJsObservable: Observable<string> =
      this.algorithmService._TestNodeJs();
    //
    const testNodeJsObserver = {
      next: (jsondata: string) => {
        //
        this.lblStatusNodeJs =
          JSON.parse(jsondata)['recordsets'][0][0]['nombreCompleto'];
        //
        console.log('[TEST - NODEJS] - (return): ' + this.lblStatusNodeJs);
        //
        this.BtnTestNodeJSCaption = '[TEST NODE.JS]';
      },
      error: (err: Error) => {
        //
        console.error(
          '[TEST - NODEJS] - (ERROR) : ' + JSON.stringify(err.message),
        );
      },
      complete: () => {
        //
        console.log('[TEST - NODEJS]  -  (COMPLETE)');
        //
      },
    };
    //
    testNodeJsObservable.subscribe(testNodeJsObserver);
  }
}
