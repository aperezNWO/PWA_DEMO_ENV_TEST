import {
  HttpClient,
  HttpRequest,
  HttpEvent,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable    } from '@angular/core';
import { Observable    } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class AlgorithmService {
  ////////////////////////////////////////////////////////////////
  // CAMPOS
  ////////////////////////////////////////////////////////////////
  public HTTPOptions_Text = {
    headers: new HttpHeaders({
      Accept: 'application/text',
    }),
    responseType: 'text' as 'json',
  };
  //
  public HTTPOptions_JSON = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    responseType: 'text' as 'json',
  };
  //
  public get _baseUrlNetCore(): string {
    //
    return this.__baseUrlNetCore;
  }
  //
  public get _baseUrlNodeJs(): string {
    //
    return this.__baseUrlNodeJs;
  }
  //
  protected __baseUrlNetCore        : string = '';
  protected __baseUrlNodeJs         : string = '';
  ////////////////////////////////////////////////////////////////
  // EVENT HANDLERS
  ////////////////////////////////////////////////////////////////
  constructor(public http: HttpClient, public configService : ConfigService) {
    ////
    this.__baseUrlNetCore = this.configService.getConfigValue('baseUrlNetCore');
    this.__baseUrlNodeJs  = this.configService.getConfigValue('baseUrlNodeJs');
    //
    console.log("baseUrlNetCore : " + this.__baseUrlNetCore);
    console.log("baseUrlNodeJs  : " + this.__baseUrlNodeJs);
    
  }
  ////////////////////////////////////////////////////////////////
  // METODOS
  ////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////
  // GAMES
  ////////////////////////////////////////////////////////////////
  _GetSudoku(): Observable<string> {
    //
    let p_url          :string = `${this.__baseUrlNetCore}Demos/Sudoku_Generate_CPP`;
    //
    let sudokuGenerated: Observable<string> = this.http.get<string>(
      p_url,
      this.HTTPOptions_Text,
    );
    //
    return sudokuGenerated;
  }
  //
  _GetSudoku_NodeJS(): Observable<string> {
    //
    let p_url: string = `${this.__baseUrlNodeJs}Sudoku_Generate_NodeJS`;
    //
    let sudokuGenerated: Observable<string> = this.http.get<string>(
      p_url,
      this.HTTPOptions_JSON,
    );
    //
    return sudokuGenerated;
  }
  //
  _SolveSudoku(p_matrix: string): Observable<string> {
    //
    let p_url: string = `${this.__baseUrlNetCore}Demos/Sudoku_Solve_CPP?p_matrix=${p_matrix}`;
    //
    let sudokuSolved: Observable<string> = this.http.get<string>(
      p_url,
      this.HTTPOptions_Text,
    );
    //
    return sudokuSolved;
  }
  //
  _SolveSudoku_NodeJS(p_matrix: string): Observable<string> {
    //
    let p_url: string = `${this.__baseUrlNodeJs}Sudoku_Solve_NodeJS?p_matrix=${p_matrix}`;
    //
    let sudokuSolved: Observable<string> = this.http.get<string>(
      p_url,
      this.HTTPOptions_Text,
    );
    //
    return sudokuSolved;
  }
  //-------------------------------------------------------------
  // FILE UPLODAD METHODS
  //-------------------------------------------------------------
  uploadSudoku(file: File): Observable<HttpEvent<any>> {
    //
    const formData: FormData = new FormData();
    //
    formData.append('file', file);
    //
    let url = `${this.__baseUrlNetCore}demos/Sudoku_Upload_File`;
    //
    console.log('[SUDOKU] - (UPLOADING FILE) url: ' + url);
    //
    const req = new HttpRequest('POST', url, formData, {
      reportProgress: true,
      responseType: 'text',
    });
    //
    return this.http.request<HttpEvent<any>>(req);
  }
  ////////////////////////////////////////////////////////////////
  // BACKEND TEST
  ////////////////////////////////////////////////////////////////
  _TestNodeJs(): Observable<string> {
    //
    let p_url: string = `${this.__baseUrlNodeJs}databaseconnect`;
    //let p_url: string = `https://ms7tks-4000.csb.app/databaseconnect`;
    //let p_url: string ='https://fluffy-space-barnacle-vrwvjp6qjvphw9g-4000.app.github.dev/databaseconnect';
    //
    let nodeJsOutput: Observable<string> = this.http.get<string>(
      p_url,
      this.HTTPOptions_JSON,
    );
    //
    console.log('Testing Url : [' + p_url+ ']');
    //
    return nodeJsOutput;
  }
}
