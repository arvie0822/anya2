import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShiftForm } from 'app/model/administration/ShiftCodes';
import { ShiftCodesPerDay } from 'app/model/administration/shiftcodesperday';
import { DaysOfWeek } from 'app/model/app.constant';
import { environment } from 'environments/environment';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShiftService {

  private uri = environment.apiUrl + "shift/";
  daysOfWeek = DaysOfWeek
  constructor(private http: HttpClient) { }

  postShift(param): Observable<ShiftForm> {
    return this.http.post(this.uri + "postShiftCode", param).pipe(
      switchMap((response: ShiftForm) => {
        return of(response);
      })
    );
  }

  postShiftPerDay(param): Observable<ShiftForm> {
    return this.http.post(this.uri + "postShiftPerDay", param).pipe(
      switchMap((response: ShiftForm) => {
        return of(response);
      })
    );
  }

  postEmployeeShift(param): Observable<ShiftForm> {
    return this.http.post(this.uri + "postEmployeeShift", param).pipe(
      switchMap((response: ShiftForm) => {
        return of(response);
      })
    );
  }

  postEmployeeShiftPerDay(param): Observable<ShiftForm> {
    return this.http.post(this.uri + "postEmployeeShiftPerDay", param).pipe(
      switchMap((response: ShiftForm) => {
        return of(response);
      })
    );
  }

  getShift(param): Observable<any[]> {
    let params = new HttpParams();
    params = params.append('id', param);
    return this.http.get<any[]>(this.uri + "getShiftCode", { params: params });
  }

  getShiftPerDayTable(param): Observable<ShiftCodesPerDay> {
    return this.http.post(this.uri + "getShiftPerDayTable", param).pipe(
      switchMap((response: ShiftCodesPerDay) => {
        return of(response);
      })
    );
  }

  getEmployeeScheduleTag(param): Observable<any[]> {
    let params = new HttpParams();
    params = params.append('id', param);
    return this.http.get<any[]>(this.uri + "getEmployeeScheduleTag", { params: params });
  }

  getEmployeeScheduleTagPerday(param): Observable<any[]> {
    let params = new HttpParams();
    params = params.append('id', param);
    return this.http.get<any[]>(this.uri + "getEmployeeScheduleTagPerday", { params: params });
  }

  getShiftDropdown(param): Observable<any> {
    return this.http.post(this.uri + "getShiftDropdown", param).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }

  getShiftPerDayDropdown(param): Observable<any> {
    return this.http.post(this.uri + "getShiftPerDayDropdown", param).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }


  getShiftCodeMap(param): Observable<any> {
    return this.http.post(this.uri + "getShiftCodeMap", param).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }

  getShiftCodePerDayMap(param): Observable<any> {
    return this.http.post(this.uri + "getShiftCodePerDayMap", param).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }

  getEmployeeSchedule(request, dateFrom, dateTo, id): Observable<any> { 
    let params = new HttpParams(); 
    params = params.append('dateFrom', dateFrom); 
    params = params.append('dateTo', dateTo); 
    params = params.append('i', id); 
    return this.http.post(this.uri + "getEmployeeSchedule",request, { params: params }).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }

  getShiftDetail() {
    let source = []
    for (let i = 0; i <= 6; i++) {
      source.push({
        day: i,
        description: this.daysOfWeek.filter(x => x.id == i)[0].description,
        timeIn: new Date(
          0,
          0,
          0,
          0,
          0,
        ),
        timeOut: new Date(
          0,
          0,
          0,
          0,
          0,
        ),
        timeOutDaysCover: 0,
        totalWorkingHours: 0,
        isRestDay: false,
        halfDayIn: new Date(
          0,
          0,
          0,
          0,
          0,
        ),
        halfDayInDaysCover: 0,
        halfDayOut: new Date(
          0,
          0,
          0,
          0,
          0,
        ),
        halfDayOutDaysCover: 0,
        breaks: 0,
        firstBreakHide: true,
        secondBreakHide: true,
        thirdBreakHide: true,
        firstBreakIn: new Date(
          0,
          0,
          0,
          0,
          0,
        ),
        firstBreakOut: new Date(
          0,
          0,
          0,
          0,
          0,
        ),
        secondBreakIn: new Date(
          0,
          0,
          0,
          0,
          0,
        ),
        secondBreakOut: new Date(
          0,
          0,
          0,
          0,
          0,
        ),
        thirdBreakIn: new Date(
          0,
          0,
          0,
          0,
          0,
        ),
        thirdBreakOut: new Date(
          0,
          0,
          0,
          0,
          0,
        )
      })
    }
    return source
  }
}
