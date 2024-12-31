import { NgModule                      } from '@angular/core';
import { Route, RouterModule, Routes   } from '@angular/router';
import { SudokuComponent               } from './_modules/_games/sudoku/sudoku.component';
import { TicTacToeComponent            } from './_modules/_games/tic-tac-toe/offline/tic-tac-toe.component';
import { TicTacToeOnlineComponent      } from './_modules/_games/tic-tac-toe/tic-tac-toe-online/tic-tac-toe-online.component';
import { HanoiAutoComponent            } from './_modules/_games/hanoi/hanoi-auto/hanoi-auto.component';
import { HanoiTowersComponent          } from './_modules/_games/hanoi/hanoi-towers/game-hanoi.component';
import { HanoiObservableComponent      } from './_modules/_games/hanoi/hanoi-observable/hanoi-observable.component';
import { OcrPhotoCaptureComponent      } from './_modules/_miscelaneous/ocr-photo-capture/ocr-photo-capture.component';
import { ChatComponent                 } from './_modules/_miscelaneous/chat/chat/chat.component';
import { NotFoundPageComponent         } from './_modules/_home/not-found-page/not-found-page.component';
import { DevComponent                  } from './_modules/__Testing/_dev/dev.component';
import { SCMComponent                  } from './_modules/_home/scm/scm.component';
import { TopicsComponent               } from './_modules/_home/topics/topics.component';
import { UntTestingComponent           } from './_modules/__Testing/nodejstesting/unt-testing.component';
import { OcrComponent                  } from './_modules/__Testing/ocr/ocr.component';
import { RxJSPlaygroundComponent       } from './_modules/__Testing/rx-jsplayground/rx-jsplayground.component';
import { HomeComponent                 } from './_modules/_home/home/home.component';
import { SpeechRecognitionComponent    } from './_modules/__Testing/speech-recognition/speech-recognition.component';
import { IndexComponent                } from './_modules/_home/index/index.component';
import { AiPromptsComponent            } from './_modules/_home/ai-prompts/ai-prompts.component';
import { StableReleasesComponent       } from './_modules/_home/stable-releases/stable-releases.component';
import { OpenCvShapeReconComponent     } from './_modules/__Testing/open-cv-shape-recon/open-cv-shape-recon.component';
import { ShapeReconCanvasComponent     } from './_modules/__Testing/shape-recon-canvas/shape-recon-canvas.component';
import { BouncingBallComponent } from './_modules/__Testing/bouncing-ball/bouncing-ball.component';
import { Hanoi3dComponent } from './_modules/__Testing/hanoi3d/hanoi3d.component';

//
export interface _Route extends Route
{
    caption : string;
}

//
export const routes : _Route[] = [ 
  { path: 'Home'             , component: HomeComponent              , caption : 'Home'                },
  { path: ''                 , component: HomeComponent              , caption : ''                    },
  { path: 'Sudoku'           , component: SudokuComponent            , caption : 'Sudoku'              },
  { path: 'TicTacToe'        , component: TicTacToeComponent         , caption : 'TicTacToe'           },
  { path: 'TicTacToeOnline'  , component: TicTacToeOnlineComponent   , caption : 'TicTacToe-Online'    },
  { path: 'Hanoi'            , component: HanoiTowersComponent       , caption : 'Hanoi - Timer'       },
  { path: 'HanoiRjxs'        , component: HanoiObservableComponent   , caption : 'Hanoi - Rjxs'        },
  { path: 'HanoiAuto'        , component: HanoiAutoComponent         , caption : 'Hanoi - Rjxs -Auto'  },
  { path: 'Hanoi3d'          , component: Hanoi3dComponent           , caption : 'Hanoi - 3d'          },
  { path: 'RxJsPlayground'   , component: RxJSPlaygroundComponent    , caption : 'RxJs-Playground'     },
  { path: 'OcrPhotoCapture'  , component: OcrPhotoCaptureComponent   , caption : 'Ocr-Photo-Capture'   },
  { path: 'Ocr'              , component: OcrComponent               , caption : 'Ocr'                 },
  { path: 'Chat'             , component: ChatComponent              , caption : 'Chat'                     },
  { path: 'SpeechRecognition', component: SpeechRecognitionComponent , caption : 'Speech  - Recognition'    },
  { path: 'ShapeReconCanvas' , component: ShapeReconCanvasComponent  , caption : 'Shape   - Recon - Canvas' },
  { path: 'ShapeRecognition' , component: OpenCvShapeReconComponent  , caption : 'Shape   - Recognition' },
  { path: 'BackendTesting'   , component: UntTestingComponent        , caption : 'Backend - Testing'     },
  { path: 'BouncingBall'     , component: BouncingBallComponent      , caption : 'Boucing - Testing'     },
  { path: 'Dev'              , component: DevComponent               , caption : 'Testing Releases'      },
  { path: 'StableReleases'   , component: StableReleasesComponent    , caption : 'Stable Releases'       },
  { path: 'SCM'              , component: SCMComponent               , caption : 'SCM'                   },
  { path: 'Topics'           , component: TopicsComponent            , caption : 'Topics'                },
  { path: 'AiPrompts'        , component: AiPromptsComponent         , caption : 'A.I. Prompts'          },
  { path: 'Index'            , component: IndexComponent             , caption : 'Index'                 },
  { path: '**'               , component: NotFoundPageComponent      , caption : ''                      },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
