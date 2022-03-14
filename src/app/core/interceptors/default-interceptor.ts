import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';
import { environment } from '@env/environment';
import { CookieService } from 'ngx-cookie';

import { ToastrService } from 'ngx-toastr';
import { TokenService } from '../authentication/token.service';
import { SettingsService } from '@core/bootstrap/settings.service';

@Injectable()
export class DefaultInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private token: TokenService,
    private settings: SettingsService,
    public _cookieSvc?: CookieService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Add server host
    const url = environment.SERVER_ORIGIN + req.url;

    // Only intercept API url
    if (!url.includes('/api/')) {
      return next.handle(req);
    }

    // All APIs need JWT authorization
    const headers = {
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Accept-Language': this.settings.language,
      'Authorization': `Bearer ${this.token.get().token}`,
      'X-CSRFToken': this._cookieSvc.get("csrftoken")
    };

    // if(this.settings.user?.name){
    //   headers['username']= this.settings.user.name
    // }

    const newReq = req.clone({ setHeaders: headers, withCredentials: true });
    return next.handle(newReq);
    // return next.handle(newReq).pipe(
    //   mergeMap((event: HttpEvent<any>) => this.handleOkReq(event)),
    //   catchError((error: HttpErrorResponse) => this.handleErrorReq(error))
    // );
  }

  private goto(url: string) {
    setTimeout(() => this.router.navigateByUrl(url));
  }

  private handleOkReq(event: HttpEvent<any>): Observable<any> {
    if (event instanceof HttpResponse) {
      const body: any = event.body;
      // failure: { code: **, msg: 'failure' }
      // success: { code: 0,  msg: 'success', data: {} }
      if (body && body.code !== 0) {
        if (body.msg && body.msg !== '') {
          this.toastr.error(body.msg);
        }
        return throwError([]);
      } else {
        return of(event);
      }
    }
    // Pass down event if everything is OK
    return of(event);
  }

  private handleErrorReq(error: HttpErrorResponse): Observable<never> {
    switch (error.status) {
      case 401:
        this.goto(`/auth/login`);
        break;
      case 403:
      case 404:
      case 500:
        this.goto(`/sessions/${error.status}`);
        break;
      default:
        if (error instanceof HttpErrorResponse) {
          console.error('ERROR', error);
          this.toastr.error(error.error.msg || `${error.status} ${error.statusText}`);
        }
        break;
    }
    return throwError(error);
  }
}
