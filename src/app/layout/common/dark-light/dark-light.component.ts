import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { FuseConfig, FuseConfigService, Themes } from '@fuse/services/config';
// import { AppConfig, Scheme, Theme, Themes } from 'app/core/config/app.config';
// import { Layout } from 'app/layout/layout.types';

@Component({
    selector       : 'dark-light',
    templateUrl    : './dark-light.component.html',
    styleUrls: ['./dark-light.component.css'],
    styles       : [
        `
            settings {
                position: static;
                display: block;
                flex: none;
                width: auto;
            }

            @media (screen and min-width: 1280px) {

                empty-layout + settings .settings-cog {
                    right: 0 !important;
                }
            }
        `
    ],
    encapsulation: ViewEncapsulation.None

})
export class DarkLightComponent implements OnInit, OnDestroy
{
    config: FuseConfig;
    layout: string;
    scheme: 'dark' | 'light';
    theme: string;
    themes: Themes;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _router: Router,
        private _fuseConfigService: FuseConfigService
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Subscribe to config changes
        this._fuseConfigService.config$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((config: FuseConfig) => {

                // Store the config
                this.config = config;
            });
        // this.setScheme
        // this.setTheme\
        // console.log(localStorage.getItem('scheme'))
        if (localStorage.getItem('scheme')!=null) {
            this.setScheme(localStorage.getItem('scheme')||'light')
            this.setTheme(localStorage.getItem('theme')||'theme-default')
        }

    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    /**
     * Set the layout on the config
     *
     * @param layout
     */
     setLayout(layout: string): void
     {
         // Clear the 'layout' query param to allow layout changes
         this._router.navigate([], {
             queryParams        : {
                 layout: null
             },
             queryParamsHandling: 'merge'
         }).then(() => {

             // Set the config
             this._fuseConfigService.config = {layout};
         });
     }

     /**
      * Set the scheme on the config
      *
      * @param scheme
      */
     setScheme(scheme: any): void
     {
         localStorage.setItem('scheme',scheme);
         this._fuseConfigService.config = {scheme};
     }

     /**
      * Set the theme on the config
      *
      * @param theme
      */
     setTheme(theme: any): void
     {
         localStorage.setItem('theme',theme);
         this._fuseConfigService.config = {theme};
     }


}
