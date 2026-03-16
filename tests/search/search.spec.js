/**
 * Feature 2 - Product Search
 * Covers: valid search queries, no-result behavior, and header search interaction.
 */
const { test, expect } = require('../fixtures/reportingHooks');

test.describe('Feature 2 - Product Search @regression', () => {
  test('TC_SRCH_01 - Keyword "eye" returns product links @smoke', async ({ page }) => {
    await page.goto('/index.php?rt=product/search&keyword=eye');

    await expect(page).toHaveURL(/rt=product\/search/);
    await expect(page.locator("a[href*='rt=product/product']").first()).toBeVisible();
  });

  test('TC_SRCH_02 - Keyword "shampoo" returns product links', async ({ page }) => {
    await page.goto('/index.php?rt=product/search&keyword=shampoo');

    await expect(page).toHaveURL(/rt=product\/search/);
    await expect(page.locator("a[href*='rt=product/product']").first()).toBeVisible();
  });

  test('TC_SRCH_03 - Gibberish keyword shows no-results message', async ({ page }) => {
    await page.goto('/index.php?rt=product/search&keyword=zzznoresult999xyz');

    await expect(page.locator('body')).toContainText('There is no product that matches the search criteria.');
  });

  test('TC_SRCH_04 - Header search from home opens search page', async ({ page }) => {
    await page.goto('/');
    const headerInput = page.locator('#search_query_top, #filter_keyword').first();
    await headerInput.fill('cream');
    await headerInput.press('Enter');

    await expect(page).toHaveURL(/rt=product\/search/);
  });

  test('TC_SRCH_05 - Empty keyword keeps search page functional', async ({ page }) => {
    await page.goto('/index.php?rt=product/search&keyword=');
    await expect(page).toHaveURL(/rt=product\/search/);
    await expect(page.locator('body')).toBeVisible();
  });
});
