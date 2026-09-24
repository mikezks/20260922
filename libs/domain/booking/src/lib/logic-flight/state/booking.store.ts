import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals'
import { rxMethod } from '@ngrx/signals/rxjs-interop'
import { tapResponse } from '@ngrx/operators'
import { Flight } from '../model/flight';
import { FlightFilter } from '../model/flight-filter';
import { inject } from '@angular/core';
import { FlightService } from '../data-access/flight.service';
import { pipe, switchMap } from 'rxjs';

export const BookingStore = signalStore(
  // DI Config
  { providedIn: 'root' },
  // State Definition
  withState({
    filter: {
      from: 'Hamburg',
      to: 'Graz',
      urgent: false
    },
    basket: {
      3: true,
      5: true,
    } as Record<number, boolean>,
    flights: [] as Flight[],
  }),
  withComputed(store => ({
    delayed: () => store.flights().filter(flight => flight.delayed),
  })),
  // Updaters
  withMethods(store => ({
    setFilter: (filter: FlightFilter) => patchState(store, { filter }),
    setFlights: (flights: Flight[]) => patchState(store, { flights }),
  })),
  // Side-Effects
  withMethods((
    store,
    flightService = inject(FlightService)
  ) => ({
    load: rxMethod<FlightFilter>(pipe(
      switchMap(filter => flightService.find(
        filter.from, filter.to, filter.urgent
      ).pipe(
        tapResponse({
          next: flights => store.setFlights(flights),
          error: err => console.error(err),
        })
      ))
    )),
  })),
);