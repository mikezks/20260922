import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { FlightSearchComponent } from './flight-search.component';

describe('FlightSearchComponent without Zone.js', () => {
  it('renders a later HTTP response without another user interaction', async () => {
    TestBed.configureTestingModule({
      imports: [FlightSearchComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    });
    const fixture = TestBed.createComponent(FlightSearchComponent);
    const http = TestBed.inject(HttpTestingController);
    await fixture.whenStable();

    const element = fixture.nativeElement as HTMLElement;
    element.querySelector<HTMLButtonElement>('app-flight-filter button')!.click();
    const request = http.expectOne(req => req.url.endsWith('/flight'));
    // Finish change detection triggered by the click before delivering the response.
    await fixture.whenStable();
    expect(element.querySelectorAll('app-flight-card').length).toBe(0);

    request.flush([
      { id: 101, from: 'Paris', to: 'New York', date: '2026-09-21T10:00:00Z', delayed: false },
    ]);
    await fixture.whenStable();

    expect(element.querySelectorAll('app-flight-card').length).toBe(1);
    expect(element.querySelector('app-flight-card')?.textContent).toContain('Paris - New York');
    http.verify();
  });
});
