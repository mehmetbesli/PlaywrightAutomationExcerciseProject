import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  readonly deliveryAddressContainer: Locator;
  readonly billingAddressContainer: Locator;
  readonly commentTextArea: Locator;
  readonly placeOrderBtn: Locator;

  constructor(page: Page) {
    super(page);
    // Explicit IDs for delivery and billing address containers
    this.deliveryAddressContainer = page.locator('#address_delivery');
    this.billingAddressContainer = page.locator('#address_invoice');
    this.commentTextArea = page.locator('textarea[name="message"]');
    this.placeOrderBtn = page.locator('a[href="/payment"]');
  }

  async verifyCheckoutPageLoaded(): Promise<void> {
    await this.verifyVisible(this.deliveryAddressContainer, 'Delivery Address section');
    await this.verifyVisible(this.billingAddressContainer, 'Billing Address section');
  }

  async verifyDeliveryAddressDetails(expectedDetails: {
    fullName: string;
    company: string;
    address1: string;
    address2: string;
    cityStateZip: string;
    country: string;
    phone: string;
  }): Promise<void> {
    const text = await this.getElementText(this.deliveryAddressContainer);
    if (!text.includes(expectedDetails.fullName)) {
      throw new Error(`Address validation error: Expected full name "${expectedDetails.fullName}" not found in delivery address.`);
    }
    if (!text.includes(expectedDetails.company)) {
      throw new Error(`Address validation error: Expected company "${expectedDetails.company}" not found in delivery address.`);
    }
    if (!text.includes(expectedDetails.address1)) {
      throw new Error(`Address validation error: Expected address line 1 "${expectedDetails.address1}" not found in delivery address.`);
    }
    if (!text.includes(expectedDetails.address2)) {
      throw new Error(`Address validation error: Expected address line 2 "${expectedDetails.address2}" not found in delivery address.`);
    }
    if (!text.includes(expectedDetails.cityStateZip)) {
      throw new Error(`Address validation error: Expected city/state/zip "${expectedDetails.cityStateZip}" not found in delivery address.`);
    }
    if (!text.includes(expectedDetails.country)) {
      throw new Error(`Address validation error: Expected country "${expectedDetails.country}" not found in delivery address.`);
    }
    if (!text.includes(expectedDetails.phone)) {
      throw new Error(`Address validation error: Expected phone number "${expectedDetails.phone}" not found in delivery address.`);
    }
  }

  async fillComment(comment: string): Promise<void> {
    await this.fillElement(this.commentTextArea, comment, 'Order Comments textarea');
  }

  async clickPlaceOrder(): Promise<void> {
    await this.clickElement(this.placeOrderBtn, 'Place Order button');
  }
}
