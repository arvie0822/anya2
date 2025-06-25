import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { FuseFullscreenComponent } from '@fuse/components/fullscreen';
import { FuseLoadingBarComponent } from '@fuse/components/loading-bar';
import {
    FuseHorizontalNavigationComponent,
    FuseNavigationService,
    FuseVerticalNavigationComponent,
} from '@fuse/components/navigation';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { NavigationService } from 'app/core/navigation/navigation.service';
import { Navigation } from 'app/core/navigation/navigation.types';
import { LanguagesComponent } from 'app/layout/common/languages/languages.component';
import { UserComponent } from 'app/layout/common/user/user.component';
import { Subject, Subscription, takeUntil } from 'rxjs';
import Gleap from 'gleap';
import { DarkLightModule } from 'app/layout/common/dark-light/dark-light.module';
import { BundyModule } from 'app/layout/common/bundy/bundy.module';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SessionTimeoutComponent } from 'app/core/session-timeout/session-timeout.component';
import { SuccessMessage } from 'app/model/message.constant';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { CoreService } from 'app/services/coreService/coreService.service';
import { MasterService } from 'app/services/masterService/master.service';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import 'zone.js';
import { AuthService } from 'app/services/authService/auth.service';

@Component({
    selector: 'modern-layout',
    templateUrl: './modern.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
    FuseLoadingBarComponent,
    FuseVerticalNavigationComponent,
    FuseHorizontalNavigationComponent,
    MatButtonModule,
    MatIconModule,
    FuseFullscreenComponent,
    UserComponent,
    RouterOutlet,
    DarkLightModule,
    BundyModule,
    LanguagesComponent,
    RouterLink,
    RouterModule
],
})
export class ModernLayoutComponent implements OnInit, OnDestroy {
    isScreenSmall: boolean;
    navigation: Navigation;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    bundy = false
    companyname = sessionStorage.getItem('cn')
    device = sessionStorage.getItem('device')
    route = sessionStorage.getItem('route')
    is = (sessionStorage.getItem('is') == "true")
    isIsView = true

    idleState = "NOT_STARTED";
    countdown?: number = null;
    lastPing?: Date = null;
    dialogRef: MatDialogRef<SessionTimeoutComponent, any>;
    onIdleStartSubscription: Subscription
    onIdleEndSubscription: Subscription
    onTimeoutSubscription: Subscription
    onTimeoutWarningSubscription: Subscription
    onPingSubscription: Subscription
    successMessage = Object.assign({},SuccessMessage)

    /**
     * Constructor
     */
    constructor(
        private _router: Router,
        private _navigationService: NavigationService,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _fuseNavigationService: FuseNavigationService,
        private idle: Idle,
        keepalive: Keepalive,
        cd: ChangeDetectorRef,
        public dialog: MatDialog,
        private core: CoreService,
        private message: FuseConfirmationService,
        private auth: AuthService,
    ) {
        this.usetifulRun();
        this.idleRun(idle, cd, keepalive);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for current year
     */
    get currentYear(): number {
        return new Date().getFullYear();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Initialize Idle
        this.reset()
        // Subscribe to navigation data
        this._navigationService.navigation$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((navigation: Navigation) => {
                this.navigation = navigation;
            });

        this.bundy = (sessionStorage.getItem('bundy')=="true")

        this.startTour()
        // Subscribe to media changes
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({ matchingAliases }) => {
                // Check if the screen is small
                this.isScreenSmall = !matchingAliases.includes('md');
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();

        if (this.onIdleStartSubscription) {
            console.log("ngOnDestroy")
            this.onIdleStartSubscription.unsubscribe();
            this.onIdleEndSubscription.unsubscribe();
            this.onTimeoutSubscription.unsubscribe();
            this.onTimeoutWarningSubscription.unsubscribe();
            this.onPingSubscription.unsubscribe();
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle navigation
     *
     * @param name
     */
    toggleNavigation(name: string): void {
        // Get the navigation
        const navigation =
            this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>(
                name
            );

        if (navigation) {
            // Toggle the opened status
            navigation.toggle();
        }
    }

    switchPage(){
        if (this.is) {
            var link = this.isIsView ? '/dashboard/employee' : '/dashboard/supervisor'
            this.isIsView = !this.isIsView
            this._router.navigate([link]);
        }
    }

    usetifulRun() {
        if (this.auth.isAuthenticated()) {
            var element = document.querySelector("#usetifulScript")
            if (!element) {
                // element.remove();
                var supervisor = (sessionStorage.getItem('is') == 'true')
                window["usetifulTags"] = {
                    userId: localStorage.getItem("series") + "_1" + sessionStorage.getItem("u"),
                    company: localStorage.getItem("series"),
                    role: supervisor ? "Supervisor" : "Basic",
                    display_name: localStorage.getItem("dn"),
                    reportTag: sessionStorage.getItem("reportTag") == "true",
                    language : sessionStorage.getItem("activeLang")
                };

                var a = document.getElementsByTagName('head')[0];
                var r = document.createElement('script');
                r.async = true;
                r.src = "https://www.usetiful.com/dist/usetiful.js";
                r.setAttribute('id', 'usetifulScript');
                r.dataset.token = "fea529879f55a374d77cd3ff88898b9b";
                a.appendChild(r);
            }
        }
    }

    startTour() {
        var supervisor = (sessionStorage.getItem('is') == 'true')
        var obj = {
            name: sessionStorage.getItem("dn"),
            companyId: sessionStorage.getItem("se"),
            companyName: sessionStorage.getItem("cc"),
            customData: {
                companyCode: sessionStorage.getItem("cc"),
                companyName: sessionStorage.getItem("cn"),
                seriesCode: sessionStorage.getItem("se"),
                gleapTour: supervisor ? "Supervisor" : "Basic",
                usetifulTour: localStorage.getItem('usetiful'),
                reportTag: sessionStorage.getItem("reportTag") == "true",
                language : sessionStorage.getItem("activeLang"),
            },
        }

        Gleap.identify(sessionStorage.getItem("u"), obj, "GENERATED_USER_HASH");
        Gleap.trackEvent("User signed in", { userId: sessionStorage.getItem("u"), name: obj.name, date: new Date() });
        Gleap.startProductTour("660a4219a844991918862ade");

    }

    idleRun(idle, cd, keepalive) {
        // set idle parameters
        idle.setIdle(900); // how long can they be inactive before considered idle, in seconds 900
        idle.setTimeout(120); // how long can they be idle before considered timed out, in seconds 120
        idle.setInterrupts(DEFAULT_INTERRUPTSOURCES); // provide sources that will "interrupt" aka provide events indicating the user is active

        // do something when the user becomes idle
        this.onIdleStartSubscription = idle.onIdleStart.subscribe(() => {
            this.idleState = "IDLE";
            // console.log(this.idleState, this.countdown)
            this.idStart();
        });
        // do something when the user is no longer idle
        this.onIdleEndSubscription = idle.onIdleEnd.subscribe(() => {
            this.idleState = "NOT_IDLE";
            // console.log(`${this.idleState} ${new Date()}`)
            this.countdown = null;
            cd.detectChanges(); // how do i avoid this kludge?
        });
        // do something when the user has timed out
        this.onTimeoutSubscription = idle.onTimeout.subscribe(() => {
            this.idleState = "TIMED_OUT";
            // console.log(this.idleState)
            this.dialogRef.close();
            this.logout(false)
        });
        // do something as the timeout countdown does its thing
        this.onTimeoutWarningSubscription = idle.onTimeoutWarning.subscribe(seconds => {
            this.countdown = seconds;
            this.idleState = 'You have been idle for 15 minutes. You will time out in ' + seconds + ' seconds!'
            this.core.updateIdleState(this.idleState)
            // console.log(this.idleState)
        });

        // set keepalive parameters, omit if not using keepalive
        keepalive.interval(15); // will ping at this interval while not idle, in seconds
        this.onPingSubscription = keepalive.onPing.subscribe(() => {
            this.lastPing = new Date();
            // console.log("lastPing",this.lastPing)
        }); // do something when it pings
    }

    idStart() {
        if (this.dialogRef) {
            this.dialogRef.close()
        }

        var byPassIdle = (sessionStorage.getItem("byPassIdle") == "true")
        if (byPassIdle) {
            this.reset();
            return
        }

        this.dialogRef = this.dialog.open(SessionTimeoutComponent, {
            panelClass: 'app-dialog',
            disableClose: true
        })

        this.dialogRef.componentInstance.btnLogout.subscribe(() => {
            this.logout(true);
        });

        this.dialogRef.componentInstance.btnStay.subscribe(() => {
            this.dialogRef.close()
            this.reset();
        });
    }

    logout(manual) {
        this.idle.stop()
        this.dialogRef.close()
        sessionStorage.clear();
        this.successMessage.title = "Logged out due to inactivity"
        this.successMessage.message = "You have been logged out due to inactivity for 15 minutes!"
        this.successMessage.actions.confirm.label = "Ok"
        if (!manual) {
            this._router.navigate(['/'])
            const diag = this.message.open(this.successMessage);
            diag.afterClosed().subscribe(() => {
                location.reload();
            });
        } else {
            this._router.navigate(['/']).then(() => {
                location.reload();
            });
        }
    }

    reset() {
        // we'll call this method when we want to start/reset the idle process
        // reset any component state and be sure to call idle.watch()
        this.idle.watch();
        this.idleState = "NOT_IDLE";
        this.countdown = null;
        this.lastPing = null;
    }
}
