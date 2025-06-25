import { HttpBackend, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, of, switchMap } from 'rxjs';
import { AuthService } from '../authService/auth.service';
import { TranslocoService } from '@ngneat/transloco';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private uri = environment.apiUrl + 'user/';
    private csrf = environment.apiUrl + 'security/';
    constructor(
        private http: HttpClient,
        private auth: AuthService,
        private handler: HttpBackend,
        private translocoService: TranslocoService
    ) {}

    postEmployee(param): Observable<any> {
        return this.http.post(this.uri + 'postEmployee', param).pipe(
            switchMap((response: any) => {
                return of(response);
            })
        );
    }

    postChangePassword(login, password): Observable<any> {
        login = login;
        let params = new HttpParams();
        params = params.append('password', password);
        return this.http
            .post(this.uri + 'postChangePassword', login, { params: params })
            .pipe(
                switchMap((response: any) => {
                    return of(response);
                })
            );
    }

    postUpdatePassword(oldpass, newpass): Observable<any> {
        let params = new HttpParams();
        params = params.append('oldpass', oldpass);
        params = params.append('newpass', newpass);
        return this.http
            .post(this.uri + 'postUpdatePassword', {}, { params: params })
            .pipe(
                switchMap((response: any) => {
                    return of(response);
                })
            );
    }

    getEmployeeDropdown(param): Observable<any> {
        return this.http.post(this.uri + 'getEmployeeDropdown', param).pipe(
            switchMap((response: any) => {
                return of(response);
            })
        );
    }

    getEmployee(param): Observable<any[]> {
        let params = new HttpParams();
        params = params.append('id', param);
        return this.http.get<any[]>(this.uri + 'getEmployee', {
            params: params,
        });
    }

    getHierarchyEmployee(): Observable<any> {
        return this.http.get<any[]>(this.uri + 'getHierarchyEmployee');
    }

    getSearchHierarchy(param, mgnt, reports = false): Observable<any> {
        var path = mgnt
            ? 'GetSearchHierarchySupervisor'
            : reports
            ? 'getPayrollSearchEmployee'
            : 'getSearchHierarchy';
        return this.http.post(this.uri + path, param).pipe(
            switchMap((response: any) => {
                return of(response);
            })
        );
    }

    getSearchHierarchyEmployee(param): Observable<any> {
        return this.http
            .post(this.uri + 'getSearchHierarchyEmployee', param)
            .pipe(
                switchMap((response: any) => {
                    return of(response);
                })
            );
    }

    getEmployeeLeaveBalance(tid): Observable<any> {
        let params = new HttpParams();
        params = params.append('id', tid);
        return this.http.get<any>(this.uri + 'getEmployeeLeaveBalance', {
            params: params,
        });
    }

    getEmployeeGenerateCode(login): Observable<any> {
        let params = new HttpParams();
        return this.http.post(this.uri + 'getEmployeeGenerateCode', login).pipe(
            switchMap((response: any) => {
                return of(response);
            })
        );
    }

    getCodeValidation(username, code): Observable<any> {
        let params = new HttpParams();
        params = params.append('username', username);
        params = params.append('code', code);
        return this.http.post(
            this.uri + 'getCodeValidation',
            {},
            { params: params }
        );
    }

    getSalaryRate(payrollId, monthlyrate): Observable<any> {
        let params = new HttpParams();
        params = params.append('payrollcategory', payrollId);
        params = params.append('monthlyrate', monthlyrate);
        return this.http.get<any>(this.uri + 'getSalaryRate', {
            params: params,
        });
    }

    getAssignLocationMap(model): Observable<any> {
        return this.http.post(this.uri + 'getAssignLocationMap', model);
    }

    getAssignLocationDropdown(req): Observable<any> {
        return this.http.post(this.uri + 'getAssignLocationDropdown', req);
    }

    postAssignLocation(model): Observable<any> {
        return this.http.post(this.uri + 'postAssignLocation', model);
    }

    getEmployeeOrgChart(id, cat): Observable<any> {
        let params = new HttpParams();
        params = params.append('id', id);
        params = params.append('cat', cat);
        return this.http.get<any[]>(this.uri + "getEmployeeOrgChart", {params: params});
    }

    getClientEmployeeList(param): Observable<any> {
        return this.http.post(this.uri + 'getClientEmployeeList', param).pipe(
            switchMap((response: any) => {
                return of(response);
            })
        );
    }

    authenticateLoginAs(param): Observable<any> {
        return this.http.post(this.uri + 'authenticateLoginAs', param).pipe(
            switchMap((response: any) => {
                return of(response);
            })
        );
    }

    // e201
    postE201Requirement(param): Observable<any> {
        let params = new HttpParams();
        return this.http.post(this.uri + "postE201Requirement", param, { params: params })
    }

    getEmployeeTable(param): Observable<any> {
        let params = new HttpParams();
        return this.http.post(this.uri + "getEmployeeTable", param, { params: params })

    }

    getE201Requirement(param): Observable<any[]> {
        let params = new HttpParams();
        params = params.append('id', param);
        return this.http.get<any[]>(this.uri + "getE201Requirement", { params: params });
    }

    getE201NewHireRequirement(param): Observable<any[]> {
        let params = new HttpParams();
        params = params.append('employeeId', param);
        return this.http.get<any[]>(this.uri + "getE201NewHireRequirement", { params: params });
    }

    getE201WorkEducationHistory(param): Observable<any[]> {
        let params = new HttpParams();
        params = params.append('employeeId', param);
        return this.http.get<any[]>(this.uri + "getE201WorkEducationHistory", { params: params });
    }

    getE201EmployeeRecord(param): Observable<any[]> {
        let params = new HttpParams();
        params = params.append('employeeId', param);
        return this.http.get<any[]>(this.uri + "getE201EmployeeRecord", { params: params });
    }

    getE201CompanyAssets(param): Observable<any[]> {
        let params = new HttpParams();
        params = params.append('employeeId', param);
        return this.http.get<any[]>(this.uri + "getE201CompanyAssets", { params: params });

    }

    getE201IncidentReportMemo(param): Observable<any[]> {
        let params = new HttpParams();
        params = params.append('employeeId', param);
        return this.http.get<any[]>(this.uri + "getE201IncidentReportMemo", { params: params });
    }

    getE201EmployeeLearning(param): Observable<any[]> {
        let params = new HttpParams();
        params = params.append('employeeId', param);
        return this.http.get<any[]>(this.uri + "getE201EmployeeLearning", { params: params });
    }

    get2316EmployeeById(param): Observable<any[]> {
        let params = new HttpParams();
        params = params.append('Id', param);
        return this.http.get<any[]>(this.uri + "get2316EmployeeById", { params: params });

    }

    postE201EmployeeData(model): Observable<any> {
        return this.http.post(this.uri + "postE201EmployeeData" ,model);

    }

    postEmployeeSettings(language): Observable<any> {
        let params = new HttpParams();
        params = params.append('language', language);
        return this.http.post(this.uri + "postEmployeeSettings" ,params);

    }

    getE201Employee2316Table(request,employeeId): Observable<any> {
        let params = new HttpParams();
        params = params.append('employeeId', employeeId);
        return this.http.post(this.uri + "getE201Employee2316Table",request, { params: params })

    }

    getEmployeeMovementTable(request): Observable<any> {
        let params = new HttpParams();
        return this.http.post(this.uri + "getEmployeeMovementTable",request)

    }

    getCsrfToken(): Observable<any> {
        return this.http.get<any>(this.csrf + "csrf-token");
    }

}

@Injectable({
    providedIn: 'root' // Ensures it's globally available
})
export class TranslationService {
    private static translocoService: TranslocoService;

    constructor(private service: TranslocoService) {
        TranslationService.translocoService = service;
    }

    // Static method for global translation
    static translate(key: string, params?: Record<string, any>, lang?: string): string {
        return this.translocoService ? this.translocoService.translate(key, params, lang) : key;
    }
}
