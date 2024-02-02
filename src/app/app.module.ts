import { APP_INITIALIZER, NgModule     } from '@angular/core';
import { CommonModule, DatePipe        } from '@angular/common';
import { FormsModule                   } from '@angular/forms';
import { ReactiveFormsModule           } from '@angular/forms';
import { BrowserModule                 } from '@angular/platform-browser';
import { provideClientHydration        } from '@angular/platform-browser';
import { BrowserAnimationsModule       } from '@angular/platform-browser/animations';
import { HttpClient                    } from '@angular/common/http';
import { HttpClientModule              } from '@angular/common/http';
import { AppComponent                  } from './app.component';
import { HomeComponent                 } from './Modules/home/home.component';
import { SudokuComponent               } from './Modules/Games/sudoku/sudoku.component';
import { BoardComponent                } from "./Modules/Games/tic-tac-toe/offline/board/board.component";
import { TicTacToeComponent            } from './Modules/Games/tic-tac-toe/offline/tic-tac-toe.component';
import { TicTacToeOnlineComponent      } from './Modules/Games/tic-tac-toe/tic-tac-toe-online/tic-tac-toe-online.component';
import { UntTestingComponent           } from './Modules/UnitTesting/unt-testing/unt-testing.component';
import { TowerComponent                } from "./Modules/Games/hanoi-towers/tower/tower.component";
import { HanoiTowersComponent          } from './Modules/Games/hanoi-towers/game-hanoi.component';
import { MessageComponent              } from './Modules/chat/message/message.component';
import { ChatComponent                 } from './Modules/chat/chat/chat.component';
import { BoardOnlineComponent          } from './Modules/Games/tic-tac-toe/tic-tac-toe-online/board/board.component';
import { OcrComponent                  } from './Modules/ocr/ocr/ocr.component';
import { ConfigService                 } from './Services/config.service';
import { AppRoutingModule              } from './app-routing.module';
import { NgxSignaturePadModule         } from '@eve-sama/ngx-signature-pad';
//
export function loadConfig(configService: ConfigService) {
  return () => configService.loadConfig();
}

@NgModule({
    declarations: [
                    AppComponent, 
                    HomeComponent, 
                    SudokuComponent, 
                    TicTacToeComponent, 
                    HanoiTowersComponent, 
                    UntTestingComponent, 
                    MessageComponent, 
                    ChatComponent, 
                    TicTacToeOnlineComponent, 
                    OcrComponent, 
                  ],
    providers: [DatePipe, HttpClient, provideClientHydration(),
      [
        ConfigService,
        {
          provide   : APP_INITIALIZER,
          useFactory: loadConfig,
          deps      : [ConfigService],
          multi     : true
        }
      ],
    ],
    bootstrap: [AppComponent],
    imports: [
        AppRoutingModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserModule,
        BrowserAnimationsModule,
        BoardComponent,
        TowerComponent,
        BoardOnlineComponent,
        NgxSignaturePadModule,
    ]
})
export class AppModule {}
