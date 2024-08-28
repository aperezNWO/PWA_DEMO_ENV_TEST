import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AsyncPipe, NgFor } from '@angular/common';;

interface Disk {
  size: number;
}

@Component({
  selector: 'app-hanoi-tower',
  template: `
    <div class="game-container">
      <div *ngFor="let tower of towers$ | async; let i = index" class="tower">
        <h2>Tower {{ i + 1 }}</h2>
        <div class="disks-container">
          <div *ngFor="let disk of tower" class="disk" [style.width.px]="disk.size * 20">
            {{ disk.size }}
          </div>
        </div>
        <button (click)="selectTower(i)">Select</button>
      </div>
    </div>
    <div>
      <p>Moves: {{ moves$ | async }}</p>
      <button (click)="resetGame()">Reset Game</button>
    </div>
  `,
  styles: [`
    .game-container {
      display: flex;
      justify-content: space-around;
    }
    .tower {
      text-align: center;
    }
    .disks-container {
      display: flex;
      flex-direction: column-reverse;
      align-items: center;
      height: 200px;
    }
    .disk {
      height: 20px;
      background-color: #007bff;
      margin: 2px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
    }
  `],
})
export class HanoiTowerComponent implements OnInit {
  private gameState$ = new BehaviorSubject<Disk[][]>([
    [{ size: 3 }, { size: 2 }, { size: 1 }],
    [],
    []
  ]);

  towers$: Observable<Disk[][]> = this.gameState$.asObservable();

  private movesSubject$ = new BehaviorSubject<number>(0);
  moves$: Observable<number> = this.movesSubject$.asObservable();

  private selectedTower: number | null = null;

  ngOnInit() {
    this.resetGame();
  }

  selectTower(towerIndex: number) {
    if (this.selectedTower === null) {
      this.selectedTower = towerIndex;
    } else {
      this.moveDisk(this.selectedTower, towerIndex);
      this.selectedTower = null;
    }
  }

  moveDisk(fromTower: number, toTower: number) {
    const currentState = this.gameState$.getValue();
    const diskToMove = currentState[fromTower].pop();

    if (diskToMove) {
      const targetTower = currentState[toTower];
      if (targetTower.length === 0 || targetTower[targetTower.length - 1].size > diskToMove.size) {
        targetTower.push(diskToMove);
        this.gameState$.next(currentState);
        this.movesSubject$.next(this.movesSubject$.getValue() + 1);
        this.checkWinCondition();
      } else {
        currentState[fromTower].push(diskToMove);
      }
    }
  }

  resetGame() {
    this.gameState$.next([
      [{ size: 3 }, { size: 2 }, { size: 1 }],
      [],
      []
    ]);
    this.movesSubject$.next(0);
    this.selectedTower = null;
  }

  private checkWinCondition() {
    const currentState = this.gameState$.getValue();
    if (currentState[2].length === 3) {
      console.log('Congratulations! You solved the puzzle!');
      // You can add more win condition logic here
    }
  }
}