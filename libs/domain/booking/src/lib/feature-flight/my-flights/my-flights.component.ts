import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/prefer-on-push-component-change-detection -- preserves the workshop's pre-v22 behavior
  changeDetection: ChangeDetectionStrategy.Eager,
  selector: 'app-my-flights',
  standalone: true,
  imports: [],
  template: `
    <div class="card">
      <div class="card-header">
        <h2 class="card-title">My Flights</h2>
      </div>

      <div class="card-body">
        <p>Find your booked flights here.</p>
      </div>
    </div>
  `,
  styles: ``
})
export class MyFlightsComponent {

}
