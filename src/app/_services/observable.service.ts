import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObservableService {
  //
  private _currentValue : any[] = [];
 //
  public numbers$ = of(1, 2, 3);
  //
  public constructor()
  {
    //
    this.numbers$.subscribe(() => {
      console.log('Observable emitted the next value from service to array : ' + 1);
      this._currentValue.push(1);
    });
    /*
    // 
    this.numbers$.subscribe({
      next(value : number){
       //
       console.log('Observable emitted the next value from service : ' + value);
       //
     },
     error(err)  { console.error('Observable emitted an error: ' + err); },
     complete()  { console.log('Observable emitted the complete notification');
     }
   });*/
  }
  //
  public get CurrentValue()
  {
     return this._currentValue
  }

  public get Numbers()
  {
      return this.numbers$
  }
}
