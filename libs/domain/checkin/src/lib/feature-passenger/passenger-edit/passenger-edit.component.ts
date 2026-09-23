import { ChangeDetectionStrategy, Component, effect, inject, input, numberAttribute } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { signalOperators } from '@flight-demo/shared/core';
import { pipe, switchMap } from 'rxjs';
import { PassengerService } from '../../logic-passenger/data-access/passenger.service';
import { initialPassenger } from '../../logic-passenger/model/passenger';
import { validatePassengerStatus } from '../../util-validation/passenger-validator/passenger-status.validator';


@Component({
  // eslint-disable-next-line @angular-eslint/prefer-on-push-component-change-detection -- preserves the workshop's pre-v22 behavior
  changeDetection: ChangeDetectionStrategy.Eager,
  selector: 'app-passenger-edit',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './passenger-edit.component.html'
})
export class PassengerEditComponent {
  private readonly passengerService = inject(PassengerService);
  protected editForm = inject(NonNullableFormBuilder).group({
    id: [0],
    firstName: [''],
    name: [''],
    bonusMiles: [0],
    passengerStatus: ['', [
      validatePassengerStatus(['A', 'B', 'C'])
    ]]
  });

  readonly id = input(0, { transform: numberAttribute });
  private readonly passenger = signalOperators(this.id, pipe(
    switchMap(id => this.passengerService.findById(id))
  ), initialPassenger);
  
  constructor() {
    effect(() => this.editForm.patchValue(this.passenger()));
  }

  protected save(): void {
    console.log(this.editForm.value);
  }
}
