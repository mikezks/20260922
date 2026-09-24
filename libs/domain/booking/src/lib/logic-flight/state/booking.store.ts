import { patchState, signalStore, withComputed, withHooks, withMethods, withProps, withState } from '@ngrx/signals'
import { rxMethod } from '@ngrx/signals/rxjs-interop'
import { tapResponse } from '@ngrx/operators'
import { Flight } from '../model/flight';
import { FlightFilter } from '../model/flight-filter';
import { inject } from '@angular/core';
import { FlightService } from '../data-access/flight.service';
import { pipe, switchMap } from 'rxjs';

export interface BookingState {
  filter: FlightFilter;
  basket: Record<number, boolean>;
  flights: Flight[];
}

export const initialBookingState: BookingState = {
  filter: {
    from: 'Hamburg',
    to: 'Graz',
    urgent: false
  },
  basket: {
    3: true,
    5: true,
  },
  flights: []
}

const flightEntities = {
  entities: {
    3: {
      id: 3,
      from: 'Hamburg',
      to: 'Graz',
      delayed: false,
      date: new Date().toISOString()
    },
    5: {
      id: 3,
      from: 'Hamburg',
      to: 'Graz',
      delayed: false,
      date: new Date().toISOString()
    }
  } as Record<number, Flight>,
  ids: [5, 3] as number[]
};

const flightArray = [] as Flight[];

const flight5InsideObject = flightEntities.entities[5]
const flight5InsideArray = flightArray.find(flight => flight.id === 5)
const derivedFlightArray = flightEntities.ids.map(id => flightEntities.entities[id])

export const BookingStore = signalStore(
  // DI Config
  { providedIn: 'root' },
  // State Definition
  withState(initialBookingState),
  withComputed(store => ({
    delayed: () => store.flights().filter(flight => flight.delayed),
  })),
  withProps(() => ({
    flightService: inject(FlightService)
  })),
  // Updaters
  withMethods(store => ({
    setFilter: (filter: FlightFilter) => patchState(store, { filter }),
    setFlights: (flights: Flight[]) => patchState(store, { flights }),
    resetFlights: () => patchState(store, { flights: [] }),
  })),
  // Side-Effects
  withMethods(store => ({
    load: rxMethod<FlightFilter>(pipe(
      switchMap(filter => store.flightService.find(
        filter.from, filter.to, filter.urgent
      ).pipe(
        tapResponse({
          next: flights => store.setFlights(flights),
          error: err => console.error(err),
        })
      ))
    )),
  })),
  withHooks(store => ({
    onInit: () => store.load(store.filter)
  })),
);