import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    private uri = environment.apiUrl + "category/";
    constructor(private http: HttpClient) { }

    postCategory(param): Observable<any> {
        return this.http.post(this.uri + "postCategory", param).pipe(
            switchMap((response: any) => {
                return of(response);
            })
        );
    }

    postPayrollCutoffHeader(param): Observable<any> {
        return this.http.post(this.uri + "postPayrollCutoffHeader", param).pipe(
            switchMap((response: any) => {
                return of(response);
            })
        );
    }

    loadPayrollCutoffLocking(param): Observable<any> {
        return this.http.post(this.uri + "loadPayrollCutoffLocking", param).pipe(
          switchMap((response: any) => {
            return of(response);
          })
        );
    }

    loadPayrollCutoff(param): Observable<any[]> {
        let params = new HttpParams();
        params = params.append('id', param);
        return this.http.get<any[]>(this.uri + "loadPayrollCutoff", { params: params });
    }

    getPayrollCutoffHeader(param ,year): Observable<any[]> {
        let params = new HttpParams();
        params = params.append('id', param);
        params = params.append('year',year);
        return this.http.get<any[]>(this.uri + "getPayrollCutoffHeader", { params: params });
    }

    getCategory(param): Observable<any[]> {
        let params = new HttpParams();
        params = params.append('id', param);
        return this.http.get<any[]>(this.uri + "getCategory", { params: params });
    }

    getCategoryDropdown(param): Observable<any> {
        return this.http.post(this.uri + "getCategoryDropdown", param).pipe(
            switchMap((response: any) => {
                return of(response);
            })
        );
    }

    getCategoryPayrollDropdown(param): Observable<any> {
        return this.http.post(this.uri + "getCategoryPayrollDropdown", param).pipe(
            switchMap((response: any) => {
                return of(response);
            })
        );
    }

    postBreakType(param): Observable<any> {
        return this.http.post(this.uri + "postBreakType", param).pipe(
            switchMap((response: any) => {
                return of(response);
            })
        );
    }

    getBreakType(param): Observable<any[]> {
        let params = new HttpParams();
        params = params.append('id', param);
        return this.http.get<any[]>(this.uri + "getBreakType", { params: params });
    }

    getBreakTypeDropdown(param): Observable<any> {
        return this.http.post(this.uri + "getBreakTypeDropdown", param).pipe(
            switchMap((response: any) => {
                return of(response);
            })
        );
    }

    postTimekeepingCategory(param): Observable<any> {
        return this.http.post(this.uri + "postTimekeepingCategory", param).pipe(
            switchMap((response: any) => {
                return of(response);
            })
        );
    }

    getTimekeepingCategory(param): Observable<any[]> {
        let params = new HttpParams();
        params = params.append('id', param);
        return this.http.get<any[]>(this.uri + "getTimekeepingCategory", { params: params });
    }


    getPayrollCutoffDropdown(param, id): Observable<any> {
        let params = new HttpParams();
        params = params.append('id', id);
        return this.http.post(this.uri + "getPayrollCutoffDropdown", param,{ params: params }).pipe(
            switchMap((response: any) => {
                return of(response);
            })
        );
    }
}
