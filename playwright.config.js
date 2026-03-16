// @ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  // Keep Playwright artifacts under reports/ to avoid root-level test-results folder.
  outputDir: 'reports/test-results',
  /* Maximum time one test can run for */
  timeout: 60 * 1000,
  expect: {
    timeout: 8000,
  },
  /* Run tests sequentially to avoid cart/session conflicts */
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: 1,

  /* ── Reporters ── */
  reporter: [
    ['html', { outputFolder: 'reports/html-report', open: 'never' }],
    ['json', { outputFile: 'reports/json-report/test-results.json' }],
    ['allure-playwright', { resultsDir: 'reports/allure-results', detail: true, suiteTitle: false }],
    ['list'],
  ],

  use: {
    baseURL: 'https://automationteststore.com',
    /* Capture screenshot & video only when a test fails */
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
    headless: true,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
