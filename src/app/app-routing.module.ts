import { NgModule                     } from '@angular/core';
import { RouterModule, Routes          } from '@angular/router';
import { HomeComponent                 } from './_modules/_home/home.component';
import { SudokuComponent               } from './_modules/_games/sudoku/sudoku.component';
import { TicTacToeComponent            } from './_modules/_games/tic-tac-toe/offline/tic-tac-toe.component';
import { TicTacToeOnlineComponent      } from './_modules/_games/tic-tac-toe/tic-tac-toe-online/tic-tac-toe-online.component';
import { UntTestingComponent           } from './_modules/_unitTesting/nodejstesting/unt-testing.component';
import { HanoiTowersComponent          } from './_modules/_games/hanoi-towers/game-hanoi.component';
import { ChatComponent                 } from './_modules/_miscelaneous/chat/chat/chat.component';
import { OcrComponent                  } from './_modules/_miscelaneous/ocr/ocr.component';
import { NotFoundPageComponent         } from './_modules/_home/not-found-page/not-found-page.component';
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
  { path: '**'               , component: NotFoundPageComponent       },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
