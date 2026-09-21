import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormField, form } from '@angular/forms/signals';
import { AddressControl, addressSchema } from './address-control';
import { Address } from './address.model';

@Component({
  imports: [AddressControl, FormField],
  template: `<app-address-subform [formField]="addressForm" />`,
})
class AddressHost {
  readonly address = signal<Address>({
    street: 'Main Street',
    number: '1',
    zipCode: '1010',
    city: 'Vienna',
    country: 'Austria',
  });
  readonly addressForm = form(this.address, addressSchema);
}

describe('AddressControl as a shared address subform', () => {
  it('synchronizes child inputs with the parent address model', async () => {
    const fixture = TestBed.createComponent(AddressHost);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    const street = element.querySelector<HTMLInputElement>('#street')!;

    expect(street.value).toBe('Main Street');
    street.value = 'Workshop Street';
    street.dispatchEvent(new Event('input', { bubbles: true }));
    await fixture.whenStable();
    expect(fixture.componentInstance.address().street).toBe('Workshop Street');

    fixture.componentInstance.address.update(address => ({ ...address, city: 'Graz' }));
    await fixture.whenStable();
    expect(element.querySelector<HTMLInputElement>('#city')!.value).toBe('Graz');
  });

  it('uses the parent schema for validation inside the address control', async () => {
    const fixture = TestBed.createComponent(AddressHost);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    const street = element.querySelector<HTMLInputElement>('#street')!;

    street.value = '';
    street.dispatchEvent(new Event('input', { bubbles: true }));
    await fixture.whenStable();
    expect(fixture.componentInstance.addressForm.street().invalid()).toBe(true);
    expect(element.textContent).toContain('Please enter a street name.');

    street.value = 'Main Street';
    street.dispatchEvent(new Event('input', { bubbles: true }));
    await fixture.whenStable();
    expect(fixture.componentInstance.addressForm().valid()).toBe(true);
    expect(element.querySelector('.alert-danger')).toBeNull();
  });
});
