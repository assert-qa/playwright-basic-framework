// @ts-check
/**
 * Page Object – Product Detail Page
 * URL: /index.php?rt=product/product&product_id=<id>
 */
class ProductPage {
  constructor(page) {
    this.page = page;

    // Product information
    this.productName  = page.locator('h1, .bgnone h1, .prdocutname h1, h1.productname').first();
    this.productPrice = page.locator('.price, .oneprice, .productfilneprice, .product_price').first();
    this.productImage = page.locator('.mainimage img, .product-main-image img, .product-image img, .thumbnails img').first();

    // Add-to-cart controls
    this.quantityInput  = page.locator('#product_quantity');
    this.addToCartBtn   = page.locator("button[title='Add to Cart']");

    // Navigation
    this.breadcrumb = page.locator('.breadcrumb');

    // Tabs
    this.descriptionTab = page.locator('#tab-description');
    this.reviewTab      = page.locator('#tab-review');

    // Feedback
    this.successAlert = page.locator('.alert-success');
    this.errorAlert   = page.locator('.alert-danger, .alert-error');
  }

  /*Navigate directly to a product by ID*/
  async navigate(productId) {
    await this.page.goto(`/index.php?rt=product/product&product_id=${productId}`);
  }

    /** Set the quantity input to the specified value. */
  async setQuantity(quantity) {
    await this.quantityInput.clear();
    await this.quantityInput.fill(String(quantity));
  }

  /** Click the "Add to Cart" button and wait for the success confirmation. */
  async addToCart() {
    await this.addToCartBtn.click();
    // Wait for either a success alert (AJAX) or a full page reload
    await Promise.race([
      this.successAlert.waitFor({ state: 'visible', timeout: 15000 }),
      this.page.waitForLoadState('domcontentloaded'),
    ]).catch(() => { /* ignore if neither triggers within timeout */ });
  }

  /** Return the product title text. */
  async getProductName() {
    return (await this.productName.textContent() ?? '').trim();
  }

  /** Return the displayed price text. */
  async getProductPrice() {
    return (await this.productPrice.textContent() ?? '').trim();
  }
}

module.exports = { ProductPage };
