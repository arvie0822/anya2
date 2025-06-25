import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GF } from 'app/shared/global-functions';
import { environment } from 'environments/environment';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private uri = environment.apiUrl + 'user/authenticateLogin';


    constructor(private http: HttpClient, private handler: HttpBackend,private router: Router) {}

    authenticateUser(param): Observable<any> {
        return this.http.post(this.uri, param);
    }

    saveToken(req, remember) {
        sessionStorage.setItem('token', req['token']);
        sessionStorage.setItem('u', req['id']);
        sessionStorage.setItem('sc', req['series_code']);
        sessionStorage.setItem('al', req['access_level_id']);
        sessionStorage.setItem('apl', req['approval_level_id']);
        sessionStorage.setItem('cat', req['category_id']);
        sessionStorage.setItem('ci', req['company_id']);
        sessionStorage.setItem('ap', req['approver']);
        sessionStorage.setItem('s', req['start']);
        sessionStorage.setItem('e', req['end']);
        sessionStorage.setItem('dn', req['display_name']);
        sessionStorage.setItem('ip', req['image_path']);
        sessionStorage.setItem('cn', req['company_name']);
        sessionStorage.setItem('ln', req['login_name']);
        sessionStorage.setItem('io', req['in_out']);
        sessionStorage.setItem('lt', req['log_type_id']);
        sessionStorage.setItem('ti', req['tenant_id']);
        sessionStorage.setItem('re', req['remind_password']);
        sessionStorage.setItem('rm', req['remind_message']);
        sessionStorage.setItem('is', req['is_schedule']);
        sessionStorage.setItem('iw', req['is_web']);
        sessionStorage.setItem('cc', req['company_code']);
        sessionStorage.setItem('d', req['device']);
        sessionStorage.setItem('b', req['browser']);
        sessionStorage.setItem('ia', req['is_admin']);
        sessionStorage.setItem('se', req['series']);
        sessionStorage.setItem('bundy', req['is_web']);
        sessionStorage.setItem('route', req['routing']);
        sessionStorage.setItem('is', req['is_supervisor']);
        sessionStorage.setItem('issu', req['is_superuser']);
        sessionStorage.setItem('sui', req['superuser_id']);
        sessionStorage.setItem('ioh', req['is_OnHold']);
        sessionStorage.setItem('reportTag', req['allowSendReport']);
        sessionStorage.setItem('subid', req['subCompany_id']);
        sessionStorage.setItem('activeLang',GF.IsEmptyReturn( req['language'], 'en'));
        localStorage.clear();
        localStorage.setItem('series', req['series']);
        localStorage.setItem('usetiful', req['usetiful']);
        localStorage.setItem('dn', req['display_name']);
        localStorage.setItem('bt', req['bundyType']);
        if (remember) {
            localStorage.setItem('us', req['username']);
            localStorage.setItem('co', req['company_code']);
            localStorage.setItem('re', remember);
        }
    }

    getToken() {
        return sessionStorage.getItem('token');
    }

    isAuthenticated() {
        if (this.getToken()) {
            return true;
        }
        return false;
    }


    check(): Observable<boolean> {
        if (this.getToken()) {
            return of(true);
        }
        return of(false); //false;
    }

    reportToken() {
        var url = environment.reports + 'api/site/master/token';

        const headers = new HttpHeaders().set(
            'Content-Type',
            'application/x-www-form-urlencoded'
        );

        const body = new URLSearchParams();
        body.set('grant_type', 'password');
        body.set('username', 'jldayandante@illimitado.com');
        body.set('password', '123456fF@');

        url = url.replace( 'master', sessionStorage.getItem('se') === '0001' ? 'master' : sessionStorage.getItem('se').toLowerCase().replaceAll(' ', '') );

        this.http = new HttpClient(this.handler);

        this.http
            .post(url, body, { headers: headers })
            .subscribe((res: any) => {
                sessionStorage.setItem('rt', res.access_token);
            });
    }

    byPassGuard(){
        if (GF.IsEmpty(sessionStorage.getItem("x-xsrf-token"))) {
             this.router.navigate(['/login']).then(() => {
                location.reload();
            });
        }
    }
}
