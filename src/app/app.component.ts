import { Component } from '@angular/core';
import { NavigationEnd, Route, Router, RouterOutlet } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { setTranslocoService } from './model/message.constant';
import Gleap from 'gleap';
Gleap.initialize('nLTao49nVlJMj1nVYIgbg74IgZi9lM9T');

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [RouterOutlet],
})
export class AppComponent {
    /**
     * Constructor
     */
    constructor(private translocoService: TranslocoService, private router: Router) {
        setTranslocoService(this.translocoService); // Initialize Transloco for messages
    }

    ngOnInit(): void {
      this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const currentUrl = event.urlAfterRedirects;

        if (currentUrl.includes('/report-view')) {
           Gleap.setDisablePageTracking(true);
           console.log('page tracking disabled');
        } else {
          Gleap.setDisablePageTracking(false);
          console.log('page tracking enabled');
        }
      }
    });
  }
}
