import { Injectable } from '@angular/core';
import { BehaviorSubject, concatMap, delay, from, interval, map, Observable, of, scan, Subject, take, tap } from 'rxjs';
//  TEST BASIC OBSERVABLE
let numbers$ = of(1, 2, 3,4,5);
let _currentValue: any[] = [];
let _delayedObservable: any;
// TEST BEHAVIOUR SUBJECT
let items         = ['a', 'b', 'c', 'd', 'e'];
let itemSubject   = new BehaviorSubject<string | null>(null);
let currentItem$  = itemSubject.asObservable();
// TEST HANOI
let _delayedObservableHanoi: any;
//
function TestBehaviourSubject() {

  //
  interval(1000)
    .pipe(
      take(items.length),
      map((index: number) => items[index])
    )
    .subscribe({
      next(item) { 

          console.log("Behaviour subject item : " + item); 
          
          itemSubject.next(item)
      },
      error(err) { console.error('Behaviour subject erro: ' + err); },
      complete() {
        //  
        console.log('Behaviour subject complete notification');
        //
        TestHanoi();
      }
    })
}
//
function TestHanoi() {
  //
  const values = ['A', 'B', 'C', 'D', 'E'];
  const delayTime = 1000; // Delay in milliseconds
  //
  _delayedObservableHanoi = from(values).pipe(
    concatMap(value => of(value).pipe(delay(delayTime)))
  );
 //
  _delayedObservableHanoi.subscribe({
      next(result: any) { console.log(`Hanoi emitted Result: ${result}`); },
      error(err: string) { console.error('Hanoi emitted an error: ' + err); },
      complete() {
        //  
        console.log('Hanoi complete notification');
      }
    });
}
//
@Injectable({
  providedIn: 'root'
})
export class ObservableService {
  //
  public constructor() {
    //
    this.TestBasicObservable();
  }
  //
  TestBasicObservable() {
    //
    _delayedObservable = from(numbers$).pipe(
      concatMap(value => of(value).pipe(delay(1000)))
    );
    //
    _delayedObservable.subscribe({
      next(value: number) {
        //
        console.log('Observable emitted the next value from service to array : ' + value);
        _currentValue.push(value);
      },
      error(err: string) { console.error('Behaviour subject erro: ' + err); },
      complete() {
        //
        console.log('Observable complete notification');
        //
        TestBehaviourSubject();
      }
    });
  }
  //
  public get CurrentValue() {
    return _currentValue
  }

  public get Numbers() {
    return numbers$
  }

  public get CurrentItem() {
    return currentItem$;
  }

  public get delayedObservable() {
    return _delayedObservable;
  }

  
  public get delayedObservableHanoi() {
    return _delayedObservableHanoi;
  }
}
