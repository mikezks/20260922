import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderbarComponent, SidebarComponent } from '@flight-demo/shared/core';


@Component({
  // eslint-disable-next-line @angular-eslint/prefer-on-push-component-change-detection -- preserves the workshop's pre-v22 behavior
  changeDetection: ChangeDetectionStrategy.Eager,
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderbarComponent,
    SidebarComponent
  ],
  template: `
    <div class="wrapper">
      <div class="sidebar" data-color="white" data-active-color="danger">
        <app-sidebar-cmp />
      </div>

      <div class="main-panel">
        <app-headerbar-cmp />

        <div class="content">

          <router-outlet />

        </div>

      </div>
    </div>
  `
})
export class App {
}
