import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HeaderPage extends BasePage {
  // Selectors prioritized by id, then class/tag/text
  readonly homeLink: Locator;
  readonly productsLink: Locator;
  readonly cartLink: Locator;
  readonly loginSignupLink: Locator;
  readonly logoutLink: Locator;
  readonly deleteAccountLink: Locator;
  readonly loggedInAsText: Locator;

  constructor(page: Page) {
    super(page);
    // There are no IDs on navigation bar list items directly, using semantic selectors
    this.homeLink = page.locator('header a[href="/"]');
    this.productsLink = page.locator('header a[href="/products"]');
    this.cartLink = page.locator('header a[href="/view_cart"]');
    this.loginSignupLink = page.locator('header a[href="/login"]');
    this.logoutLink = page.locator('header a[href="/logout"]');
    this.deleteAccountLink = page.locator('header a[href="/delete_account"]');
    this.loggedInAsText = page.locator('header li:has-text("Logged in as")');
  }

  async clickHome(): Promise<void> {
    await this.clickElement(this.homeLink, 'Home navigation link');
  }

  async clickProducts(): Promise<void> {
    await this.clickElement(this.productsLink, 'Products navigation link');
  }

  async clickCart(): Promise<void> {
    await this.clickElement(this.cartLink, 'Cart navigation link');
  }

  async clickLoginSignup(): Promise<void> {
    await this.clickElement(this.loginSignupLink, 'Signup/Login navigation link');
  }

  async clickLogout(): Promise<void> {
    await this.clickElement(this.logoutLink, 'Logout navigation link');
  }

  async clickDeleteAccount(): Promise<void> {
    await this.clickElement(this.deleteAccountLink, 'Delete Account navigation link');
  }

  async verifyLoggedInAs(username: string): Promise<void> {
    await this.verifyVisible(this.loggedInAsText, 'Logged in as text');
    await this.verifyContainsText(this.loggedInAsText, username, 'Logged in as username text');
  }
}
