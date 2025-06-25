import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, map, of, switchMap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TimekeepingService {
    private uri = environment.apiUrl + 'timekeeping/';
    constructor(private http: HttpClient) {}

    generateTimekeeping(param): Observable<any> {
        return this.http.post(this.uri + 'generateTimekeeping', param).pipe(
            switchMap((response: any) => {
                return of(response);
            })
        );
    }

    dashboardTimekeeping(param): Observable<any> {
        return this.http.post(this.uri + 'dashboardTimekeeping', param).pipe(
            switchMap((response: any) => {
                return of(response);
            })
        );
    }

    getTimekeepingFinalEmployee(param): Observable<any> {
        return this.http
            .post(this.uri + 'getTimekeepingFinalEmployee', param)
            .pipe(
                switchMap((response: any) => {
                    return of(response);
                })
            );
    }

    tkViewExport(param): Observable<HttpResponse<Blob>> {
        let params = new HttpParams();
        params = params.append('cache', param);
        return this.http.post<Blob>(this.uri + 'getTimekeepingExport', param, {
            observe: 'response',
            responseType: 'blob' as 'json',
        });
    }

    tkExport(param, exportType): Observable<HttpResponse<Blob>> {
        let params = new HttpParams();
        params = params.append('cache', param);
        params = params.append('type', exportType);
        return this.http.get<Blob>(this.uri + 'getExportTimekeeping', {
            observe: 'response',
            params: params,
            responseType: 'blob' as 'json',
        });
    }

    viewGeneratedTimekeeping(param): Observable<any> {
        return this.http
            .post(this.uri + 'viewGeneratedTimekeeping', param)
            .pipe(
                switchMap((response: any) => {
                    return of(response);
                })
            );
    }

    viewGeneratedAdjTimekeeping(param): Observable<any> {
        return this.http
            .post(this.uri + 'viewGeneratedAdjTimekeeping', param)
            .pipe(
                switchMap((response: any) => {
                    return of(response);
                })
            );
    }

    viewGeneratedTimekeepingSummary(param): Observable<any> {
        return this.http
            .post(this.uri + 'viewGeneratedTimekeepingSummary', param)
            .pipe(
                switchMap((response: any) => {
                    return of(response);
                })
            );
    }

    postTimekeeping(param): Observable<any> {
        return this.http.post(this.uri + 'postTimekeeping', param).pipe(
            switchMap((response: any) => {
                return of(response);
            })
        );
    }

    postTimekeepingSummary(param): Observable<any> {
        return this.http.post(this.uri + 'postTimekeepingSummary', param).pipe(
            switchMap((response: any) => {
                return of(response);
            })
        );
    }

    reGenerateTimekeeping(param): Observable<any> {
        return this.http.post(this.uri + 'reGenerateTimekeeping', param).pipe(
            switchMap((response: any) => {
                return of(response);
            })
        );
    }

    generateTimekeepingAdjustment(param): Observable<any> {
        return this.http
            .post(this.uri + 'generateTimekeepingAdjustment', param)
            .pipe(
                switchMap((response: any) => {
                    return of(response);
                })
            );
    }

    generateInitialTimekeepingAdjustment(param): Observable<any> {
        return this.http
            .post(this.uri + 'generateInitialTimekeepingAdjustment', param)
            .pipe(
                switchMap((response: any) => {
                    return of(response);
                })
            );
    }

    getTimekeeping(param): Observable<any> {
        return this.http.post(this.uri + 'getTimekeeping', param).pipe(
            switchMap((response: any) => {
                return of(response);
            })
        );
    }

    getTimekeepingAdjustment(param): Observable<any> {
        return this.http
            .post(this.uri + 'getTimekeepingAdjustment', param)
            .pipe(
                switchMap((response: any) => {
                    return of(response);
                })
            );
    }

    getTKFilter(param): Observable<any> {
        return this.http.post(this.uri + 'getTKFilter', param).pipe(
            switchMap((response: any) => {
                return of(response);
            })
        );
    }

    generateTimekeepingSummary(param): Observable<any> {
        return this.http
            .post(this.uri + 'generateTimekeepingSummary', param)
            .pipe(
                switchMap((response: any) => {
                    return of(response);
                })
            );
    }

    getTKPayrollCutoff(param): Observable<any> {
        return this.http.post(this.uri + 'getTKPayrollCutoff', param).pipe(
            switchMap((response: any) => {
                return of(response);
            })
        );
    }

    getTimekeepingTable(param): Observable<any> {
        return this.http.post(this.uri + 'getTimekeepingTable', param).pipe(
            switchMap((response: any) => {
                return of(response);
            })
        );
    }

    tkdashboard(url, params): Observable<any> {
        return this.http.post(this.uri+''+url, params).pipe(
            switchMap((response: any) => {
                return of(response);
            })
        );
    }
    // dashboardAdjTimekeeping
    // dashboardTimekeeping

    getOvertimeScenario(): Observable<any[]> {
        return this.http.get<any[]>(this.uri + "getOvertimeScenario");
    }

}
