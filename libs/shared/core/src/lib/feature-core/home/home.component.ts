import { ChangeDetectionStrategy, Component } from '@angular/core';


@Component({
  // eslint-disable-next-line @angular-eslint/prefer-on-push-component-change-detection -- preserves the workshop's pre-v22 behavior
  changeDetection: ChangeDetectionStrategy.Eager,
  selector: 'app-home',
  imports: [],
  template: `
    <div class="card">
      <div class="card-header">
        <h2 class="card-title">Modern Angular: Architecture</h2>
      </div>

      <div class="card-body">
        <ul>
          <li>Signals</li>
          <li>Signal Forms</li>
          <li>Enterprise State Management</li>
          <li>Domain-driven Design</li>
          <li>Micro Frontends</li>
          <li>... and much more!</li>
        </ul>
      </div>
    </div>
  `,
  styles: [`
    code {
      color: blue;
    }
  `]
})
export class HomeComponent {
}
