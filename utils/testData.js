// @ts-check
/**
 * Central test-data store for automationteststore.com
 * Sensitive credentials can be overridden via environment variables.
 */
const timestamp = Date.now();

const testData = {
  baseUrl: 'https://automationteststore.com',

  //  Existing account (pre-register once, then reuse)
  existingUser: {
    loginName: process.env.TEST_LOGIN_NAME || 'testlogin1',
    password:  process.env.TEST_PASSWORD   || 'testpassword1',
    email:     process.env.TEST_EMAIL      || 'testlogin1@test.com',
  },

  //  Brand-new account (unique per run)
  newUser: {
    firstName:       'Auto',
    lastName:        'Tester',
    email:           `auto${timestamp}@mailtest.com`,
    telephone:       '08123456789',
    address1:        'Test Address 123',
    city:            'Test City',
    postcode:        '90001',
    country:         '223',   // United States (option value)
    zone:            '3635',  // California (option value)
    loginName:       `auto_${timestamp}`,
    password:        'Test@1234',
    confirmPassword: 'Test@1234',
  },

  // Invalid credentials (should always fail)
  invalidUser: {
    loginName: 'invalid_user_xyz_999',
    password:  'WrongPassword123',
  },

  // Search keywords
  searchKeywords: {
    valid:        'lip',
    exactProduct: 'Absolute Eye Liner',
    noResult:     'zzznoresult999xyz',
  },

  //Known products (product_id values from the demo store)
  products: {
    eyeLiner: { id: 51, name: 'Absolute Eye Liner' },
    lipColor:  { id: 28, name: 'Flawless Moisturizing Lip Color' },
  },

  //  Guest checkout billing details
  guestCheckout: {
    firstName: 'Guest',
    lastName:  'User',
    email:     `guest${timestamp}@mailtest.com`,
    telephone: '08111222333',
    address1:  'Guest Street 456',
    city:      'Guest City',
    postcode:  '10001',
    country:   '223',   // United States
    zone:      '3635',  // California
  },
};

module.exports = { testData };

