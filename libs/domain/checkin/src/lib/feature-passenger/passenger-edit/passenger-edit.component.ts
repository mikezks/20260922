import { httpResource } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, effect, input, numberAttribute, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { form, FormField } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import { initialPassenger, Passenger } from '../../logic-passenger/model/passenger';


@Component({
  // eslint-disable-next-line @angular-eslint/prefer-on-push-component-change-detection -- preserves the workshop's pre-v22 behavior
  changeDetection: ChangeDetectionStrategy.Eager,
  selector: 'app-passenger-edit',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    FormField
  ],
  templateUrl: './passenger-edit.component.html'
})
export class PassengerEditComponent {
  private readonly passenger = signal({
    ...initialPassenger,
    firstName: 'Sarah'
  });
  protected readonly editForm = form(this.passenger);

  readonly id = input(0, { transform: numberAttribute });
  protected readonly passengerResource = httpResource<Passenger>(() => ({
    url: 'https://demo.angulararchitects.io/api/passenger',
    params: { id: this.id() }
  }), {
    defaultValue: initialPassenger
  });
  
  protected save(): void {
    this.passengerResource.set(this.editForm().value());
    console.log(this.passenger());
    console.log(this.editForm().value());
  }
}
