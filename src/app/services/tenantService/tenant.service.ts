import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Branch } from 'app/model/administration/branch';
import { Subcompany } from 'app/model/administration/sub-company'
import { NewsForm } from 'app/model/administration/news-announcements';
import { environment } from 'environments/environment';
import { Observable, of, switchMap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TenantService {

  private uri = environment.apiUrl + "tenant/";
  constructor(private http: HttpClient) { }

  postBranch(param): Observable<Branch> {
    return this.http.post(this.uri + "postBranch", param).pipe(
      switchMap((response: Branch) => {
        return of(response);
      })
    );
  }

  postSubCompany(param): Observable<Subcompany> {
    return this.http.post(this.uri + "postSubCompany", param).pipe(
      switchMap((response: Subcompany) => {
        return of(response);
      })
    );
  }

  postApprovalWorkflow(param): Observable<any> {
    return this.http.post(this.uri + "postApprovalWorkflow", param).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }

  getApprovalWorkflow(param): Observable<any> {
    let params = new HttpParams();
    params = params.append('id', param);
    return this.http.get<any>(this.uri + "getApprovalWorkflow", { params: params });
  }

  getSubCompanyDropdown(param): Observable<any> {
    return this.http.post(this.uri + "getSubCompanyDropdown", param).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }


  getSubCompany(param): Observable<any[]> {
    let params = new HttpParams();
    params = params.append('id', param);
    return this.http.get<any[]>(this.uri + "getSubCompany", { params: params });
  }

  getDropdown(param): Observable<any> {
    return this.http.post(this.uri + "getDropdownByType", param).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }

  getDropdowSetting(param): Observable<Branch> {
    return this.http.post(this.uri + "getDropdown", param).pipe(
      switchMap((response: Branch) => {
        return of(response);
      })
    );
  }

  postDropdown(param): Observable<any> {
    return this.http.post(this.uri + "postDropdown", param).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }

  getBranch(param): Observable<any[]> {
    let params = new HttpParams();
    params = params.append('id', param);
    return this.http.get<any[]>(this.uri + "getBranch", { params: params });
  }

  getBranchDropdown(param): Observable<any> {
    return this.http.post(this.uri + "getBranchDropdown", param).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }

  PostNewsAnnouncements(param): Observable<NewsForm> {
    return this.http.post(this.uri + "PostNewsAnnouncements", param).pipe(
      switchMap((response: NewsForm) => {
        return of(response);
      })
    );
  }

  getCategoryDropdown(param): Observable<any> {
    return this.http.post(this.uri + "getCategoryDropdown", param).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }

  getNewsAnnouncements(param): Observable<any[]> {
    let params = new HttpParams();
    params = params.append('id', param);
    return this.http.get<any[]>(this.uri + "getNewsAnnouncements", { params: params });
  }

  getSystemLogs(param): Observable<any> {
    return this.http.post(this.uri + "getSystemLogs", param).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }

  getApprovalModules(param): Observable<any> {
    let params = new HttpParams();
    params = params.append('id', param);
    return this.http.get<any>(this.uri + "getApprovalModules", { params: params });
  }

  getApprovalWorkflowDropdown(param): Observable<any> {
    return this.http.post(this.uri + "getApprovalWorkflowDropdown", param).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }

  postAccessControl(param): Observable<any> {
    return this.http.post(this.uri + "postAccessControl", param).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }

  getAccessControlPerModule(param): Observable<any[]> {
    let params = new HttpParams();
    params = params.append('id', param);
    return this.http.get<any[]>(this.uri + "getAccessControlPerModule", { params: params });
  }

  getAccessControl(param): Observable<any[]> {
    let params = new HttpParams();
    params = params.append('id', param);
    return this.http.get<any[]>(this.uri + "getAccessControl", { params: params });
  }

  getAccessControlDropdown(param): Observable<any> {
    return this.http.post(this.uri + "getAccessControlDropdown", param).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }

  //Dashboard
  getDashboardCalendar(tid, dt, df): Observable<any[]> {
    let params = new HttpParams();
    params = params.append('targetId', tid);
    params = params.append('dateFrom', dt);
    params = params.append('dateTo', df);
    return this.http.get<any[]>(this.uri + "getDashboardCalendar", { params: params });
  }

  getApplicationStatus(tid, dt, df, type , status): Observable<any[]> {
    let params = new HttpParams();
    params = params.append('targetId', tid);
    params = params.append('dateFrom', dt);
    params = params.append('dateTo', df);
    params = params.append('type', type);
    params = params.append('status', status);
    return this.http.get<any[]>(this.uri + "getApplicationStatus", { params: params });
  }

  getTimeRecord(tid, dt, df): Observable<any[]> {
    let params = new HttpParams();
    params = params.append('targetId', tid);
    params = params.append('dateFrom', dt);
    params = params.append('dateTo', df);
    return this.http.get<any[]>(this.uri + "getTimeRecord", { params: params });
  }

  getApprovalPendingCount(): Observable<any[]> {
    return this.http.get<any[]>(this.uri + "getApprovalPendingCount");
  }

  getApprovalPendingDropdown(param, mid): Observable<any> {
    let params = new HttpParams();
    params = params.append('mid', mid);
    return this.http.post(this.uri + "getApprovalPendingDropdown", param, { params: params }).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }

  getApprovalPendingTable(param): Observable<any> {
    return this.http.post(this.uri + "getApprovalPendingTable", param).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }

  postApprovalProcess(param, late): Observable<any> {
    let params = new HttpParams();
    params = params.append('late', late);
    return this.http.post(this.uri + "postApprovalProcessv2", param, { params: params }).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }

  getApprovalEmployeeDropdown(param): Observable<any> {
    return this.http.post(this.uri + "getApprovalEmployeeDropdown", param).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }

  getAnnouncements(tid): Observable<any[]> {
    let params = new HttpParams();
    params = params.append('targetId', tid);
    return this.http.get<any[]>(this.uri + "getAnnouncements", { params: params });
  }

  getNextSeriesView(id): Observable<any[]> {
    let params = new HttpParams();
    params = params.append('id', id);
    return this.http.get<any[]>(this.uri + "getNextSeriesView", { params: params });
  }

  getApprovalHistoryTable(param): Observable<any> {
    return this.http.post(this.uri + "getApprovalHistoryTable", param).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }

  getApprovalApprovedDropdown(param): Observable<any> {
    return this.http.post(this.uri + "getApprovalApprovedDropdown", param).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }

  //Supervisor Dashboard
  getSupervisorAlertTable(param): Observable<any> {
    return this.http.post(this.uri + "getSupervisorAlertTable", param).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }

  getEmployeeAlertTable(param): Observable<any> {
    return this.http.post(this.uri + "getEmployeeAlertTable", param).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }

  getEmployeeStatusTable(param): Observable<any> {
    return this.http.post(this.uri + "getEmployeeStatusTable", param).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }

  getSupervisorViewBirthday(param): Observable<any> {
    return this.http.post(this.uri + "getSupervisorViewBirthday", param).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }

  processChanges(): Observable<any> {
    return this.http.post(this.uri + "processChanges", {}).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }

}
