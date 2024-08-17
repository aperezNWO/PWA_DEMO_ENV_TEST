import { Injectable } from '@angular/core';
import { concatMap, delay, from, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObservableService {
  //
  private _currentValue : any[] = [];
 //
  public numbers$ = of(1, 2, 3);
  //
  public delayedObservable : any;
  //
  public constructor()
  {
    //
    this.delayedObservable = from(this.numbers$).pipe(
      concatMap(value => of(value).pipe(delay(1000)))
    );
    //
    this.delayedObservable.subscribe((value: number) => {
      console.log('Observable emitted the next value from service to array : ' + value);
      this._currentValue.push(value);
    });
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
