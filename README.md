# Playwright Javascript Framework

End-to-end UI automation framework for `https://automationteststore.com` using Playwright with Page Object Model, tag-based execution, and multi-format reporting.

## Project Overview

This project validates core e-commerce user journeys on Automation Test Store:

- authentication (login and register)
- product discovery (search and product details)
- cart behavior
- checkout flow

The framework is designed for stable local runs and CI readiness, with reports consolidated under `reports/`.

## Architecture Documentation (Overview)

The framework follows a layered test architecture:

- **Test Specs**: business scenarios and assertions in `tests/**`
- **Page Objects**: reusable UI actions/selectors in `pages/**`
- **Fixtures/Hooks**: shared behavior (e.g., screenshot on failed/skipped) in `tests/fixtures/**`
- **Test Data**: central static/dynamic test inputs in `utils/**`
- **Execution Orchestration**: Playwright config + wrapper scripts in root and `scripts/**`
- **Reporting**: HTML/JSON/Allure/Summary artifacts in `reports/**`

## Test Execution Flow

1. Command runs via `npm` scripts.
2. `scripts/run-tests-with-summary.js` executes `playwright test`.
3. Playwright loads config from `playwright.config.js`.
4. Test specs call page objects and shared fixtures.
5. On failed/skipped/timedOut/interrupted, screenshot is captured and attached.
6. Playwright reporters produce HTML, JSON, and Allure raw results.
7. `scripts/generate-latest-summary.js` creates `reports/feature-reports/latest-summary.md`.

## Layers

- **Presentation Layer**: UI interactions wrapped in page classes (`pages/*.js`)
- **Test Layer**: scenario coverage per feature (`tests/<feature>/*.spec.js`)
- **Support Layer**: fixtures and data utilities (`tests/fixtures`, `utils`)
- **Reporting Layer**: consolidated artifacts (`reports/**`)

## File Project Structure

```text
basic_framework/
|-- pages/                       # Page Object classes per domain page
|   |-- LoginPage.js             # Login selectors and actions
|   |-- RegisterPage.js          # Registration selectors and actions
|   |-- HomePage.js              # Home page interactions
|   |-- SearchPage.js            # Search utilities (if used)
|   |-- ProductPage.js           # Product details interactions
|   |-- CartPage.js              # Cart page interactions
|   `-- CheckoutPage.js          # Checkout page interactions
|-- tests/
|   |-- auth/                    # Authentication scenarios
|   |-- search/                  # Search scenarios
|   |-- product/                 # Product detail scenarios
|   |-- cart/                    # Cart scenarios
|   |-- checkout/                # Checkout scenarios
|   `-- fixtures/
|       `-- reportingHooks.js    # Auto screenshot + attachment hooks
|-- utils/
|   `-- testData.js              # Shared test data source
|-- scripts/
|   |-- run-tests-with-summary.js      # Test runner wrapper
|   `-- generate-latest-summary.js     # Markdown summary generator
|-- reports/
|   |-- html-report/             # Playwright HTML report
|   |-- json-report/             # Playwright JSON report
|   |-- allure-results/          # Allure raw results
|   |-- allure-report/           # Generated Allure HTML report
|   |-- feature-reports/         # Feature-level markdown reports + latest summary
|   |-- screenshots/             # Failed/skipped/timedOut screenshots
|   `-- test-results/            # Playwright runtime artifacts (ignored in git)
|-- playwright.config.js         # Playwright runtime/reporter config
|-- package.json                 # Scripts and dependencies
`-- README.md
```

## Key Features

- Page Object Model for maintainable selectors/actions
- Feature-based test organization
- Tagging support: `@smoke` and `@regression`
- Auto summary generation after each `npm test`
- Advanced Allure reporting (`allure-results` and `allure-report`)
- Automatic screenshot capture for problematic outcomes

## Test Coverages

Current coverage areas:

- **Authentication**: login UI validation, negative login, register validations, success registration
- **Search**: positive keyword search, no-result behavior, header search flow
- **Product Details**: visibility checks, price and image, quantity interaction, breadcrumb validation
- **Cart**: cart entry/access, empty cart behavior, navigation checks
- **Checkout**: checkout route validations and empty cart redirection behavior

Execution scopes:

- `@smoke`: critical fast-path checks
- `@regression`: broader complete suite coverage

## Usage Examples

Install dependencies:

```bash
npm install
```

Run full suite:

```bash
npm test
```

Run tagged subsets:

```bash
npm run test:smoke
npm run test:regression
```

Run by feature:

```bash
npm run test:auth
npm run test:search
npm run test:product
npm run test:cart
npm run test:checkout
```

Open reports:

```bash
npm run report
npm run report:allure
npm run allure:open
npm run allure:serve
```

## Utilities

- `utils/testData.js`: centralized test inputs and known entities
- `tests/fixtures/reportingHooks.js`: screenshot and attachment automation
- `scripts/run-tests-with-summary.js`: ensures summary generation after test execution
- `scripts/generate-latest-summary.js`: compiles markdown summary from JSON report

## Reports List

- `reports/html-report/index.html`: Playwright HTML report (human-readable)
- `reports/json-report/test-results.json`: raw structured execution data
- `reports/allure-results/`: Allure raw files for generation/serve
- `reports/allure-report/index.html`: generated Allure dashboard
- `reports/feature-reports/latest-summary.md`: latest single summary markdown
- `reports/feature-reports/*.md`: per-feature markdown reports
- `reports/screenshots/<status>/`: screenshots for `failed`, `skipped`, `timedOut`, `interrupted`

