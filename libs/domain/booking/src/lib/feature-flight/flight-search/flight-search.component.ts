import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Flight } from '@flight-demo/domain/booking-api-boarding';
import { FlightService } from '../../logic-flight/data-access/flight.service';
import { FlightFilter } from '../../logic-flight/model/flight-filter';
import { FlightCardComponent } from '../../ui-flight/flight-card/flight-card.component';
import { FlightFilterComponent } from '../../ui-flight/flight-filter/flight-filter.component';
import { BookingStore } from '../../logic-flight/state/booking.store';


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
  private flightService = inject(FlightService);
  private store = inject(BookingStore);
  private changeDetector = inject(ChangeDetectorRef);

  protected filter = this.store.filter;
  protected basket = this.store.basket;
  protected flights = this.store.flights

  protected search(filter: FlightFilter): void {
    this.store.setFilter(filter);
    this.store.load(filter);
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

    this.store.setFlights(this.flights().map(
      flight => flight.id === newFlight.id ? newFlight : flight
    ));
  }

  protected reset(): void {
    this.store.setFlights([]);
  }
}
