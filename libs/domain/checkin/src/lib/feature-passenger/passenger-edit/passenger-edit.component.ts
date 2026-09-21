import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { validatePassengerStatus } from '../../util-validation/passenger-validator/passenger-status.validator';


@Component({
  // eslint-disable-next-line @angular-eslint/prefer-on-push-component-change-detection -- preserves the workshop's pre-v22 behavior
  changeDetection: ChangeDetectionStrategy.Eager,
  selector: 'app-passenger-edit',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './passenger-edit.component.html'
})
export class PassengerEditComponent {
  protected editForm = inject(NonNullableFormBuilder).group({
    id: [0],
    firstName: [''],
    name: [''],
    bonusMiles: [0],
    passengerStatus: ['', [
      validatePassengerStatus(['A', 'B', 'C'])
    ]]
  });

  protected save(): void {
    console.log(this.editForm.value);
  }
}
