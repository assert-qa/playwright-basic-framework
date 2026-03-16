/**
 * Feature 3 – Product Details
 * Covers: page structure, price visibility, image display,
 *         successful add-to-cart, breadcrumb navigation
 */
const { test, expect } = require('../fixtures/reportingHooks');
const { ProductPage }  = require('../../pages/ProductPage');
const { testData }     = require('../../utils/testData');

test.describe('Feature 3 – Product Details @regression', () => {
  /** @type {ProductPage} */
  let productPage;

  test.beforeEach(async ({ page }) => {
    productPage = new ProductPage(page);
    // Navigate to the known "Absolute Eye Liner" product
    await productPage.navigate(testData.products.eyeLiner.id);
  });

  test('TC_PROD_01 – Product name is visible on the detail page @smoke', async ({ page }) => {
    await expect(productPage.productName).toBeVisible();
    const name = await productPage.getProductName();
    expect(name.length).toBeGreaterThan(0);
  });

  test('TC_PROD_02 – Product page contains visible price text', async ({ page }) => {
    await expect(page.locator('.price, .oneprice, .productfilneprice').first()).toBeVisible();
    const priceText = await page.locator('.price, .oneprice, .productfilneprice').first().innerText();
    expect(priceText).toMatch(/\$/);
  });

  test('TC_PROD_03 – Product image is displayed', async ({ page }) => {
    await expect(productPage.productImage).toBeVisible();
  });

  test('TC_PROD_04 – Quantity input is available and editable', async ({ page }) => {
    await expect(productPage.quantityInput).toBeVisible();
    await productPage.setQuantity(2);
    await expect(productPage.quantityInput).toHaveValue('2');
  });

  test('TC_PROD_05 – Breadcrumb navigation is rendered', async ({ page }) => {
    await expect(productPage.breadcrumb).toBeVisible();
    await expect(productPage.breadcrumb.locator('a').first()).toHaveText('Home');
  });

  test('TC_PROD_06 – Opening another product ID still shows product details', async ({ page }) => {
    await productPage.navigate(52);
    await expect(productPage.productName).toBeVisible();
    await expect(page.locator('.price, .oneprice, .productfilneprice').first()).toBeVisible();
  });
});
