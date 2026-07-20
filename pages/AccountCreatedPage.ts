import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class AccountCreatedPage extends BasePage {
  readonly accountCreatedHeader: Locator;
  readonly accountDeletedHeader: Locator;
  readonly continueButton: Locator;

  constructor(page: Page) {
    super(page);
    this.accountCreatedHeader = page.locator('[data-qa="account-created"]');
    this.accountDeletedHeader = page.locator('[data-qa="account-deleted"]');
    this.continueButton = page.locator('[data-qa="continue-button"]');
  }

  async verifyAccountCreated(expectedHeader: string): Promise<void> {
    await this.verifyVisible(this.accountCreatedHeader, 'Account Created Header');
    await this.verifyContainsText(this.accountCreatedHeader, expectedHeader, 'Account Created message');
  }

  async verifyAccountDeleted(expectedHeader: string): Promise<void> {
    await this.verifyVisible(this.accountDeletedHeader, 'Account Deleted Header');
    await this.verifyContainsText(this.accountDeletedHeader, expectedHeader, 'Account Deleted message');
  }

  async clickContinue(): Promise<void> {
    await this.clickElement(this.continueButton, 'Continue button');
  }
}
