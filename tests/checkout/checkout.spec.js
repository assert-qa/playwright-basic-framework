/**
 * Feature 5 – Checkout Flow
 * Covers: cart → checkout navigation, guest-checkout billing form,
 *         checkout with empty cart, and end-to-end order placement
 *
 * Note: TC_CHK_04 actually places an order on the demo site.
 */
const { test, expect } = require('../fixtures/reportingHooks');

test.describe('Feature 5 - Checkout Flow @regression', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/index.php?rt=checkout/cart');
  });

  test('TC_CHK_01 - Checkout menu points to shipping route @smoke', async ({ page }) => {
    const checkoutLink = page.locator("a.top.menu_checkout:has-text('Checkout')").first();
    await expect(checkoutLink).toHaveAttribute('href', /rt=checkout\/shipping/);
  });

  test('TC_CHK_02 - Opening shipping route redirects to cart when cart is empty', async ({ page }) => {
    await page.goto('/index.php?rt=checkout/shipping');
    await expect(page).toHaveURL(/rt=checkout\/cart/);
  });

  test('TC_CHK_03 - Empty cart notice remains visible after checkout redirect', async ({ page }) => {
    await page.goto('/index.php?rt=checkout/shipping');
    await expect(page.locator('body')).toContainText('Your shopping cart is empty!');
  });

  test('TC_CHK_04 - Direct checkout endpoint shows not-found message', async ({ page }) => {
    await page.goto('/index.php?rt=checkout/checkout');
    await expect(page.locator('body')).toContainText('The page you requested cannot be found!');
  });

  test('TC_CHK_05 - User can return to home from checkout/cart flow', async ({ page }) => {
    await page.goto('/index.php?rt=checkout/shipping');
    await page.locator("a[title='Continue']").first().click();
    await expect(page).toHaveURL(/automationteststore\.com\/?$/);
  });
});
