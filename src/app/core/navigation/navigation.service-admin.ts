import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Navigationtypeadmin } from 'app/core/navigation/navigation.types-admin';
import { environment } from 'environments/environment';
import { first, Observable, ReplaySubject, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NavigationServiceadmin {
    private _httpClient = inject(HttpClient);
    private _navigation: ReplaySubject<Navigationtypeadmin> =
        new ReplaySubject<Navigationtypeadmin>(1);
    requested = false;
    loginId = '';
    private uri = environment.apiUrl + 'master/';
    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for navigation
     */
    get navigation$(): Observable<Navigationtypeadmin> {
        return this._navigation.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get all navigation data
     */
    get(): Observable<Navigationtypeadmin> {
        debugger
        // if (this.requested && this.loginId == sessionStorage.getItem('u')) {
        //     return this._navigation.pipe(first());
        // }

        // if (sessionStorage.getItem('issu') == 'true') {
            return this._httpClient
                .get<Navigationtypeadmin>('api/common/navigation')
                .pipe(
                    tap((Navigationtypeadmin) => {
                        this._navigation.next(Navigationtypeadmin);
                        console.log(Navigationtypeadmin);
                    })
                );
        // } else {
        //     return this._httpClient
        //         .get<Navigation>(this.uri + 'getDynamicMenu')
        //         .pipe(
        //             tap((navigation) => {
        //                 this._navigation.next(navigation['payload']);
        //                 this.requested = true;
        //                 this.loginId = sessionStorage.getItem('u');
        //             })
        //         );
        // }
    }
}
