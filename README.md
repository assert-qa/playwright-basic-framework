# Basic Playwright Framework

UI automation for https://automationteststore.com using Playwright.

## Core Features Under Test

- Authentication (`tests/auth/`)
- Product Search (`tests/search/`)
- Product Details (`tests/product/`)
- Shopping Cart (`tests/cart/`)
- Checkout Flow (`tests/checkout/`)

## Run Tests

```bash
npm test
```

After every `npm test`, a single summary report is auto-generated at:

- `reports/feature-reports/latest-summary.md`

## Run by Tag

```bash
npm run test:smoke
npm run test:regression
```

Tags used in specs:

- `@smoke`: critical fast-path checks
- `@regression`: broader suite coverage

## Report Artifacts

- HTML: `reports/html-report/index.html`
- JSON: `reports/json-report/test-results.json`
- Latest summary: `reports/feature-reports/latest-summary.md`

