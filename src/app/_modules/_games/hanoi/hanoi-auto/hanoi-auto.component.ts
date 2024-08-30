import { Component, OnInit           } from '@angular/core';
import { HanoiEngine                 } from 'src/app/_engines/hanoi-engine';
//
@Component({
  selector: 'app-hanoi-auto',
  templateUrl: './hanoi-auto.component.html',
  styleUrl: './hanoi-auto.component.css'
})
//
export class HanoiAutoComponent implements OnInit {

    constructor(public hanoiEngine : HanoiEngine)
    {
        this.hanoiEngine.newGame();
        this.hanoiEngine.startGame();       
    }

    //
    ngOnInit() {
      this.hanoiEngine.resetGame();
    }
 
}



