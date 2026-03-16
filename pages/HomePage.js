// @ts-check
/**
 * Page Object – Home Page
 * URL: https://automationteststore.com/
 */
class HomePage {
  constructor(page) {
    this.page = page;

    // Header navigation
    this.loginRegisterLink = page.locator("//a[normalize-space()='Login or register']");
    this.cartIcon          = page.locator('#cartButtonTop, .cart_block').first();

    // Top search bar (header)
    this.headerSearchInput  = page.locator('#search_query_top, #filter_keyword').first();
    this.headerSearchButton = page.locator("button[title='Search']").first();

    // Category navigation
    this.categoryMenu = page.locator('#categorymenu');
  }

  /** Navigate to the home page. */
  async navigate() {
    await this.page.goto('/');
  }

  /** Click the "Login or register" link in the header. */
  async clickLoginRegister() {
    await this.loginRegisterLink.click();
  }

  /** Click the cart icon in the header. */
  async searchProduct(keyword) {
    await this.headerSearchInput.fill(keyword);
    await this.headerSearchButton.click();
  }

  /** Click a top-level category link by name.*/
  async clickCategory(categoryName) {
    await this.categoryMenu.locator(`a:has-text("${categoryName}")`).first().click();
  }
}

module.exports = { HomePage };

