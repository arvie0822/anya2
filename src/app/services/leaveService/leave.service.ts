import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LeaveType } from 'app/model/administration/leaves';
import { environment } from 'environments/environment';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LeaveService {

    private uri = environment.apiUrl + "leave/";
    constructor(private http: HttpClient) { }

    getLeaveTypeDropdown(param): Observable<any> {
        return this.http.post(this.uri + "getLeaveTypeDropdown", param).pipe(
            switchMap((response: any) => {
                return of(response);
            })
        );
    }

    postLeaveType(param): Observable<any> {
        return this.http.post(this.uri + "postLeaveType", param).pipe(
            switchMap((response: any) => {
                return of(response);
            })
        );
    }

    postLeaveBalance(param): Observable<any> {
        return this.http.post(this.uri + "postLeaveBalance", param).pipe(
            switchMap((response: any) => {
                return of(response);
            })
        );
    }

    getLeaveType(param): Observable<any[]> {
        let params = new HttpParams();
        params = params.append('id', param);
        return this.http.get<any[]>(this.uri + "getLeaveType", { params: params });
    }


    getLeaveBalanceTable(param): Observable<any> {
        return this.http.post(this.uri + "getLeaveBalanceTable", param).pipe(
          switchMap((response: any) => {
            return of(response);
          })
        );
      }

    getSupervisorViewEmployeeFilesLeave(param): Observable<any> {
    return this.http.post(this.uri + "getSupervisorViewEmployeeFilesLeave", param).pipe(
        switchMap((response: any) => {
        return of(response);
        })
    );
    }
}
