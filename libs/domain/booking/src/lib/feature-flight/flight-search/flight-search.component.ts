import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Flight } from '../../logic-flight/model/flight';
import { FlightFilter } from '../../logic-flight/model/flight-filter';
import { injectTicketsFacade } from '../../logic-flight/state/facade';
import { FlightCardComponent } from '../../ui-flight/flight-card/flight-card.component';
import { FlightFilterComponent } from '../../ui-flight/flight-filter/flight-filter.component';
// import { ReactiveNode, SIGNAL } from '@angular/core/primitives/signals';


@Component({
  // eslint-disable-next-line @angular-eslint/prefer-on-push-component-change-detection -- preserves the workshop's pre-v22 behavior
  changeDetection: ChangeDetectionStrategy.Eager,
  selector: 'app-flight-search',
  imports: [
    CommonModule,
    FormsModule,
    FlightCardComponent,
    FlightFilterComponent
  ],
  templateUrl: './flight-search.component.html',
})
export class FlightSearchComponent {
  private ticketsFacade = injectTicketsFacade();
  private cdRef = inject(ChangeDetectorRef);

  protected filter = signal({
    from: 'Paris',
    to: 'New York',
    urgent: false
  });
  protected readonly route = computed(
    () => 'From ' + this.filter().from + ' to ' + this.filter().to + '.'
  );
  protected basket: Record<number, boolean> = {
    3: true,
    5: true
  };
  protected flights = this.ticketsFacade.flights;
  protected firstname = 'Peter';

  constructor() {
    console.log(this.firstname);
    setTimeout(() => {
      this.firstname = 'Mary';
      this.cdRef.markForCheck();
      console.log(this.firstname);
    }, 5_000);
    /* let activeConsumer: ReactiveNode | null = null;
    
    activeConsumer = effect(() => console.log(this.route()));
 */
    // Signal Update behavior
    /* console.log(this.filter().from);
    this.filter.update(curr => ({ ...curr, from: 'Porto' }));
    console.log(this.filter().from);
    this.filter.update(curr => ({ ...curr, from: 'Madrid' }));
    console.log(this.filter().from);
    this.filter.update(curr => ({ ...curr, from: 'Rome' }));
    console.log(this.filter().from);
    this.filter.update(curr => ({ ...curr, from: 'Athens' }));
    console.log(this.filter().from);
    this.filter.update(curr => ({ ...curr, from: 'Oslo' }));
    console.log(this.filter().from); */

    // Glitch-free behavior
    /* const counter = signal(0);
    const isEven = computed(() => counter() % 2 === 0);
    effect(() => console.log({
      counter: untracked(() => counter()),
      isEven: isEven()
    }));
    setInterval(() => counter.update(curr => curr+1), 2_000); */

    // console.log(this.route[SIGNAL]);
  }

  protected search(filter: FlightFilter): void {
    this.filter.set(filter);

    if (!this.filter().from || !this.filter().to) {
      return;
    }

    this.ticketsFacade.search(this.filter());
  }

  protected delay(flight: Flight): void {
    const oldFlight = flight;
    const oldDate = new Date(oldFlight.date);

    const newDate = new Date(oldDate.getTime() + 1000 * 60 * 5); // Add 5 min
    const newFlight = {
      ...oldFlight,
      date: newDate.toISOString(),
      delayed: true
    };

    this.ticketsFacade.update(newFlight);
  }

  protected reset(): void {
    this.ticketsFacade.reset();
  }
}
