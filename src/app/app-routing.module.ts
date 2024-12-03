import { NgModule                      } from '@angular/core';
import { RouterModule, Routes          } from '@angular/router';
import { SudokuComponent               } from './_modules/_games/sudoku/sudoku.component';
import { TicTacToeComponent            } from './_modules/_games/tic-tac-toe/offline/tic-tac-toe.component';
import { TicTacToeOnlineComponent      } from './_modules/_games/tic-tac-toe/tic-tac-toe-online/tic-tac-toe-online.component';
import { HanoiAutoComponent            } from './_modules/_games/hanoi/hanoi-auto/hanoi-auto.component';
import { HanoiTowersComponent          } from './_modules/_games/hanoi/hanoi-towers/game-hanoi.component';
import { HanoiObservableComponent      } from './_modules/_games/hanoi/hanoi-observable/hanoi-observable.component';
import { OcrPhotoCaptureComponent      } from './_modules/_miscelaneous/ocr-photo-capture/ocr-photo-capture.component';
import { NotFoundPageComponent         } from './_modules/_home/not-found-page/not-found-page.component';
import { DevComponent                  } from './_modules/_home/dev/dev.component';
import { SCMComponent                  } from './_modules/_home/scm/scm.component';
import { TopicsComponent               } from './_modules/_home/topics/topics.component';
import { UntTestingComponent           } from './_modules/__Testing/nodejstesting/unt-testing.component';
import { OcrComponent                  } from './_modules/__Testing/ocr/ocr.component';
import { PhotoCaptureComponent         } from './_modules/__Testing/photo-capture/photo-capture.component';
import { RxJSPlaygroundComponent       } from './_modules/__Testing/rx-jsplayground/rx-jsplayground.component';
import { HomeComponent                 } from './_modules/_home/home/home.component';
import { SpeechRecognitionComponent } from './_modules/__Testing/speech-recognition/speech-recognition.component';

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
  { path: 'RxJsPlayground'   , component: RxJSPlaygroundComponent    },
  { path: 'RxJsPlayground'   , component: RxJSPlaygroundComponent    },
  { path: 'PhotoCapture'     , component: PhotoCaptureComponent      },
  { path: 'OcrPhotoCapture'  , component: OcrPhotoCaptureComponent   },
  { path: 'Ocr'              , component: OcrComponent               },
  { path: 'SpeechRecognition', component: SpeechRecognitionComponent },
  { path: 'BackendTesting'   , component: UntTestingComponent        },
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
