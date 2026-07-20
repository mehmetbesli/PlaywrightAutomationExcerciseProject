import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class SignupLoginPage extends BasePage {
  // New User Signup form fields
  readonly newUserSignupHeader: Locator;
  readonly signupNameInput: Locator;
  readonly signupEmailInput: Locator;
  readonly signupButton: Locator;

  // Login form fields
  readonly loginHeader: Locator;
  readonly loginEmailInput: Locator;
  readonly loginPasswordInput: Locator;
  readonly loginButton: Locator;
  readonly loginErrorMessage: Locator;

  constructor(page: Page) {
    super(page);
    // Elements are located using CSS/QA attributes since they lack unique IDs
    this.newUserSignupHeader = page.locator('.signup-form h2');
    this.signupNameInput = page.locator('[data-qa="signup-name"]');
    this.signupEmailInput = page.locator('[data-qa="signup-email"]');
    this.signupButton = page.locator('[data-qa="signup-button"]');

    this.loginHeader = page.locator('.login-form h2');
    this.loginEmailInput = page.locator('[data-qa="login-email"]');
    this.loginPasswordInput = page.locator('[data-qa="login-password"]');
    this.loginButton = page.locator('[data-qa="login-button"]');
    this.loginErrorMessage = page.locator('.login-form p');
  }

  async verifySignupHeader(expectedText: string): Promise<void> {
    await this.verifyVisible(this.newUserSignupHeader, 'New User Signup header');
    await this.verifyContainsText(this.newUserSignupHeader, expectedText, 'New User Signup text');
  }

  async verifyLoginHeader(expectedText: string): Promise<void> {
    await this.verifyVisible(this.loginHeader, 'Login to your account header');
    await this.verifyContainsText(this.loginHeader, expectedText, 'Login header text');
  }

  async signup(name: string, email: string): Promise<void> {
    await this.fillElement(this.signupNameInput, name, 'Signup Name input');
    await this.fillElement(this.signupEmailInput, email, 'Signup Email input');
    await this.clickElement(this.signupButton, 'Signup button');
  }

  async login(email: string, password: string): Promise<void> {
    await this.fillElement(this.loginEmailInput, email, 'Login Email input');
    await this.fillElement(this.loginPasswordInput, password, 'Login Password input');
    await this.clickElement(this.loginButton, 'Login button');
  }

  async verifyLoginErrorMessage(expectedMessage: string): Promise<void> {
    await this.verifyVisible(this.loginErrorMessage, 'Login Error message');
    await this.verifyContainsText(this.loginErrorMessage, expectedMessage, 'Login Error message text');
  }
}
