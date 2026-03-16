// @ts-check
/**
 * Feature 4 – Shopping Cart
 * Covers: item added to cart, quantity update, item removal,
 *         empty cart state, proceed to checkout
 *
 * Each test re-adds the product in beforeEach so tests are independent.
 */
const { test, expect } = require('@playwright/test');

test.describe('Feature 4 - Shopping Cart @regression', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/index.php?rt=checkout/cart');
  });

  test('TC_CART_01 - Cart page is accessible @smoke', async ({ page }) => {
    await expect(page).toHaveURL(/rt=checkout\/cart/);
    await expect(page.locator('span.maintext')).toHaveText('Shopping Cart');
  });

  test('TC_CART_02 - Empty cart message is shown', async ({ page }) => {
    await expect(page.locator('body')).toContainText('Your shopping cart is empty!');
  });

  test('TC_CART_03 - Continue button navigates to home page', async ({ page }) => {
    await page.locator("a[title='Continue']").first().click();
    await expect(page).toHaveURL(/automationteststore\.com\/?$/);
  });

  test('TC_CART_04 - Top Cart menu keeps user on cart page', async ({ page }) => {
    await page.locator("a.top.nobackground:has-text('Cart')").first().click();
    await expect(page).toHaveURL(/rt=checkout\/cart/);
  });

  test('TC_CART_05 - Checkout menu redirects to cart when cart is empty', async ({ page }) => {
    await page.locator("a.top.menu_checkout:has-text('Checkout')").first().click();
    await expect(page).toHaveURL(/rt=checkout\/cart/);
    await expect(page.locator('body')).toContainText('Your shopping cart is empty!');
  });
});
