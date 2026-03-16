// @ts-check
/**
 * Page Object – Login Page
 * URL: /index.php?rt=account/login
 */
class LoginPage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;

    // Form fields
    this.loginNameInput = page.locator('#loginFrm_loginname');
    this.passwordInput  = page.locator('#loginFrm_password');
    this.loginButton    = page.locator("button[title='Login']");

    // New Customer panel uses a submit button with title="Continue"
    this.createAccountLink  = page.locator("button[title='Continue']").first();
    this.forgotPasswordLink = page.locator("a[href*='forgotten']");

    // Feedback elements
    this.pageHeading = page.locator('span.maintext');
    this.errorAlert  = page.locator('.alert-danger, .alert-error');
  }

  /** Navigate directly to the login page. */
  async navigate() {
    await this.page.goto('/index.php?rt=account/login');
  }

  /* Fill credentials and submit the login form.*/
  async login(loginName, password) {
    await this.loginNameInput.fill(loginName);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  /* Click the "Create Account" link to navigate to the register page. */
  async clickCreateAccount() {
    await this.createAccountLink.click();
  }
}

module.exports = { LoginPage };
