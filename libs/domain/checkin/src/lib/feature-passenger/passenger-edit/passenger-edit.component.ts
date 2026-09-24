import { httpResource } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, effect, input, linkedSignal, numberAttribute, signal } from '@angular/core';
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
  readonly id = input(0, { transform: numberAttribute });
  protected readonly passengerResource = httpResource<Passenger>(() => ({
    url: 'https://demo.angulararchitects.io/api/passenger',
    params: { id: this.id() }
  }), { defaultValue: initialPassenger });
  private passengerState = linkedSignal(() => this.passengerResource.hasValue()
    ? this.passengerResource.value()
    : initialPassenger
  , { set: passenger => this.passengerResource.set(passenger) });
  protected readonly editForm = form(this.passengerState);

  
  protected save(): void {
    console.log(this.editForm().value());
    console.log(this.passengerResource.value());
  }
}
