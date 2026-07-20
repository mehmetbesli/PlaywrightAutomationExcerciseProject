import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  readonly cartTable: Locator;
  readonly cartItems: Locator;
  readonly proceedToCheckoutBtn: Locator;

  constructor(page: Page) {
    super(page);
    // Explicit ID for cart info block
    this.cartTable = page.locator('#cart_info');
    this.cartItems = page.locator('tr[id^="product-"]');
    this.proceedToCheckoutBtn = page.locator('.check_out');
  }

  async verifyCartPageLoaded(): Promise<void> {
    await this.verifyVisible(this.cartTable, 'Cart Items Table');
  }

  async verifyCartItemsCount(expectedCount: number): Promise<void> {
    const count = await this.cartItems.count();
    if (count !== expectedCount) {
      throw new Error(`Cart item validation failed: Expected ${expectedCount} item(s) in cart, but found ${count}.`);
    }
  }

  async clickProceedToCheckout(): Promise<void> {
    await this.clickElement(this.proceedToCheckoutBtn, 'Proceed to Checkout button');
  }
}
