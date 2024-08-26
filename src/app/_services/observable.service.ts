import { Injectable } from '@angular/core';
import { BehaviorSubject, concatMap, delay, from, interval, map, Observable, of, scan, Subject, take, tap } from 'rxjs';

//
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
      //
      this.TestHanoi();
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
  TestHanoi()
  {
      /*
      //
      let rods$: BehaviorSubject<number[][]> | undefined;
      let moves$: Observable<number[][]> | undefined;

    rods$ = new BehaviorSubject<number[][]>([
      [3, 2, 1],
      [],
      []
    ]);

    moves$ = rods$.pipe(
      scan((state, rods) => {

  
        
        const fromIndex = rods.findIndex(rod => rod.length > 0);
        const toIndex = rods.findIndex(rod => rod.length === 0 || rod[rod.length - 1] > rods[fromIndex][rods[fromIndex].length - 1]);

        if (fromIndex !== -1 && toIndex !== -1) {
          const disk = rods[fromIndex].pop()!;
          rods[toIndex].push(disk);

          console.log('hanoi disk : ' + rods)
        }

        return rods;
      }, rods$.value)
    );

    moves$.subscribe({
      next(value) { console.log('Hanoi next value: ' + value); },
      error(err)  { console.error('Hanoi emitted an error: ' + err); },
      complete()  { console.log('Hanoi complete notification'); }
    });
    */
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
