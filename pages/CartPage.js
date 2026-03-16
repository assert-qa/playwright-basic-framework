// @ts-check
/**
 * Page Object – Shopping Cart Page
 * URL: /index.php?rt=checkout/cart
 */
class CartPage {

  constructor(page) {
    this.page = page;

    // Cart rows – automationteststore uses <tr class="product-list"> rows
    this.productRows   = page.locator('tr.product-list');
    this.productNames  = page.locator('tr.product-list td.align_left a, tr.product-list td:nth-child(2) a');
    this.qtyInputs     = page.locator('input[name^="cart_quantity"]');
    this.updateButtons = page.locator("button[title='Update']");
    this.removeButtons = page.locator('tr.product-list a.btn-danger, tr.product-list .remove_button');

    // Totals
    this.cartTotal = page.locator('.total-price, .total').last();

    // Empty-cart state
    this.emptyCartMessage = page.locator('text=Your shopping cart is empty!');

    // Proceed to checkout
    this.checkoutButton = page.locator('#checkout_btn, a[href*="checkout/checkout"], a.btn-primary').first();
  }

  /** Navigate directly to the cart page. */
  async navigate() {
    await this.page.goto('/index.php?rt=checkout/cart');
  }

  async updateQuantity(rowIndex, quantity) {
    const input = this.qtyInputs.nth(rowIndex);
    await input.click({ clickCount: 3 }); // select-all so fill replaces content cleanly
    await input.fill(String(quantity));
    await this.updateButtons.nth(rowIndex).click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async removeItem(rowIndex) {
    await this.removeButtons.nth(rowIndex).click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  /** Return how many product rows are in the cart. */
  async getProductCount() {
    return await this.productNames.count();
  }

  /** Whether the "cart is empty" message is visible. */
  async isEmpty() {
    return await this.emptyCartMessage.isVisible();
  }

  /** Click the "Proceed to Checkout" button. */
  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
}

module.exports = { CartPage };


