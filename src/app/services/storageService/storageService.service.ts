import { HttpBackend, HttpClient, HttpParams ,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class StorageServiceService {

    private uri = environment.apiUrl + "storage/";
    constructor(private http: HttpClient, private handler: HttpBackend) { }


    fileUpload(param, transactionId, moduleId,id): Observable<any> {
        var series = sessionStorage.getItem('se')
        var loginId = sessionStorage.getItem('u') || '';
        var encrseries = sessionStorage.getItem('sc') || '';
        var user = sessionStorage.getItem('u') || '';

        const headers = new HttpHeaders()
        .set('Series', encrseries)
        .set('LoginID', loginId)
        .set('User', user)

        this.http = new HttpClient(this.handler)
        return this.http.post(this.uri + "fileUpload/" + transactionId + "/" + moduleId + "/" + series + "/" + id +"/shared" , param,{ headers }).pipe(
            switchMap((response: any) => {
                return of(response);
            })
        );
    }

    fileList(param): Observable<any[]> {
        let params = new HttpParams();
        params = params.append('file', param);
        return this.http.get<any[]>(this.uri + "fileList", { params: params });
    }

    fileDownload(filename,transactionIds,moduleIds): Observable<any[]> {
        let headers = new HttpHeaders()
        headers = headers.set('Series', sessionStorage.getItem('sc'));
        headers = headers.set('LoginID', sessionStorage.getItem('u'));
        headers = headers.set('User', sessionStorage.getItem('dn'));
        // return this.http.get<any[]>(this.uri + "fileDownload/"+ filename + "/" + transactionIds + "/" + moduleIds + "/shared"  ,{ responseType: 'blob' as 'json',headers : headers  });
        return this.http.get<any>(`${this.uri}fileDownload/${filename}/${transactionIds}/${moduleIds}/shared`, {
            headers: headers
          });
    }

    fileUrl(filename,transactionIds,moduleIds): Observable<any[]> {
        let headers = new HttpHeaders()
        headers = headers.set('Series', sessionStorage.getItem('sc'));
        headers = headers.set('LoginID', sessionStorage.getItem('u'));
        headers = headers.set('User', sessionStorage.getItem('dn'));
        return this.http.get<any[]>(this.uri + "fileUrl/"+ filename + "/" + transactionIds + "/" + moduleIds + "/shared" ,{ responseType: 'blob' as 'json' });
    }
}
