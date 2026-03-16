// @ts-check
/**
 * Feature 1 – Authentication: Login
 * Covers: valid login, invalid credentials, empty form, navigation to register
 */
const { test, expect } = require('@playwright/test');
const { LoginPage }    = require('../../pages/LoginPage');
const { testData }     = require('../../utils/testData');

test.describe('Feature 1 – Authentication: Login @regression', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  // ────────────────────────────────────────────────────────────────────────
  test('TC_AUTH_L01 – Login page renders all required elements @smoke', async ({ page }) => {
    await expect(loginPage.pageHeading).toHaveText('Account Login');
    await expect(loginPage.loginNameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
    // createAccountLink tested separately in TC_AUTH_L05
  });

  test('TC_AUTH_L02 – Login with invalid credentials shows error', async ({ page }) => {
    await loginPage.login(testData.invalidUser.loginName, testData.invalidUser.password);
    await expect(loginPage.errorAlert).toBeVisible();
    await expect(loginPage.errorAlert).toContainText('Error');
  });

  test('TC_AUTH_L03 – Login with empty username and password shows error', async ({ page }) => {
    await loginPage.login('', '');
    await expect(loginPage.errorAlert).toBeVisible();
  });

  test('TC_AUTH_L04 – Login with valid username but wrong password shows error', async ({ page }) => {
    await loginPage.login(testData.existingUser.loginName, 'WrongPass@999');
    await expect(loginPage.errorAlert).toBeVisible();
  });

  test('TC_AUTH_L05 – Clicking "Create Account" navigates to Register page', async ({ page }) => {
    await loginPage.clickCreateAccount();
    await expect(page).toHaveURL(/account\/create/);
  });

  test('TC_AUTH_L06 – Login with valid credentials navigates to My Account @smoke', async ({ page }) => {
    // Requires a real account: copy .env.example → .env and set TEST_LOGIN_NAME / TEST_PASSWORD
    test.skip(
      !process.env.TEST_LOGIN_NAME || process.env.TEST_LOGIN_NAME === 'testlogin1',
      'Skipped: set TEST_LOGIN_NAME and TEST_PASSWORD in .env to enable this test'
    );
    await loginPage.login(testData.existingUser.loginName, testData.existingUser.password);
    await expect(page).toHaveURL(/account\/account/);
    await expect(loginPage.pageHeading).toHaveText('My Account');
  });
});
