// @ts-check
/**
 * Page Object – Search / Search Results Page
 * URL: /index.php?rt=product/search
 */
class SearchPage {
  constructor(page) {
    this.page = page;

    // Search form
    this.keywordInput  = page.locator('#filter_keyword');
    this.searchButton  = page.locator("button[title='Search']").first();

    // Results (site uses direct product links under product/product route)
    this.productListing = page.locator('.contentpanel');
    this.productNames   = page.locator("a[href*='rt=product/product']");
    this.noDataMessage  = page.locator('text=There is no product that matches the search criteria.');
  }

  /* Navigate directly to the search page. */
  async navigate() {
    await this.page.goto('/index.php?rt=product/search');
  }

  /*Type a keyword and submit the search.*/
  async searchFor(keyword) {
    await this.keywordInput.fill(keyword);
    await this.searchButton.click();
  }

  /* Return the number of products in the results grid. */
  async getProductCount() {
    return await this.productNames.count();
  }

  /* Return the visible text of the first result item. */
  async getFirstProductName() {
    return await this.productNames.first().textContent();
  }

  /* Whether the "no results" message is visible. */
  async isNoResultsMessageVisible() {
    return await this.noDataMessage.isVisible();
  }
}

module.exports = { SearchPage };
