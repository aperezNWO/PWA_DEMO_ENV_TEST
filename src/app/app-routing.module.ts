import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Modules/home/home.component';
import { SudokuComponent } from './Modules/Games/sudoku/sudoku.component';
import { TicTacToeComponent } from './Modules/Games/tic-tac-toe/offline/tic-tac-toe.component';
import { TicTacToeOnlineComponent } from './Modules/Games/tic-tac-toe/tic-tac-toe-online/tic-tac-toe-online.component';
import { HanoiTowersComponent } from './Modules/Games/hanoi-towers/game-hanoi.component';
import { UntTestingComponent } from './Modules/UnitTesting/unt-testing/unt-testing.component';
import { OcrComponent } from './Modules/ocr/ocr/ocr.component';
import { ChatComponent } from './Modules/chat/chat/chat.component';
import { AppComponent } from './app.component';
import { Html404Component } from './html404/html404.component';

//
const routes : Routes = [
  { path: 'Home'             , component: HomeComponent              },
  { path: ''                 , component: HomeComponent              },
  { path: 'Sudoku'           , component: SudokuComponent            },
  { path: 'TicTacToe'        , component: TicTacToeComponent         },
  { path: 'TicTacToeOnline'  , component: TicTacToeOnlineComponent   },
  { path: 'Hanoi'            , component: HanoiTowersComponent       },
  { path: 'UnitTesting'      , component: UntTestingComponent        },
  { path: 'Chat'             , component: ChatComponent              },
  { path: 'Ocr'              , component: OcrComponent               },
  { path: '**'               , component: Html404Component           },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
