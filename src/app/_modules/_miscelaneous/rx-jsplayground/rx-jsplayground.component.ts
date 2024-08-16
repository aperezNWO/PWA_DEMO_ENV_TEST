import { Component } from '@angular/core';
import { Observable, Observer, of } from 'rxjs';

@Component({
  selector: 'app-rx-jsplayground',
  templateUrl: './rx-jsplayground.component.html',
  styleUrl: './rx-jsplayground.component.css'
})
export class RxJSPlaygroundComponent {
  //
  public numbers$ = of(1, 2, 3);
  //
  constructor()
  {
     // 
     this.numbers$.subscribe({
      next(value : number){
        //
        console.log('Observable emitted the next value: ' + value); 
        //
        //this.currentValue = value;
      },
      error(err)  { console.error('Observable emitted an error: ' + err); },
      complete()  { console.log('Observable emitted the complete notification'); }
    });
  }
}
