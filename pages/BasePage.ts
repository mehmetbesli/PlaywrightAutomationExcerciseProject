import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
  constructor(protected page: Page) {}

  /**
   * Navigates to a given URL
   */
  async navigateTo(path: string = '/'): Promise<void> {
    await this.page.goto(path);
  }

  /**
   * Clicks on an element after waiting for it to be visible and enabled
   */
  async clickElement(locator: Locator, elementName: string = 'Element'): Promise<void> {
    try {
      await locator.waitFor({ state: 'visible' });
      await locator.click();
    } catch (error) {
      throw new Error(`Failed to click on ${elementName}. Error: ${error.message}`);
    }
  }

  /**
   * Fills an input element with text after clearing it
   */
  async fillElement(locator: Locator, text: string, elementName: string = 'Input Field'): Promise<void> {
    try {
      await locator.waitFor({ state: 'visible' });
      await locator.fill(text);
    } catch (error) {
      throw new Error(`Failed to fill ${elementName} with text: "${text}". Error: ${error.message}`);
    }
  }

  /**
   * Selects an option from a dropdown by its value or label
   */
  async selectDropdownOption(locator: Locator, valueOrLabel: string, elementName: string = 'Dropdown'): Promise<void> {
    try {
      await locator.waitFor({ state: 'visible' });
      await locator.selectOption({ label: valueOrLabel });
    } catch (error) {
      try {
        await locator.selectOption({ value: valueOrLabel });
      } catch (innerError) {
        throw new Error(`Failed to select option "${valueOrLabel}" from ${elementName}. Error: ${innerError.message}`);
      }
    }
  }

  /**
   * Checks a checkbox or radio button if not checked
   */
  async checkElement(locator: Locator, elementName: string = 'Checkbox'): Promise<void> {
    try {
      await locator.waitFor({ state: 'visible' });
      const isChecked = await locator.isChecked();
      if (!isChecked) {
        await locator.check();
      }
    } catch (error) {
      throw new Error(`Failed to check ${elementName}. Error: ${error.message}`);
    }
  }

  /**
   * Verifies that an element is visible on the page
   */
  async verifyVisible(locator: Locator, elementName: string = 'Element'): Promise<void> {
    try {
      await expect(locator).toBeVisible();
    } catch (error) {
      throw new Error(`Assertion failed: ${elementName} is not visible. Error: ${error.message}`);
    }
  }

  /**
   * Verifies that an element contains a specific text
   */
  async verifyContainsText(locator: Locator, expectedText: string, elementName: string = 'Element'): Promise<void> {
    try {
      await expect(locator).toContainText(expectedText);
    } catch (error) {
      throw new Error(`Assertion failed: ${elementName} does not contain text "${expectedText}". Error: ${error.message}`);
    }
  }

  /**
   * Retrieves the inner text of a locator
   */
  async getElementText(locator: Locator): Promise<string> {
    await locator.waitFor({ state: 'visible' });
    return (await locator.innerText()).trim();
  }
}
