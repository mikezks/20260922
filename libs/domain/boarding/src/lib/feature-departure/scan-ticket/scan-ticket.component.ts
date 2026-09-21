import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/prefer-on-push-component-change-detection -- preserves the workshop's pre-v22 behavior
  changeDetection: ChangeDetectionStrategy.Eager,
  selector: 'app-scan-ticket',
  standalone: true,
  imports: [],
  template: `
    <div class="card">
      <div class="card-header">
        <h2 class="card-title">Scan Ticket</h2>
      </div>

      <div class="card-body">
        <p>Scan your ticket here.</p>
      </div>
    </div>
  `,
  styles: ``
})
export class ScanTicketComponent {

}
