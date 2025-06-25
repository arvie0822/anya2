import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FilingService {
    private uri = environment.apiUrl + "filing/";
    constructor(private http: HttpClient) { }

    postChangeSchedule(param, tid,late): Observable<any> {
        let params = new HttpParams();
        params = params.append('late', late);
        params = params.append('tid', tid);
        return this.http.post(this.uri + "postChangeSchedule", param, { params: params })
    }

    postChangeLog(param, tid,late): Observable<any> {
        let params = new HttpParams();
        params = params.append('late', late);
        params = params.append('tid', tid);
        return this.http.post(this.uri + "postChangeLog", param, { params: params })
    }

    getFilingValidationOnUI(param): Observable<any> {
        return this.http.post(this.uri + "getFilingValidationOnUI", param).pipe(
            switchMap((response: any) => {
                return of(response);
            })
        );
    }

    cancelChangeSchedule(id): Observable<any> {
        let params = new HttpParams();
        params = params.append('id', id );
        return this.http.post(this.uri + "cancelChangeSchedule",{} ,{ params: params })
    }


    cancelChangeLog(id): Observable<any> {
        let params = new HttpParams();
        params = params.append('id', id );
        return this.http.post(this.uri + "cancelChangeLog",{} ,{ params: params })
    }

    cancelOvertime(id,late): Observable<any> {
        let params = new HttpParams();
        params = params.append('id', id );
        params = params.append('late', late );
        return this.http.post(this.uri + "cancelOvertime",{} ,{ params: params })
    }

    postLeave(param, targetId,late): Observable<any> {
        let params = new HttpParams();
        params = params.append('tid', targetId);
        params = params.append('late', late);
        return this.http.post(this.uri + "postLeave", param, { params: params })
    }

    postOfficialBusiness(param, tid,late): Observable<any> {
        let params = new HttpParams();
        params = params.append('tid', tid);
        params = params.append('late', late);
        return this.http.post(this.uri + "postOfficialBusiness", param, { params: params})
    }

    postOvertime(param, tid,late): Observable<any> {
        let params = new HttpParams();
        params = params.append('tid', tid);
        params = params.append('late', late);
        return this.http.post(this.uri + "postOvertime", param, { params: params })
    }


    postOffset(param, tid,late): Observable<any> {
        let params = new HttpParams();
        params = params.append('tid', tid);
        params = params.append('late', late);
        return this.http.post(this.uri + "postOffset", param, { params: params })
    }

    postCOE(param, tid,late): Observable<any> {
        let params = new HttpParams();
        params = params.append('tid', tid);
        params = params.append('late', late);
        return this.http.post(this.uri + "postCOE", param, { params: params })
    }


    postUnpaidBreak(param, tid,late): Observable<any> {
        let params = new HttpParams();
        params = params.append('tid', tid);
        params = params.append('late', late);
        return this.http.post(this.uri + "postUnpaidBreak", param, { params: params })
    }


    getFilingLeaveBalance(tid): Observable<any[]> {
        let params = new HttpParams();
        params = params.append('tid', tid);
        return this.http.get<any[]>(this.uri + "getFilingLeaveBalance", { params: params });
    }


    getFilingOffsetBalance(tid , ie): Observable<any[]> {
        let params = new HttpParams();
        params = params.append('tid', tid);
        params = params.append('ie', ie);
        return this.http.get<any[]>(this.uri + "getFilingOffsetBalance", { params: params });
    }



    postCancelFiling(mid, tid,late): Observable<any> {
        let params = new HttpParams();
        params = params.append('tid', tid);
        params = params.append('mid', mid);
        params = params.append('late', late);
        return this.http.post(this.uri + "postCancelFiling", {}, { params: params }).pipe(
            switchMap((response: any) => {
                return of(response);
            })
        );
    }

    searchFilingTable(param, mid, tid): Observable<any> {
        let params = new HttpParams();
        params = params.append('tid', tid);
        params = params.append('mid', mid);
        return this.http.post(this.uri + "searchFilingTable", param, { params: params }).pipe(
            switchMap((response: any) => {
                return of(response);
            })
        );
    }

    getFilingTable(param,): Observable<any> {
        return this.http.post(this.uri + "getFilingTable", param).pipe(
            switchMap((response: any) => {
                return of(response);
            })
        );
    }

    getChangeLog(param): Observable<any[]> {
        let params = new HttpParams();
        params = params.append('id', param);
        return this.http.get<any[]>(this.uri + "getChangeLog", { params: params });
    }

    getLeave(param): Observable<any[]> {
        let params = new HttpParams();
        params = params.append('id', param);
        return this.http.get<any[]>(this.uri + "getLeave", { params: params });
    }



    getOfficialBusiness(param): Observable<any[]> {
        let params = new HttpParams();
        params = params.append('id', param);
        return this.http.get<any[]>(this.uri + "getOfficialBusiness", { params: params });
    }

    getOvertime(param): Observable<any[]> {
        let params = new HttpParams();
        params = params.append('id', param);
        return this.http.get<any[]>(this.uri + "getOvertime", { params: params });
    }

    getOffset(param): Observable<any[]> {
        let params = new HttpParams();
        params = params.append('id', param);
        return this.http.get<any[]>(this.uri + "getOffset", { params: params });
    }

    getCOE(param): Observable<any[]> {
        let params = new HttpParams();
        params = params.append('id', param);
        return this.http.get<any[]>(this.uri + "getCOE", { params: params });
    }

    getUnpaidBreak(param): Observable<any[]> {
        let params = new HttpParams();
        params = params.append('id', param);
        return this.http.get<any[]>(this.uri + "getUnpaidBreak", { params: params });
    }

    getChangeSchedule(param): Observable<any[]> {
        let params = new HttpParams();
        params = params.append('id', param);
        return this.http.get<any[]>(this.uri + "getChangeSchedule", { params: params });
    }

    postChangeLocation(body,tid,late): Observable<any[]> {
        let params = new HttpParams();
        params = params.append('tid', tid);
        params = params.append('late', late);
        return this.http.post(this.uri + "postChangeLocation", body, { params: params }).pipe(
            switchMap((response: any) => {
                return of(response);
            })
        );
    }

    getPreApprovetOTTable(param): Observable<any> {
        return this.http.post(this.uri + "getPreApprovetOTTable", param).pipe(
            switchMap((response: any) => {
                return of(response);
            })
        );
    }

    postPreApprovedOT(param, late): Observable<any> {
        let params = new HttpParams();
        params = params.append('late', late);
        return this.http.post(this.uri + "postPreApprovedOT", param, { params: params })
    }


        getPreApprovedOT(param): Observable<any[]> {
        let params = new HttpParams();
        params = params.append('id', param);
        return this.http.get<any[]>(this.uri + "getPreApprovedOT", { params: params });
    }

    getChangeLocation(param): Observable<any[]> {
        let params = new HttpParams();
        params = params.append('id', param);
        return this.http.get<any[]>(this.uri + "getChangeLocation", { params: params });
    }

    getSupervisorViewApproval(param): Observable<any> {
        return this.http.post(this.uri + "getSupervisorViewApproval", param).pipe(
          switchMap((response: any) => {
            return of(response);
          })
        );
    }

    getEmployeeDataChangeFiling(param): Observable<any[]> {
        let params = new HttpParams();
        params = params.append('id', param);
        return this.http.get<any[]>(this.uri + "getEmployeeDataChangeFiling", { params: params });
    }

    getEmployeePropertiesWithData(fields): Observable<any> {
        return this.http.post(this.uri + "getEmployeePropertiesWithData", fields)
    }

    postEmployeeDataChange(param,tid): Observable<any> {
        let params = new HttpParams();
        params = params.append('tid', tid);
        return this.http.post(this.uri + "postEmployeeDataChange", param, { params: params })
    }

    postTerminateEmployee(param): Observable<any> {
        return this.http.post(this.uri + "postTerminateEmployee", param)
    }

    postExtendRegularization(param): Observable<any> {
        return this.http.post(this.uri + "postExtendRegularization", param)
    }
}
