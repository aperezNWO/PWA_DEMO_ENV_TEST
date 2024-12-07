import { NgModule                      } from '@angular/core';
import { Route, RouterModule, Routes          } from '@angular/router';
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
import { SpeechRecognitionComponent    } from './_modules/__Testing/speech-recognition/speech-recognition.component';
import { IndexComponent                } from './_modules/_home/index/index.component';
//
export interface _Route extends Route
{
    caption : string;
}

//
export const routes : _Route[] = [ 
  { path: 'Home'             , component: HomeComponent              , caption : 'Home'               },
  { path: ''                 , component: HomeComponent              , caption : ''                   },
  { path: 'Sudoku'           , component: SudokuComponent            , caption : 'Sudoku'             },
  { path: 'TicTacToe'        , component: TicTacToeComponent         , caption : 'TicTacToe'          },
  { path: 'TicTacToeOnline'  , component: TicTacToeOnlineComponent   , caption : 'TicTacToe-Online'   },
  { path: 'Hanoi'            , component: HanoiTowersComponent       , caption : 'Hanoi'              },
  { path: 'HanoiRjxs'        , component: HanoiObservableComponent   , caption : 'Hanoi-Rjxs'         },
  { path: 'HanoiAuto'        , component: HanoiAutoComponent         , caption : 'Hanoi-Auto'         },
  { path: 'RxJsPlayground'   , component: RxJSPlaygroundComponent    , caption : 'RxJs-Playground'    },
  { path: 'PhotoCapture'     , component: PhotoCaptureComponent      , caption : 'Photo-Capture'      },
  { path: 'OcrPhotoCapture'  , component: OcrPhotoCaptureComponent   , caption : 'Ocr-Photo-Capture'  },
  { path: 'Ocr'              , component: OcrComponent               , caption : 'Ocr'                },
  { path: 'SpeechRecognition', component: SpeechRecognitionComponent , caption : 'Speech-Recognition' },
  { path: 'BackendTesting'   , component: UntTestingComponent        , caption : 'Backen-dTesting'    },
  { path: 'Dev'              , component: DevComponent               , caption : 'Dev'                },
  { path: 'SCM'              , component: SCMComponent               , caption : 'SCM'                },
  { path: 'Topics'           , component: TopicsComponent            , caption : 'Topics'             },
  { path: 'Index'            , component: IndexComponent             , caption : 'Index'              },
  { path: '**'               , component: NotFoundPageComponent      , caption : ''                   },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
