import { Component, PipeTransform, QueryList, ViewChildren } from '@angular/core';
import { Directive, EventEmitter, Input, Output            } from '@angular/core';
import { DecimalPipe                                       } from '@angular/common';
import { _Route, routes                                            } from 'src/app/app-routing.module';
import { AuthService                                       } from 'src/app/_services/config/auth.service';
import { SiteRole                                          } from 'src/app/_models/common/common';
import { BehaviorSubject, debounceTime, delay, Observable, of, Subject, switchMap, tap } from 'rxjs';

//
type _SortColumn = keyof _Route | '';
//
interface _BaseSortEvent {
  column: _SortColumn;
  direction: _SortDirection;
}
//
interface _BaseSearchResult {
  //searchPages : _BaseModel[];
  searchPages : _Route[];
  total       : number;
}   

//
type _SortDirection = 'asc' | 'desc' | '';
//
const pagerotate: { [key: string]: _SortDirection } = { asc: 'desc', desc: '', '': 'asc' };
//
//const compare = (v1: string | number | boolean, v2: string | number | boolean) => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);
//const compare = (v1: Route , v2: Route ) => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);

//
interface _SearchState {
      page          : number;
      pageSize      : number;
      searchTerm    : string;
      sortColumn    : _SortColumn;
      sortDirection : _SortDirection;
}
//
//function sort(pagelist: _BaseModel[], column: _SortColumn, direction: string): _BaseModel[] {
/*
function sort(pagelist: Routes, column: _SortColumn, direction: string): Routes {
    if (direction === '' || column === '') {
      return pagelist;
    } else {
      return [...pagelist].sort((a, b) => { 
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
}*/
//
//function matches(netcoreConfigPagelist: _BaseModel, term: string, pipe: PipeTransform) {
function matches(netcoreConfigPagelist: _Route, term: string, pipe: PipeTransform) {
return (
  netcoreConfigPagelist.path?.toLowerCase().includes(term?.toLowerCase())        
  /*
  netcoreConfigPagelist.name.toLowerCase().includes(term?.toLowerCase())        ||
  netcoreConfigPagelist.description.toLowerCase().includes(term?.toLowerCase()) ||
  netcoreConfigPagelist.field_1?.toLowerCase().includes(term?.toLowerCase())    ||
  netcoreConfigPagelist.field_2?.toLowerCase().includes(term?.toLowerCase())    ||
  netcoreConfigPagelist.field_3?.toLowerCase().includes(term?.toLowerCase())    ||
  netcoreConfigPagelist.field_4?.toLowerCase().includes(term?.toLowerCase())    ||
  netcoreConfigPagelist.field_5?.toLowerCase().includes(term?.toLowerCase())    ||
  netcoreConfigPagelist.field_6?.toLowerCase().includes(term?.toLowerCase())    ||
  netcoreConfigPagelist.field_7?.toLowerCase().includes(term?.toLowerCase())    ||
  netcoreConfigPagelist.field_8?.toLowerCase().includes(term?.toLowerCase())    ||
  netcoreConfigPagelist.field_9?.toLowerCase().includes(term?.toLowerCase())    ||
  netcoreConfigPagelist.field_10?.toLowerCase().includes(term?.toLowerCase())    */
);
}

//
@Directive({
  selector: 'th[_sortevent]',
  host: {
    '[class.asc]': '_direction === "asc"',
    '[class.desc]': '_direction === "desc"',
    '(click)': '_rotatePage()',
  },
})
class BaseSortableHeader {
  //
  @Input() sortable: _SortColumn = '';
  @Input() direction: _SortDirection = '';
  @Output() sortevent = new EventEmitter<_BaseSortEvent>();
  //
  _rotatePage() {
    this.direction = pagerotate[this.direction];
    this.sortevent.emit({
       column   : this.sortable,
       direction: this.direction
    });
  }
}

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {
  //
  @ViewChildren(BaseSortableHeader) headers: QueryList<BaseSortableHeader> | undefined;
  //
  public ConfigRoleString: string = SiteRole.RoleConfig.toString();
  //
  public _loading = new BehaviorSubject<boolean>(true);
  public _total   = new BehaviorSubject<number>(0);
  public _search$ = new Subject<void>();
  //
  //public _Pagelist = new BehaviorSubject<_BaseModel[]>([]);
  public _Pagelist = new BehaviorSubject<_Route[]>([]);
  //
  //public _SEARCH_PAGES: _BaseModel[] = [];
  //public _SEARCH_PAGES: Routes = [];
  //
  public _state: _SearchState = {
    page: 1,
    pageSize: 10,
    searchTerm: '',
    sortColumn: '',
    sortDirection: '',
  };
  //
    //////////////////////////////////////////////////////////
    recognition: any;
    isListening = false;
    transcript: string = '';
    error: string = '';
 
  //
  constructor(
    private pipe: DecimalPipe,
    public _authService: AuthService,
  ) 
  {
    //
     // Initialize the SpeechRecognition object
     const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
     if (SpeechRecognition) {
       this.recognition = new SpeechRecognition();
       this.recognition.lang = 'es-CO'; // Set language
       this.recognition.interimResults = false; // Only final results
       this.recognition.maxAlternatives = 1;
 
       // Event handlers
       this.recognition.onresult = (event: any) => {
         this.transcript = event.results[0][0].transcript;
         console.log('Transcript:', this.transcript);
       };
 
       this.recognition.onerror = (event: any) => {
         this.error = event.error;
         console.error('Error:', this.error);
       };
 
       this.recognition.onend = () => {
         this.isListening = false;
         console.log('Recognition ended.');
       };
     } else {
       alert('Speech Recognition API is not supported in your browser.');
     }
    //
    this._search$
      .pipe(
        tap(() => this._loading!.next(true)),
        debounceTime(200),
        switchMap(() => this._search()),
        delay(200),
        tap(() => this._loading!.next(false)),
      )
      .subscribe((result) => {
        this._Pagelist!.next(result.searchPages);
        this._total!.next(result.total);
      });
    //
    this._search$.next();
  }
  //
  private _search(): Observable<_BaseSearchResult> {
    //
    let _searchPages: any;
    let _total: any;
    let _searchResult: _BaseSearchResult = { searchPages: _searchPages, total: _total };

    // 0. get state
    const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;

    //
    //_searchPages = sort(this._SEARCH_PAGES, sortColumn, sortDirection);
    _searchPages   = routes;

    // 2. filter
   // _searchPages = _searchPages.filter((_searchPage: _BaseModel) => matches(_searchPage, searchTerm, this.pipe));
    _searchPages = _searchPages.filter((_searchPage: _Route) => matches(_searchPage, searchTerm, this.pipe));
    _total       = _searchPages.length;

    // 3. paginate
    _searchPages = _searchPages.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);

    // 4. return
    _searchResult = { searchPages: _searchPages, total: _total };

    // 5. return
    return of(_searchResult);
  }
  //////////////////////////////////////////////////////////////////////
  // PROPERTIES
  //////////////////////////////////////////////////////////////////////
  //
  get total() {
    return this._total!.asObservable();
  }
  //
  get loading() {
    return this._loading!.asObservable();
  }
  //
  public get Pagelist() {
    return this._Pagelist!.asObservable();
  }
  //
  public set Pagelist(value: any) {
    this._Pagelist! = value;
  }
  //
  get page() {
    return this._state.page;
  }
  //
  set page(page: number) {
    this._set({ page });
  }
  //
  public get pageSize() {
    return this._state.pageSize;
  }
  //
  set pageSize(pageSize: number) {
    this._set({ pageSize });
  }
  //
  get searchTerm() {
    return this._state.searchTerm;
  }
  //
  set searchTerm(searchTerm: string) {
    this._set({ searchTerm });
  }
  //
  set sortColumn(sortColumn: _SortColumn) {
    this._set({ sortColumn });
  }
  //
  set sortDirection(sortDirection: _SortDirection) {
    this._set({ sortDirection });
  }
  //
  private _set(patch: Partial<_SearchState>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }
  //
  onSort({ column, direction }: _BaseSortEvent) {
    // resetting other headers
    this.headers?.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    //
    this.sortColumn    = column;
    this.sortDirection = direction;
  }
  //////////////////////////////////////////////////////////

  startListening() {
    if (this.recognition) {
      this.isListening = true;
      this.recognition.start();
    }
  }

  stopListening() {
    if (this.recognition) {
      this.isListening = false;
      this.recognition.stop();
    }
  }

  speakText() {
    if (this.transcript) {
      //
      this.searchTerm = this.transcript;
      //
      const utterance = new SpeechSynthesisUtterance(this.transcript);
      utterance.lang = 'es-CO';
      window.speechSynthesis.speak(utterance);
    } else {
      alert('No text to speak!');
    }
  }
}

