import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly sliderCarousel: Locator;

  constructor(page: Page) {
    super(page);
    // Home page unique container
    this.sliderCarousel = page.locator('#slider-carousel');
  }

  async verifyHomePageLoaded(): Promise<void> {
    await this.verifyVisible(this.sliderCarousel, 'Slider Carousel');
  }
}
