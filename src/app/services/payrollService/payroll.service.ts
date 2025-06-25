import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PayrollService {

    private uri = environment.apiUrl + "payroll/";
    constructor(private http: HttpClient) { }

    postDynamicSSS(param): Observable<any> {
        return this.http.post(this.uri + "postDynamicSSS", param).pipe(
            switchMap((response: any) => {
                return of(response);
            })
        );
    }

    postDynamicPHIC(param): Observable<any> {
        return this.http.post(this.uri + "postDynamicPHIC", param).pipe(
            switchMap((response: any) => {
                return of(response);
            })
        );
    }

    postDynamicTAX(param): Observable<any> {
        return this.http.post(this.uri + "postDynamicTAX", param).pipe(
            switchMap((response: any) => {
                return of(response);
            })
        );
    }

    postDynamicHDMF(param): Observable<any> {
        return this.http.post(this.uri + "postDynamicHDMF", param).pipe(
            switchMap((response: any) => {
                return of(response);
            })
        );
    }

    getStatutory(id, link): Observable<any[]> {
        let params = new HttpParams();
        params = params.append('id', id);
        return this.http.get<any[]>(this.uri + link, { params: params });
    }

  //#region Paycpdes > Deduction
    postLookupDeductionsType(param): Observable<any> {
      return this.http.post(this.uri + "postLookupDeductionsType", param).pipe(
        switchMap((response: any) => {
          return of(response);
        })
      );
    }

    getLookupDeductionsType(param): Observable<any> {
      let params = new HttpParams();
      params = params.append('id', param);
      return this.http.get<any>(this.uri + "getLookupDeductionsType", { params: params });
    }
  //#endregion

  //#region Paycpdes > Loans
    postLookupLoansType(param): Observable<any> {
      return this.http.post(this.uri + "postLookupLoansType", param).pipe(
        switchMap((response: any) => {
          return of(response);
        })
      );
    }

    getLookupLoansType(param): Observable<any> {
      let params = new HttpParams();
      params = params.append('id', param);
      return this.http.get<any>(this.uri + "getLookupLoansType", { params: params });
    }
  //#endregion

  //#region Paycpdes > Earnings
  postLookupEarningsType(param): Observable<any> {
    return this.http.post(this.uri + "postLookupEarningsType", param).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }

  getLookupEarningsType(param): Observable<any> {
    let params = new HttpParams();
    params = params.append('id', param);
    return this.http.get<any>(this.uri + "getLookupEarningsType", { params: params });
  }
//#endregion

  //#region Payroll Category
  postPayrollCategory(param): Observable<any> {
    return this.http.post(this.uri + "postPayrollCategory", param).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }

  getPayrollCategory(param): Observable<any> {
    let params = new HttpParams();
    params = params.append('id', param);
    return this.http.get<any>(this.uri + "getPayrollCategory", { params: params });
  }
//#endregion

PostPayrollLoans(param): Observable<any> {
    return this.http.post(this.uri + "PostPayrollLoans", param).pipe(
        switchMap((response: any) => {
            return of(response);
        })
    );
}

postPayrollDeductions(param): Observable<any> {
    return this.http.post(this.uri + "postPayrollDeductions", param).pipe(
        switchMap((response: any) => {
            return of(response);
        })
    );
}

getPayrollLoans(param): Observable<any[]> {
    let params = new HttpParams();
    params = params.append('id', param);
    return this.http.get<any[]>(this.uri + "getPayrollLoans", { params: params });
}

getPayrollDeductions(param): Observable<any[]> {
    let params = new HttpParams();
    params = params.append('id', param);
    return this.http.get<any[]>(this.uri + "getPayrollDeductions", { params: params });
}

  postLookupRateType(param): Observable<any> {
    return this.http.post(this.uri + "postLookupRateType", param).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }

  postRateType(param): Observable<any> {
    return this.http.post(this.uri + "postRateType", param).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }

  getRateTypeDetails(param): Observable<any[]> {
    let params = new HttpParams();
    params = params.append('id', param);
    return this.http.get<any[]>(this.uri + "getRateTypeDetails", { params: params });
  }

  getLookupRateType(param): Observable<any[]> {
    let params = new HttpParams();
    params = params.append('id', param);
    return this.http.get<any[]>(this.uri + "getLookupRateType", { params: params });
  }
postPayrollRun(param): Observable<any> {
    return this.http.post(this.uri + "postPayrollRun", param).pipe(
        switchMap((response: any) => {
            return of(response);
        })
    );
}

getPayregSheet1(option,payrollcode,model): Observable<any> {
    let params = new HttpParams();
    params = params.append('payrollcode', payrollcode);
    params = params.append('option', option);
    return this.http.post(this.uri + "getPayregSheet1", model, {params: params}).pipe(
        switchMap((response: any) => {
            return of(response);
        })
    );
}

getPGFilter(model): Observable<any> {
    return this.http.post(this.uri + "getPGFilter", model).pipe(
        switchMap((response: any) => {
            return of(response);
        })
    );
}

postPGMain(request): Observable<any> {
    return this.http.post(this.uri + "postPGMain", request).pipe(
        switchMap((response: any) => {
            return of(response);
        })
    );
}

getPGPayrollCutoff(model): Observable<any> {
    return this.http.post(this.uri + "getPGPayrollCutoff", model).pipe(
        switchMap((response: any) => {
            return of(response);
        })
    );
}

getPGMain (payrollcode,model): Observable<any[]> {
    let params = new HttpParams();
    params = params.append('payrollcode', payrollcode);
    return this.http.post(this.uri + "getPGMain", model, {params: params}).pipe(
        switchMap((response: any) => {
            return of(response);
        })
    );
}

getMiscSheet2(option,payrollcode, model): Observable<any> {
    let params = new HttpParams();
    params = params.append('payrollcode', payrollcode);
    params = params.append('option', option);
    return this.http.post(this.uri + "getMiscSheet2", model, {params: params}).pipe(
        switchMap((response: any) => {
            return of(response);
        })
    );
}

getOTSheet3(option,payrollcode, model): Observable<any> {
    let params = new HttpParams();
    params = params.append('payrollcode', payrollcode);
    params = params.append('option', option);
    return this.http.post(this.uri + "getOTSheet3", model, {params: params}).pipe(
        switchMap((response: any) => {
            return of(response);
        })
    );
}

getTaxSheet4(option,payrollcode, model): Observable<any> {
    let params = new HttpParams();
    params = params.append('payrollcode', payrollcode);
    params = params.append('option', option);
    return this.http.post(this.uri + "getTaxSheet4", model, {params: params}).pipe(
        switchMap((response: any) => {
            return of(response);
        })
    );
}

getNTaxSheet5(option,payrollcode, model): Observable<any> {
    let params = new HttpParams();
    params = params.append('payrollcode', payrollcode);
    params = params.append('option', option);
    return this.http.post(this.uri + "getNTaxSheet5", model, {params: params}).pipe(
        switchMap((response: any) => {
            return of(response);
        })
    );
}

getLoanSheet6(option,payrollcode, model): Observable<any> {
    let params = new HttpParams();
    params = params.append('payrollcode', payrollcode);
    params = params.append('option', option);
    return this.http.post(this.uri + "getLoanSheet6", model, {params: params}).pipe(
        switchMap((response: any) => {
            return of(response);
        })
    );
}

getDeductionSheet7(option,payrollcode, model): Observable<any> {
    let params = new HttpParams();
    params = params.append('payrollcode', payrollcode);
    params = params.append('option', option);
    return this.http.post(this.uri + "getDeductionSheet7", model, {params: params}).pipe(
        switchMap((response: any) => {
            return of(response);
        })
    );
}

getPayrollEarnings(param): Observable<any[]> {
    let params = new HttpParams();
    params = params.append('id', param);
    return this.http.get<any[]>(this.uri + "getPayrollEarnings", { params: params });
}

postPayrollEarnings(param): Observable<any> {
    return this.http.post(this.uri + "postPayrollEarnings", param).pipe(
        switchMap((response: any) => {
            return of(response);
        })
    );
}

getPayoutPayslipDropdown(param): Observable<any> {
    return this.http.post(this.uri + "getPayoutPayslipDropdown", param).pipe(
      switchMap((response: any) => {
            return of(response);
        })
    );
}


getBankFile(model): Observable<any> {
    return this.http.post(this.uri + "getBankFile", model).pipe(
        switchMap((response: any) => {
            return of(response);
        })
    );
}

getHierarchyEmployee(): Observable<any> {
    return this.http.get<any[]>(this.uri + "getPayrollHierarchyEmployee");
}

getPayrollSearchHierarchy(model): Observable<any> {
    return this.http.post(this.uri + "getPayrollSearchHierarchy", model).pipe(
        switchMap((response: any) => {
            return of(response);
        })
    );
}

getEDLView(param, tid): Observable<any> {
    let params = new HttpParams();
    params = params.append('tid', tid);
    return this.http.post(this.uri + "getEDLView", param, { params: params }).pipe(
        switchMap((response: any) => {
            return of(response);
        })
    );
}

postPublish(param,option): Observable<any> {
    let params = new HttpParams();
    params = params.append('option', option);
    return this.http.post(this.uri + "postPublish", param, {params:params}).pipe(
        switchMap((response: any) => {
            return of(response);
        })
    );
}
getDynamicStatutoryTable(param,): Observable<any> {
    return this.http.post(this.uri + "getDynamicStatutoryTable", param).pipe(
        switchMap((response: any) => {
            return of(response);
        })
    );
}
getFinalList(request): Observable<any> {
    return this.http.post(this.uri + "getFinalList", request).pipe(
        switchMap((response: any) => {
            return of(response);
        })
    );
}

postLookupPayReg(model): Observable<any> {
    return this.http.post(this.uri + "postLookupPayReg", model).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
}

getLookupPayReg(param): Observable<any> {
    let params = new HttpParams();
    params = params.append('id', param);
    return this.http.get<any>(this.uri + "getLookupPayReg", { params: params });
}

postPGMLocking(encryptedid,islocked): Observable<any> {
    let params = new HttpParams();
    params = params.append('encryptedid', encryptedid);
    params = params.append('islocked', islocked);
    return this.http.post(this.uri + "postPGMLocking", {} ,{params : params}).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
}

postCurrencyRate(request): Observable<any> {
    return this.http.post(this.uri + "postCurrencyRate", request).pipe(
        switchMap((response: any) => {
            return of(response);
        })
    );
}

getCurrencyRate(payrollcode, request): Observable<any> {
    let params = new HttpParams();
    params = params.append('payrollcode', payrollcode);
    return this.http.post(this.uri + "getCurrencyRate", request, {params: params}).pipe(
        switchMap((response: any) => {
            return of(response);
        })
    );
}

getSearchHierarchy(param, mgnt, reports = false): Observable<any> {
    var path = mgnt ? "GetSearchHierarchySupervisor" : reports ? "getPayrollSearchEmployee" : "getPayrollSearchHierarchy"
    return this.http.post(this.uri + path, param).pipe(
        switchMap((response: any) => {
            return of(response);
        })
    );
}

getEmployee2316Table(param): Observable<any> {
    return this.http.post(this.uri + "getEmployee2316Table", param).pipe(
        switchMap((response: any) => {
            return of(response);
        })
    );
}

getEmployeeYear2316Dropdown(): Observable<any> {
    return this.http.get<any>(this.uri + "getEmployeeYear2316Dropdown", {});
}

PostPayrollAnnualized(request): Observable<any> {
    return this.http.post(this.uri + "PostPayrollAnnualized", request).pipe(
        switchMap((response: any) => {
            return of(response);
        })
    );
}

getPayrollAnnualized(payrollcode): Observable<any> {
    let params = new HttpParams();
    params = params.append('payrollcode', payrollcode);
    return this.http.post(this.uri + "getPayrollAnnualized", {}, {params: params}).pipe(
        switchMap((response: any) => {
            return of(response);
        })
    );
}

clearPayrollUpload(payrollCode): Observable<any> {
    const body = { payrollCode };
    return this.http.post(this.uri + "clearPayrollUpload", body).pipe(
        switchMap((response: any) => of(response))
    );
}

postPayrollDeductionsHierarchy(request): Observable<any> {
    return this.http.post(this.uri + "postPayrollDeductionsHierarchy", request).pipe(
        switchMap((response: any) => {
            return of(response);
        })
    );
}

getDeductionsHierarchy(param): Observable<any> {
    let params = new HttpParams();
    params = params.append('id', param);
    return this.http.get<any>(this.uri + "getDeductionsHierarchy", { params: params });
  }


}
