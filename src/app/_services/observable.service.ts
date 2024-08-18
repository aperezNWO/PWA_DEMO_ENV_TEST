import { Injectable } from '@angular/core';
import { BehaviorSubject, concatMap, delay, from, interval, map, of, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObservableService {

  // --------------------------------------------------------
  // BASIC OBSERVABLE
  // --------------------------------------------------------
  private _currentValue : any[] = [];
  //
  public numbers$ = of(1, 2, 3);
  //
  public delayedObservable : any;

  // --------------------------------------------------------
  // BEHAVIOUR SUBJECT
  // --------------------------------------------------------
  private items        = ['a', 'b', 'c', 'd', 'e'];
  private itemSubject = new BehaviorSubject<string | null>(null);
  private currentItem$ = this.itemSubject.asObservable();

  //
  public constructor()
  {
      //
      this.TestBasicObservable();
      //
      this.TestBehaviourSubject();
  }
  //
  TestBasicObservable()
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
   TestBehaviourSubject()
   { //
      interval(1000)
      .pipe(
        take(this.items.length),
        map((index: number) => this.items[index])
      )
      .subscribe((item) => {
          
          console.log("Behaviour subject item : " + item);

          this.itemSubject.next(item)

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

  public get CurrentItem()
  {
      return this.currentItem$;
  }
}
