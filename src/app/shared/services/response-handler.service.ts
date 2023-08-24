import { Injectable } from '@angular/core';

import { ResponseHandlerDirective } from '../directives/response-handler.directive';

@Injectable({
  providedIn: 'root'
})
export class ResponseHandlerService {
  private _responseHandlerDirective!: ResponseHandlerDirective

  response(resp: any) {
    this._responseHandlerDirective = new ResponseHandlerDirective();
    this._responseHandlerDirective.responseHandler = resp;
    this._responseHandlerDirective.ngOnChanges();
  }
}
