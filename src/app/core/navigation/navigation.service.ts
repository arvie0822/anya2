import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Navigation } from 'app/core/navigation/navigation.types';
import { environment } from 'environments/environment';
import { first, Observable, ReplaySubject, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NavigationService {
    private _httpClient = inject(HttpClient);
    private _navigation: ReplaySubject<Navigation> =
        new ReplaySubject<Navigation>(1);
    requested = false;
    loginId = '';
    private uri = environment.apiUrl + 'master/';
    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for navigation
     */
    get navigation$(): Observable<Navigation> {
        return this._navigation.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get all navigation data
     */
    get(): Observable<Navigation> {
        if (this.requested && this.loginId == sessionStorage.getItem('u')) {
            return this._navigation.pipe(first());
        }

        if (sessionStorage.getItem('issu') == 'true') {
            return this._httpClient
                .get<Navigation>('api/common/navigation')
                .pipe(
                    tap((navigation) => {
                        this._navigation.next(navigation);
                        console.log(navigation);
                    })
                );
        } else {
            return this._httpClient
                .get<Navigation>(this.uri + 'getDynamicMenu')
                .pipe(
                    tap((navigation) => {
                        this._navigation.next(navigation['payload']);
                        this.requested = true;
                        this.loginId = sessionStorage.getItem('u');
                    })
                );
        }
    }
}
