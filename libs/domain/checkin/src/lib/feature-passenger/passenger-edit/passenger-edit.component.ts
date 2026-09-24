import { httpResource } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, input, linkedSignal, numberAttribute } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { form, FormField, required, schema } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import { initialPassenger, Passenger } from '../../logic-passenger/model/passenger';

// (3) Field Logic: Validators, conditional disabled, hidden, readonly
export const passengerSchema = schema<Passenger>(passengerPath => {
  required(passengerPath.name, {
    message: 'The Lastname is mandatory - please enter one.'
  });
});

@Component({
  // eslint-disable-next-line @angular-eslint/prefer-on-push-component-change-detection -- preserves the workshop's pre-v22 behavior
  changeDetection: ChangeDetectionStrategy.Eager,
  selector: 'app-passenger-edit',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    // (4) UI Control: Template Binding
    FormField
  ],
  templateUrl: './passenger-edit.component.html'
})
export class PassengerEditComponent {
  readonly id = input(0, { transform: numberAttribute });
  protected readonly passengerResource = httpResource<Passenger>(() => ({
    url: 'https://demo.angulararchitects.io/api/passenger',
    params: { id: this.id() }
  }), { defaultValue: initialPassenger });
  // (1) Data Model: Writable Signal
  private passengerState = linkedSignal(() => this.passengerResource.hasValue()
    ? this.passengerResource.value()
    : initialPassenger
  , { set: passenger => this.passengerResource.set(passenger) });
  // (2): Field State: valid, touched, dirty, value, ...
  protected readonly editForm = form(
    this.passengerState,
    passengerSchema
  );
  
  protected save(): void {
    console.log(this.editForm().value());
    console.log(this.passengerResource.value());
  }
}
