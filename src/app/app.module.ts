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
import { NgbModule                     } from '@ng-bootstrap/ng-bootstrap'
import { AppComponent                  } from './app.component';
import { AppRoutingModule              } from './app-routing.module';
import { LogType                       } from './_models/algorithm-models.model';
import { HomeComponent                 } from './_modules/_home/home.component';
import { SudokuComponent               } from './_modules/_games/sudoku/sudoku.component';
import { BoardComponent                } from "./_modules/_games/tic-tac-toe/offline/board/board.component";
import { TicTacToeComponent            } from './_modules/_games/tic-tac-toe/offline/tic-tac-toe.component';
import { TicTacToeOnlineComponent      } from './_modules/_games/tic-tac-toe/tic-tac-toe-online/tic-tac-toe-online.component';
import { UntTestingComponent           } from './_modules/_unitTesting/nodejstesting/unt-testing.component';
import { TowerComponent                } from "./_modules/_games/hanoi-towers/tower/tower.component";
import { HanoiTowersComponent          } from './_modules/_games/hanoi-towers/game-hanoi.component';
import { MessageComponent              } from './_modules/_miscelaneous/chat/message/message.component';
import { ChatComponent                 } from './_modules/_miscelaneous/chat/chat/chat.component';
import { BoardOnlineComponent          } from './_modules/_games/tic-tac-toe/tic-tac-toe-online/board/board.component';
import { OcrComponent                  } from './_modules/_miscelaneous/ocr/ocr.component';
import { ConfigService                 } from './_services/config.service';
import { MCSDService                   } from './_services/mcsd.service';
import { finalize, tap                 } from 'rxjs';
import { NgxSignaturePadModule         } from '@eve-sama/ngx-signature-pad';
import { NavComponent } from './_modules/_home/nav/nav.component';
import { DevComponent } from './_modules/_home/dev/dev.component';
import { SCMComponent } from './_modules/_home/scm/scm.component';
import { TopicsComponent } from './_modules/_home/topics/topics.component';
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
                    OcrComponent, NavComponent, DevComponent, SCMComponent, TopicsComponent, 
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
        BoardComponent,
        TowerComponent,
        BoardOnlineComponent,
        AppRoutingModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserModule,
        BrowserAnimationsModule,
        NgxSignaturePadModule,
        NgbModule,
    ]
})
export class AppModule {

}
