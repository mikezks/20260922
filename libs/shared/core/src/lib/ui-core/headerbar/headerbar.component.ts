import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';


@Component({
  // eslint-disable-next-line @angular-eslint/prefer-on-push-component-change-detection -- preserves the workshop's pre-v22 behavior
  changeDetection: ChangeDetectionStrategy.Eager,
  selector: 'app-headerbar-cmp',
  templateUrl: 'headerbar.component.html'
})
export class HeaderbarComponent {
  private readonly body = inject(DOCUMENT).getElementsByTagName('body')[0];

  sidebarVisible = false;

  sidebarToggle() {
    if (this.sidebarVisible == false) {
      this.body.classList.add('nav-open');
      this.sidebarVisible = true;
    } else {
      this.sidebarVisible = false;
      this.body.classList.remove('nav-open');
    }
  }
}
