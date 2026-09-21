import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavigationComponent, provideNavigationService } from '@flight-demo/shared/navigation';


@Component({
  // eslint-disable-next-line @angular-eslint/prefer-on-push-component-change-detection -- preserves the workshop's pre-v22 behavior
  changeDetection: ChangeDetectionStrategy.Eager,
  selector: 'app-flight-booking',
  imports: [
    RouterOutlet,
    NavigationComponent
  ],
  template: `
    <app-navigation class="nav-standalone" />

    <div>
      <router-outlet></router-outlet>
    </div>
  `,
  providers: [
    provideNavigationService([
      {
        route: 'flight/search',
        label: 'Flight Search',
        icon: 'flight'
      },
      {
        route: 'airport',
        label: 'Airports',
        icon: 'flight'
      }
    ])
  ]
})
export class FlightBookingComponent {}
