import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class PaymentPage extends BasePage {
  // Input fields
  readonly nameOnCardInput: Locator;
  readonly cardNumberInput: Locator;
  readonly cvcInput: Locator;
  readonly expiryMonthInput: Locator;
  readonly expiryYearInput: Locator;

  // Pay Button - Prioritizing its ID
  readonly payAndConfirmBtn: Locator;

  // Success screen elements
  readonly orderPlacedHeader: Locator;
  readonly successMsgText: Locator;
  readonly continueBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.nameOnCardInput = page.locator('[data-qa="name-on-card"]');
    this.cardNumberInput = page.locator('[data-qa="card-number"]');
    this.cvcInput = page.locator('[data-qa="cvc"]');
    this.expiryMonthInput = page.locator('[data-qa="expiry-month"]');
    this.expiryYearInput = page.locator('[data-qa="expiry-year"]');

    // Using ID locator for submit button
    this.payAndConfirmBtn = page.locator('#submit');

    // Order placed selectors
    this.orderPlacedHeader = page.locator('[data-qa="order-placed"]');
    this.successMsgText = page.locator('[data-qa="order-placed"] + p'); // Following paragraph contains success text
    this.continueBtn = page.locator('[data-qa="continue-button"]');
  }

  async verifyPaymentPageLoaded(): Promise<void> {
    await this.verifyVisible(this.nameOnCardInput, 'Name on Card input');
  }

  async payAndConfirm(details: {
    nameOnCard: string;
    cardNumber: string;
    cvc: string;
    expiryMonth: string;
    expiryYear: string;
  }): Promise<void> {
    await this.fillElement(this.nameOnCardInput, details.nameOnCard, 'Name on Card');
    await this.fillElement(this.cardNumberInput, details.cardNumber, 'Card Number');
    await this.fillElement(this.cvcInput, details.cvc, 'CVC');
    await this.fillElement(this.expiryMonthInput, details.expiryMonth, 'Expiration Month');
    await this.fillElement(this.expiryYearInput, details.expiryYear, 'Expiration Year');
    await this.clickElement(this.payAndConfirmBtn, 'Pay and Confirm Order button');
  }

  async verifyOrderPlaced(expectedHeader: string): Promise<void> {
    await this.verifyVisible(this.orderPlacedHeader, 'Order Placed header');
    await this.verifyContainsText(this.orderPlacedHeader, expectedHeader, 'Order Placed header text');
  }

  async clickContinue(): Promise<void> {
    await this.clickElement(this.continueBtn, 'Continue button after order confirmation');
  }
}
