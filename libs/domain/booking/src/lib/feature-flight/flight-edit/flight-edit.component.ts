import { ChangeDetectionStrategy, Component, DestroyRef, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { routerFeature } from '@flight-demo/shared/state';
import { Store } from '@ngrx/store';
import { initialFlight } from '../../logic-flight/model/flight';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';


@Component({
  // eslint-disable-next-line @angular-eslint/prefer-on-push-component-change-detection -- preserves the workshop's pre-v22 behavior
  changeDetection: ChangeDetectionStrategy.Eager,
  selector: 'app-flight-edit',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './flight-edit.component.html'
})
export class FlightEditComponent implements OnInit, OnChanges {
  private store = inject(Store);
  private destroyRef = inject(DestroyRef);

  @Input() flight = initialFlight;

  protected editForm = inject(NonNullableFormBuilder).group({
    id: [0],
    from: [''],
    to: [''],
    date: [new Date().toISOString()],
    delayed: [false]
  });

  constructor() {
    this.store.select(routerFeature.selectRouteParams).pipe(
      takeUntilDestroyed()
    ).subscribe(
      params => console.log(params)
    );

    this.destroyRef.onDestroy(() => console.log('Bye, bye! :('));
  }

  ngOnInit(): void {
    this.store.select(routerFeature.selectRouteParams).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(
      params => console.log(params)
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['flight'].previousValue !== changes['flight'].currentValue) {
      this.editForm.patchValue(this.flight);
    }
  }

  protected save(): void {
    console.log(this.editForm.value);
  }
}
