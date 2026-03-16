// @ts-check
/**
 * Page Object – Checkout Page (multi-step)
 * URL: /index.php?rt=checkout/checkout
 */
class CheckoutPage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;

    // Step 1: Guest / Account choice
    this.guestRadio       = page.locator('input[value="guest"]');
    this.continueButtons  = page.locator("button[title='Continue']");

    // Step 2: Billing address (guest form)
    this.firstNameInput = page.locator('#guestFrm_firstname');
    this.lastNameInput  = page.locator('#guestFrm_lastname');
    this.emailInput     = page.locator('#guestFrm_email');
    this.telephoneInput = page.locator('#guestFrm_telephone');
    this.address1Input  = page.locator('#guestFrm_address_1');
    this.cityInput      = page.locator('#guestFrm_city');
    this.postcodeInput  = page.locator('#guestFrm_postcode');
    this.countrySelect  = page.locator('#guestFrm_country_id');
    this.zoneSelect     = page.locator('#guestFrm_zone_id');

    // Step 3: Shipping method
    this.shippingRadios = page.locator('input[name="shipping_method"]');

    // Step 4: Confirm order
    this.agreeCheckbox    = page.locator('#PaymentFrm_agree');
    this.confirmOrderBtn  = page.locator("button[title='Confirm Order']");

    // Feedback
    this.pageHeading = page.locator('span.maintext');
    this.errorAlert  = page.locator('.alert-danger, .alert-error');
  }

  /** Navigate directly to the checkout page. */
  async navigate() {
    await this.page.goto('/index.php?rt=checkout/checkout');
  }

  /** Select "Guest Checkout" and advance to billing. */
  async selectGuestCheckout() {
    await this.guestRadio.check();
    await this.continueButtons.first().click();
    await this.page.waitForLoadState('networkidle');
  }

  async fillBillingDetails(billingData) {
    await this.firstNameInput.fill(billingData.firstName);
    await this.lastNameInput.fill(billingData.lastName);
    await this.emailInput.fill(billingData.email);
    await this.telephoneInput.fill(billingData.telephone);
    await this.address1Input.fill(billingData.address1);
    await this.cityInput.fill(billingData.city);
    await this.postcodeInput.fill(billingData.postcode);
    await this.countrySelect.selectOption(billingData.country);
    await this.page.waitForTimeout(800); // wait for zone dropdown
    await this.zoneSelect.selectOption(billingData.zone);
    await this.continueButtons.last().click();
    await this.page.waitForLoadState('networkidle');
  }

  /** Select the first available shipping method and continue. */
  async selectShippingMethod() {
    await this.shippingRadios.first().check();
    await this.continueButtons.last().click();
    await this.page.waitForLoadState('networkidle');
  }

  /** Accept T&C and place the order. */
  async confirmOrder() {
    await this.agreeCheckbox.check();
    await this.confirmOrderBtn.click();
    await this.page.waitForLoadState('networkidle');
  }
}

module.exports = { CheckoutPage };

