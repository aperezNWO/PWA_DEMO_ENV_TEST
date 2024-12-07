import { Component, Inject, Injectable, QueryList, ViewChildren         } from '@angular/core';
import { Directive, EventEmitter, Input, Output             } from '@angular/core';
import { Observable, of                                     } from 'rxjs';
import { _BaseModel, _SortDirection, ENV_LIST_CPP_DEMO      } from 'src/app/_models/common/common';
import { pagerotate, SiteRole                               } from 'src/app/_models/common/common';
import { AuthService                                        } from 'src/app/_services/config/auth.service';
import { BaseService                                        } from 'src/app/_services/config/base.service';
import { ConfigService                                      } from 'src/app/_services/config/config.service';
import { _environment                                       } from 'src/environments/environment';

//
/*export */ type _SortColumn               = keyof _BaseModel      | '';
//
/*export */ interface _BaseSortEvent {
	_column   :  _SortColumn;
	_direction:  _SortDirection;
}
//
@Directive({
	selector    : 'th[sortevent]',
	host        : {
		'[class.asc]'  : 'direction === "asc"',
		'[class.desc]' : 'direction === "desc"',
		'(click)'      : '_rotatePage()',
	},
})
export class BaseSortableHeader {
  //
  @Input()  sortable          :   _SortColumn    = '';
  @Input()  direction         :   _SortDirection = '';
  @Output() sortevent         =   new EventEmitter<_BaseSortEvent>();
  //
  _rotatePage() {
    this.direction = pagerotate[this.direction];
    this.sortevent.emit({ 
                _column   : this.sortable, 
                _direction: this.direction 
                });
  }
}

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent  {
   //
   @ViewChildren(BaseSortableHeader) headers: QueryList<BaseSortableHeader> | undefined;
   //
   public PagesList!       : Observable<_BaseModel[]>;
   public total!           : Observable<number>; 
   //
   public ConfigRoleString : string = SiteRole.RoleConfig.toString(); 
   //
   constructor( public _service       : BaseService,
                public _authService   : AuthService,
                public _configService : ConfigService,
                //@Inject('dictionaryKey') public _dictionaryKey: string,
              )
   {
       let _dictionaryKey   = ENV_LIST_CPP_DEMO;
       //
       this.PagesList       = of([]);
       //
       const pageSetting    = _environment.pageSettingDictionary[_dictionaryKey];
       //
       let _environmentList : string[] = [];
       //
       _configService.loadJsonData(pageSetting.p_Path,
                                   _environmentList).then(() => {
           //
           this._service._SEARCH_PAGES.splice(0,this._service._SEARCH_PAGES.length);
           //
           _environmentList.forEach((element: any) => {
               this._service._SEARCH_PAGES.push(element);
           });
           //    
           this.PagesList  = _service.Pagelist;
           this.total      = _service.total;
       });
   }
   //
   onSort({ _column, _direction }: _BaseSortEvent) {
       // resetting other headers
       this.headers?.forEach((header) => {
           if (header.sortable !== _column) {
               header.direction= '';
           }
       });
       //
       this._service.sortColumn    = _column;
       this._service.sortDirection = _direction;
   }
}

