import { NgTemplateOutlet } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import {
    FuseNavigationService,
    FuseVerticalNavigationComponent,
} from '@fuse/components/navigation';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { AvailableLangs, TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { FailedMessage, SaveMessage, SuccessMessage } from 'app/model/message.constant';
import { UserService } from 'app/services/userService/user.service';
import { GF } from 'app/shared/global-functions';
import { take } from 'rxjs';

@Component({
    selector: 'languages',
    templateUrl: './languages.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs: 'languages',
    standalone: true,
    imports: [MatButtonModule, MatMenuModule, NgTemplateOutlet,TranslocoModule,MatIconModule,MatCheckboxModule],
})
export class LanguagesComponent implements OnInit, OnDestroy {
    availableLangs: AvailableLangs;
    activeLang: string;
    flagCodes: any;
    saveMessage = { ...SaveMessage}
    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseNavigationService: FuseNavigationService,
        private _translocoService: TranslocoService,
        private message: FuseConfirmationService,
        private userService : UserService,
        private router: Router,
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Get the available languages from transloco
        this.availableLangs = this._translocoService.getAvailableLangs();

        // Subscribe to language changes
        this._translocoService.langChanges$.subscribe((activeLang) => {
            // Get the active lang
            activeLang = GF.IsEmptyReturn(sessionStorage.getItem('activeLang'), activeLang)
            this.activeLang = activeLang;
            sessionStorage.setItem('activeLang', activeLang);

            // Update the navigation
            this._updateNavigation(activeLang);
        });

        this._translocoService.setActiveLang(this.activeLang);

        // Set the country iso codes for languages for flags
        this.flagCodes = {
            en: 'us',
            // tr: 'tr',
            ph: 'ph',
        };
    }

    savelang() {

        const dialogRef = this.message.open(SaveMessage);
        dialogRef.afterClosed().subscribe((result) => {
            if (result == "confirmed") {
                this.userService.postEmployeeSettings(sessionStorage.getItem('activeLang')).subscribe({
                    next: (value: any) => {
                        if (value.statusCode == 200) {
                            this.message.open(SuccessMessage);
                        }
                        else {
                            FailedMessage.message = "Transaction Failed!"
                            this.message.open(FailedMessage);
                            console.log(value.stackTrace)
                            console.log(value.message)
                        }
                    },
                    error: (e) => {
                        this.message.open(FailedMessage);
                        console.error(e)
                    }
                });
            }
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {}

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Set the active lang
     *
     * @param lang
     */
    setActiveLang(langId: string) {

        this._translocoService.setActiveLang(langId);
        this.activeLang = langId; // Ensure only one is selected
        sessionStorage.setItem('activeLang', langId);
        event.stopPropagation();
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Update the navigation
     *
     * @param lang
     * @private
     */
    private _updateNavigation(lang: string): void {
        // For the demonstration purposes, we will only update the Dashboard names
        // from the navigation but you can do a full swap and change the entire
        // navigation data.
        //
        // You can import the data from a file or request it from your backend,
        // it's up to you.

        // Get the component -> navigation data -> item
        const navComponent =
            this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>(
                'mainNavigation'
            );

        // Return if the navigation component does not exist
        if (!navComponent) {
            return null;
        }

        // Get the flat navigation data
        const navigation = navComponent.navigation;

        // Get the Project dashboard item and update its title
        const projectDashboardItem = this._fuseNavigationService.getItem(
            'dashboards.project',
            navigation
        );
        if (projectDashboardItem) {
            this._translocoService
                .selectTranslate('Project')
                .pipe(take(1))
                .subscribe((translation) => {
                    // Set the title
                    projectDashboardItem.title = translation;

                    // Refresh the navigation component
                    navComponent.refresh();
                });
        }

        // Get the Analytics dashboard item and update its title
        const analyticsDashboardItem = this._fuseNavigationService.getItem(
            'dashboards.analytics',
            navigation
        );
        if (analyticsDashboardItem) {
            this._translocoService
                .selectTranslate('Analytics')
                .pipe(take(1))
                .subscribe((translation) => {
                    // Set the title
                    analyticsDashboardItem.title = translation;

                    // Refresh the navigation component
                    navComponent.refresh();
                });
        }
    }
}
