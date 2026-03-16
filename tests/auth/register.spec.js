// @ts-check
/**
 * Feature 1 – Authentication: Register
 * Covers: page structure, empty form validation, successful registration,
 *         duplicate login name, mismatched passwords
 */
const { test, expect } = require('@playwright/test');
const { RegisterPage } = require('../../pages/RegisterPage');
const { testData }     = require('../../utils/testData');

test.describe('Feature 1 – Authentication: Register @regression', () => {
  let registerPage;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    await registerPage.navigate();
  });

  // ────────────────────────────────────────────────────────────────────────
  test('TC_AUTH_R01 – Register page renders all required fields @smoke', async ({ page }) => {
    await expect(registerPage.pageHeading).toHaveText('Create Account');
    await expect(registerPage.firstNameInput).toBeVisible();
    await expect(registerPage.lastNameInput).toBeVisible();
    await expect(registerPage.emailInput).toBeVisible();
    await expect(registerPage.loginNameInput).toBeVisible();
    await expect(registerPage.passwordInput).toBeVisible();
    await expect(registerPage.continueButton).toBeVisible();
  });

  test('TC_AUTH_R02 – Submitting empty form shows validation errors', async ({ page }) => {
    await registerPage.submitForm();
    await expect(registerPage.errorAlert).toBeVisible();
  });

  test('TC_AUTH_R03 – Register a new account successfully @smoke', async ({ page }) => {
    // Generate unique credentials for this run to prevent duplicate errors
    const uniqueUser = {
      ...testData.newUser,
      loginName: `auto_${Date.now()}`,
      email:     `auto_${Date.now()}@mailtest.com`,
    };
    await registerPage.fillRegistrationForm(uniqueUser);
    await registerPage.submitForm();
    await expect(registerPage.pageHeading).toHaveText('Your Account Has Been Created!');
  });

  test('TC_AUTH_R04 – Register with an existing login name shows error', async ({ page }) => {
    const duplicateUser = {
      ...testData.newUser,
      loginName: testData.existingUser.loginName, // known-existing login
    };
    await registerPage.fillRegistrationForm(duplicateUser);
    await registerPage.submitForm();
    await expect(registerPage.errorAlert).toBeVisible();
  });

  test('TC_AUTH_R05 – Register with mismatched passwords shows error', async ({ page }) => {
    const mismatchUser = {
      ...testData.newUser,
      loginName:       `auto_${Date.now()}`,
      email:           `auto_${Date.now()}@mailtest.com`,
      confirmPassword: 'DifferentPass@999',
    };
    await registerPage.fillRegistrationForm(mismatchUser);
    await registerPage.submitForm();
    await expect(registerPage.errorAlert).toBeVisible();
  });
});

