import { NgModule                      } from '@angular/core';
import { RouterModule, Routes          } from '@angular/router';
import { HomeComponent                 } from './_modules/_home/home.component';
import { SudokuComponent               } from './_modules/_games/sudoku/sudoku.component';
import { TicTacToeComponent            } from './_modules/_games/tic-tac-toe/offline/tic-tac-toe.component';
import { TicTacToeOnlineComponent      } from './_modules/_games/tic-tac-toe/tic-tac-toe-online/tic-tac-toe-online.component';
import { HanoiAutoComponent            } from './_modules/_games/hanoi/hanoi-auto/hanoi-auto.component';
import { HanoiTowersComponent          } from './_modules/_games/hanoi/hanoi-towers/game-hanoi.component';
import { HanoiObservableComponent      } from './_modules/_games/hanoi/hanoi-observable/hanoi-observable.component';
import { UntTestingComponent           } from './_modules/_unitTesting/nodejstesting/unt-testing.component';
import { OcrComponent                  } from './_modules/_miscelaneous/ocr/ocr.component';
import { OcrPhotoCaptureComponent      } from './_modules/_miscelaneous/ocr-photo-capture/ocr-photo-capture.component';
import { NotFoundPageComponent         } from './_modules/_home/not-found-page/not-found-page.component';
import { DevComponent                  } from './_modules/_home/dev/dev.component';
import { SCMComponent                  } from './_modules/_home/scm/scm.component';
import { TopicsComponent               } from './_modules/_home/topics/topics.component';
import { RxJSPlaygroundComponent       } from './_modules/_miscelaneous/rx-jsplayground/rx-jsplayground.component';
import { PhotoCaptureComponent         } from './_modules/_miscelaneous/photo-capture/photo-capture.component';

//
const routes : Routes = [ 
  { path: 'Home'             , component: HomeComponent              },
  { path: ''                 , component: HomeComponent              },
  { path: 'Sudoku'           , component: SudokuComponent            },
  { path: 'TicTacToe'        , component: TicTacToeComponent         },
  { path: 'TicTacToeOnline'  , component: TicTacToeOnlineComponent   },
  { path: 'Hanoi'            , component: HanoiTowersComponent       },
  { path: 'HanoiRjxs'        , component: HanoiObservableComponent   },
  { path: 'HanoiAuto'        , component: HanoiAutoComponent         },
  { path: 'UnitTesting'      , component: UntTestingComponent        },
  { path: 'RxJsPlayground'   , component: RxJSPlaygroundComponent    },
  { path: 'RxJsPlayground'   , component: RxJSPlaygroundComponent    },
  { path: 'PhotoCapture'     , component: PhotoCaptureComponent      },
  { path: 'OcrPhotoCapture'  , component: OcrPhotoCaptureComponent   },
  { path: 'Ocr'              , component: OcrComponent               },
  { path: 'Dev'              , component: DevComponent               },
  { path: 'SCM'              , component: SCMComponent               },
  { path: 'Topics'           , component: TopicsComponent            },
  { path: '**'               , component: NotFoundPageComponent      },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
