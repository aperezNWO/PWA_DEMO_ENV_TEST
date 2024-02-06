import { APP_INITIALIZER, ErrorHandler } from '@angular/core';
import { Injectable, NgModule          } from '@angular/core';
import { CommonModule, DatePipe        } from '@angular/common';
import { FormsModule                   } from '@angular/forms';
import { ReactiveFormsModule           } from '@angular/forms';
import { BrowserModule                 } from '@angular/platform-browser';
import { provideClientHydration        } from '@angular/platform-browser';
import { BrowserAnimationsModule       } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';  
import { HttpHandler, HttpInterceptor  } from '@angular/common/http';  
import { HttpRequest, HttpResponse     } from '@angular/common/http';                 
import { HttpClientModule              } from '@angular/common/http';
import { AppComponent                  } from './app.component';
import { LogType                       } from './Models/algorithm-models.model';
import { AppRoutingModule              } from './app-routing.module';
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
import { Html404Component              } from './html404/html404.component';
import { MCSDService                   } from './Services/mcsd.service';
import { finalize, tap                 } from 'rxjs';
import { NgxSignaturePadModule         } from '@eve-sama/ngx-signature-pad';
//
export function loadConfig(configService: ConfigService) {
  return () => configService.loadConfig();
}
//
@Injectable({
  providedIn: 'root'
})
export class LoggingInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const started = Date.now();
    let ok: string;

    // extend server response observable with logging
    return next.handle(req)
      .pipe(
        tap({
          // Succeeds when there is a response; ignore other events
          next: (event) => (ok = event instanceof HttpResponse ? 'succeeded' : ''),
          // Operation failed; error is an HttpErrorResponse
          error: (error) => (ok = 'failed')
        }),
        // Log when response observable either completes or errors
        finalize(() => {
          const elapsed = Date.now() - started;
          const msg = `${req.method} "${req.urlWithParams}" ${ok} in ${elapsed} ms.`;
          console.warn(' [REQUEST URL (INTERCEPT)] : ' + msg);
        })
      );
  }
}
//  
@Injectable({
  providedIn: 'root'
})
//
export class CustomErrorHandler implements ErrorHandler {
    //
    constructor(public mcsdService : MCSDService) { } 
    //
    handleError(_error: Error): void 
    { 
      // 
      console.warn("[CUSTOM ERROR HANDLING]:\n" + _error.name + "\n" + _error.message); 
      //
      let logType : LogType = LogType.Error
      //
      this.mcsdService.SetLog("[CUSTOM ERROR HANDLING]",_error.message,logType);
      //
    }
}   
//
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
                    Html404Component, 
                  ],
    providers: [DatePipe, HttpClient, provideClientHydration(),
      [
        { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true },
        { provide: ErrorHandler, useClass: CustomErrorHandler },
        ConfigService,
        {
          provide   : APP_INITIALIZER,
          useFactory: loadConfig,
          deps      : [ConfigService],
          multi     : true
        },

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
export class AppModule {

}
