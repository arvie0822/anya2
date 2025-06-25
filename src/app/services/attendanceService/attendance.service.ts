import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private uri = environment.apiUrl + "attendance/";
  constructor(private http: HttpClient) { }

  getEmployeeAttendanceTable(param,is): Observable<any> {
    let params = new HttpParams();
    params = params.append('issupervisor', is);
    return this.http.post(this.uri + "getEmployeeAttendanceTable", param,{ params: params }).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }

  postBundyNotification(param): Observable<any> {
    return this.http.post(this.uri + "postBundyNotification", param).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }

  getAttendanceLogs(param,ids): Observable<any[]> {
    let params = new HttpParams();
    params = params.append('date', param);
    params = params.append('id', ids);
    return this.http.get<any[]>(this.uri + "getAttendanceLogs",{ params: params });
  }

  postBundy(param): Observable<any> {
    return this.http.post(this.uri + "postBundy", param).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }

  postQueBundy(param): Observable<any> {
    return this.http.post(this.uri + "postQueBundy", param).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }

  getAttendanceLogsTable(param): Observable<any> {
    return this.http.post(this.uri + "getAttendanceLogsTable", param).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }

  postAttendanceLogs(param): Observable<any> {
    return this.http.post(this.uri + "postAttendanceLogs", param).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }

  postAttendanceLogsManual(param): Observable<any> {
    return this.http.post(this.uri + "postAttendanceLogsManual", param).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }

  attendanceLogsProcess(): Observable<any> {
    return this.http.post(this.uri + "attendanceLogsProcess", {}).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }

  resendLogs(): Observable<any> {
    return this.http.post(this.uri + "resendLogs", {}).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }

  tkdashboard(url, params): Observable<any> {
    return this.http.post(this.uri + '' + url, params).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }
}
