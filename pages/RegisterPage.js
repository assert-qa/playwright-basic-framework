// @ts-check
/**
 * Page Object – Register Page
 * URL: /index.php?rt=account/create
 */
class RegisterPage {
  constructor(page) {
    this.page = page;

    // Personal details
    this.firstNameInput = page.locator('#AccountFrm_firstname');
    this.lastNameInput  = page.locator('#AccountFrm_lastname');
    this.emailInput     = page.locator('#AccountFrm_email');
    this.telephoneInput = page.locator('#AccountFrm_telephone');

    // Address
    this.address1Input = page.locator('#AccountFrm_address_1');
    this.cityInput     = page.locator('#AccountFrm_city');
    this.postcodeInput = page.locator('#AccountFrm_postcode');
    this.countrySelect = page.locator('#AccountFrm_country_id');
    this.zoneSelect    = page.locator('#AccountFrm_zone_id');

    // Login credentials
    this.loginNameInput = page.locator('#AccountFrm_loginname');
    this.passwordInput  = page.locator('#AccountFrm_password');
    this.confirmInput   = page.locator('#AccountFrm_confirm');

    // Policy & submit
    this.agreeCheckbox  = page.locator('#AccountFrm_agree');
    this.continueButton = page.locator("button[title='Continue']");

    // Feedback
    this.pageHeading = page.locator('span.maintext');
    this.errorAlert  = page.locator('.alert-danger, .alert-error');
  }

  /** Navigate directly to the register page. */
  async navigate() {
    await this.page.goto('/index.php?rt=account/create');
  }

  async fillRegistrationForm(userData) {
    await this.firstNameInput.fill(userData.firstName);
    await this.lastNameInput.fill(userData.lastName);
    await this.emailInput.fill(userData.email);
    await this.telephoneInput.fill(userData.telephone);

    await this.address1Input.fill(userData.address1);
    await this.cityInput.fill(userData.city);
    await this.postcodeInput.fill(userData.postcode);
    await this.countrySelect.selectOption(userData.country);
    // Wait for state/zone dropdown to populate after country change
    await this.page.waitForTimeout(800);
    await this.zoneSelect.selectOption(userData.zone);

    await this.loginNameInput.fill(userData.loginName);
    await this.passwordInput.fill(userData.password);
    await this.confirmInput.fill(userData.confirmPassword);

    await this.agreeCheckbox.check();
  }

  /** Click the Continue / Submit button. */
  async submitForm() {
    await this.continueButton.click();
  }
}

module.exports = { RegisterPage };

