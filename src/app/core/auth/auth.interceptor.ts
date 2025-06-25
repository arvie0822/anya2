import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest, } from '@angular/common/http';
import { inject } from '@angular/core';
// import { AuthService } from 'app/core/auth/auth.service';
// import { AuthUtils } from 'app/core/auth/auth.utils';
import { AuthService } from 'app/services/authService/auth.service';
import { GF } from 'app/shared/global-functions';
import { Observable, catchError, throwError } from 'rxjs';

/**
 * Intercept
 *
 * @param req
 * @param next
 */
export const authInterceptor = ( req: HttpRequest<unknown>, next: HttpHandlerFn ): Observable<HttpEvent<unknown>> => {

    const authService = inject(AuthService);

    // // Get CSRF token from cookie
    // const match = document.cookie.match(new RegExp('(^| )XSRF-TOKEN=([^;]+)'));
    // const csrfToken = match ? match[2] : null;
    // console.log("token",sessionStorage.getItem('x-xsrf-token'))

    // Clone the request object
    let newReq = req.clone();

    if (authService.isAuthenticated()) {
        newReq = req.clone({
            headers: req.headers
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${authService.getToken()}`)
            .set('Access-Control-Max-Age', '86400')
            .set('Series', sessionStorage.getItem('sc'))
            .set('LoginID', sessionStorage.getItem('u'))
            .set('AccessLevel', sessionStorage.getItem('al'))
            .set('User', GF.ConvertSP(sessionStorage.getItem('dn')))
            .set('device', sessionStorage.getItem('d'))
            .set('browser', sessionStorage.getItem('b'))
            .set('moduleId', GF.IsEmptyReturn(sessionStorage.getItem('moduleId'),"83"))
            .set('IP1', GF.IsEmptyReturn(sessionStorage.getItem('ip1'),""))
            .set('IP2', GF.IsEmptyReturn(sessionStorage.getItem('ip2'),""))
            .set('Language', GF.IsEmptyReturn(sessionStorage.getItem('activeLang'),"en"))
            .set('X-XSRF-TOKEN', GF.IsEmptyReturn(sessionStorage.getItem('x-xsrf-token'),"")),
            withCredentials: true
        });
    } else {
        newReq = req.clone({
            headers: req.headers
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${authService.getToken()}`)
            .set('Language', "en")
            .set('X-XSRF-TOKEN', GF.IsEmptyReturn(sessionStorage.getItem('x-xsrf-token'),"")),
            withCredentials: true
        });
    }

    // Response
    return next(newReq).pipe(
        catchError((error) => {
            // Catch "401 Unauthorized" responses
            if (error instanceof HttpErrorResponse && error.status === 401) {
                // Sign out
                // authService.signOut();

                // Reload the app
                location.reload();
            }

            return throwError(error);
        })
    );
};
