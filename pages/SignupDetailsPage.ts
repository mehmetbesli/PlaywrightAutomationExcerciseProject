import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class SignupDetailsPage extends BasePage {
  // Title / Gender radio buttons
  readonly genderMrRadio: Locator;
  readonly genderMrsRadio: Locator;

  // Personal Info
  readonly passwordInput: Locator;
  readonly daysSelect: Locator;
  readonly monthsSelect: Locator;
  readonly yearsSelect: Locator;
  readonly newsletterCheckbox: Locator;
  readonly optinCheckbox: Locator;

  // Address Info
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly companyInput: Locator;
  readonly address1Input: Locator;
  readonly address2Input: Locator;
  readonly countrySelect: Locator;
  readonly stateInput: Locator;
  readonly cityInput: Locator;
  readonly zipcodeInput: Locator;
  readonly mobileNumberInput: Locator;

  // Create Account Button
  readonly createAccountBtn: Locator;

  // Page Header
  readonly pageHeader: Locator;

  constructor(page: Page) {
    super(page);
    // Explicit IDs from automationexercise.com DOM
    this.genderMrRadio = page.locator('#id_gender1');
    this.genderMrsRadio = page.locator('#id_gender2');
    this.passwordInput = page.locator('#password');
    this.daysSelect = page.locator('#days');
    this.monthsSelect = page.locator('#months');
    this.yearsSelect = page.locator('#years');
    this.newsletterCheckbox = page.locator('#newsletter');
    this.optinCheckbox = page.locator('#optin');

    this.firstNameInput = page.locator('#first_name');
    this.lastNameInput = page.locator('#last_name');
    this.companyInput = page.locator('#company');
    this.address1Input = page.locator('#address1');
    this.address2Input = page.locator('#address2');
    this.countrySelect = page.locator('#country');
    this.stateInput = page.locator('#state');
    this.cityInput = page.locator('#city');
    this.zipcodeInput = page.locator('#zipcode');
    this.mobileNumberInput = page.locator('#mobile_number');

    this.createAccountBtn = page.locator('[data-qa="create-account"]');
    this.pageHeader = page.locator('.login-form h2.title').first(); // Enter Account Information header
  }

  async verifyDetailsPageLoaded(): Promise<void> {
    await this.verifyVisible(this.pageHeader, 'Account Information header');
  }

  async fillAccountInformation(details: {
    title: string;
    password: string;
    day: string;
    month: string;
    year: string;
    newsletter: boolean;
    optin: boolean;
  }): Promise<void> {
    if (details.title.toLowerCase() === 'mr') {
      await this.checkElement(this.genderMrRadio, 'Gender Mr. Radio Button');
    } else {
      await this.checkElement(this.genderMrsRadio, 'Gender Mrs. Radio Button');
    }
    await this.fillElement(this.passwordInput, details.password, 'Password Input');
    await this.selectDropdownOption(this.daysSelect, details.day, 'Day dropdown');
    await this.selectDropdownOption(this.monthsSelect, details.month, 'Month dropdown');
    await this.selectDropdownOption(this.yearsSelect, details.year, 'Year dropdown');

    if (details.newsletter) {
      await this.checkElement(this.newsletterCheckbox, 'Newsletter checkbox');
    }
    if (details.optin) {
      await this.checkElement(this.optinCheckbox, 'Optin checkbox');
    }
  }

  async fillAddressInformation(address: {
    firstName: string;
    lastName: string;
    company: string;
    address1: string;
    address2: string;
    country: string;
    state: string;
    city: string;
    zipcode: string;
    mobileNumber: string;
  }): Promise<void> {
    await this.fillElement(this.firstNameInput, address.firstName, 'First Name Input');
    await this.fillElement(this.lastNameInput, address.lastName, 'Last Name Input');
    await this.fillElement(this.companyInput, address.company, 'Company Input');
    await this.fillElement(this.address1Input, address.address1, 'Address 1 Input');
    await this.fillElement(this.address2Input, address.address2, 'Address 2 Input');
    await this.selectDropdownOption(this.countrySelect, address.country, 'Country dropdown');
    await this.fillElement(this.stateInput, address.state, 'State Input');
    await this.fillElement(this.cityInput, address.city, 'City Input');
    await this.fillElement(this.zipcodeInput, address.zipcode, 'Zipcode Input');
    await this.fillElement(this.mobileNumberInput, address.mobileNumber, 'Mobile Number Input');
  }

  async clickCreateAccount(): Promise<void> {
    await this.clickElement(this.createAccountBtn, 'Create Account button');
  }
}
