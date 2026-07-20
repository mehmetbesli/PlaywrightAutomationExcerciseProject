import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductsPage extends BasePage {
  // Search Elements
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly searchedProductsHeader: Locator;

  // Product List Elements
  readonly firstProductCard: Locator;
  readonly firstProductAddToCartBtn: Locator;

  // Add to Cart Modal Popup Elements
  readonly modalPopup: Locator;
  readonly modalTitle: Locator;
  readonly modalBody: Locator;
  readonly viewCartLink: Locator;

  constructor(page: Page) {
    super(page);
    // Prioritizing IDs where available
    this.searchInput = page.locator('#search_product');
    this.searchButton = page.locator('#submit_search');
    this.searchedProductsHeader = page.locator('.features_items h2.title');

    // First product card and its "Add to cart" button
    this.firstProductCard = page.locator('.features_items .col-sm-4').first();
    // Getting the first add-to-cart button inside the first product container (usually normal view)
    this.firstProductAddToCartBtn = this.firstProductCard.locator('.productinfo a.add-to-cart');

    // Modal elements
    this.modalPopup = page.locator('.modal-content');
    this.modalTitle = page.locator('.modal-content .modal-title');
    this.modalBody = page.locator('.modal-content .modal-body');
    this.viewCartLink = page.locator('.modal-content a[href="/view_cart"]');
  }

  async verifyProductsPageLoaded(): Promise<void> {
    await this.verifyVisible(this.searchInput, 'Product search input field');
  }

  async searchProduct(productName: string): Promise<void> {
    await this.fillElement(this.searchInput, productName, 'Search Product input');
    await this.clickElement(this.searchButton, 'Submit Search button');
  }

  async verifySearchResultsHeader(expectedHeader: string): Promise<void> {
    await this.verifyVisible(this.searchedProductsHeader, 'Searched Products header');
    await this.verifyContainsText(this.searchedProductsHeader, expectedHeader, 'Searched Products header text');
  }

  async addFirstProductToCart(): Promise<void> {
    await this.firstProductCard.scrollIntoViewIfNeeded();
    // Hovering over the card first to ensure visibility/activation
    await this.firstProductCard.hover();
    await this.clickElement(this.firstProductAddToCartBtn, 'First Product Add To Cart button');
  }

  async verifyAddedToCartModal(expectedTitle: string, expectedMessage: string): Promise<void> {
    await this.verifyVisible(this.modalPopup, 'Added to Cart modal popup');
    await this.verifyContainsText(this.modalTitle, expectedTitle, 'Modal title text');
    await this.verifyContainsText(this.modalBody, expectedMessage, 'Modal body text');
  }

  async clickViewCart(): Promise<void> {
    await this.clickElement(this.viewCartLink, 'View Cart link in modal');
  }
}
