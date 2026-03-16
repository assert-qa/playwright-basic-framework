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
- Allure raw results: `reports/allure-results/`
- Allure HTML report: `reports/allure-report/`
- Latest summary: `reports/feature-reports/latest-summary.md`
- Issue screenshots (failed/skipped): `reports/screenshots/`

## Advanced Allure Reporting

```bash
npm run report:allure
npm run allure:open
npm run allure:serve
```

`report:allure` akan generate HTML Allure ke `reports/allure-report` dari data `reports/allure-results`.

- `npm run allure:open` membuka report statis dari `reports/allure-report/index.html`.
- `npm run allure:serve` membuka report langsung dari data mentah `reports/allure-results` (live/temporary server).

## Screenshot on Failed/Skipped

Framework menangkap screenshot otomatis jika test `failed`, `timedOut`, `interrupted`, atau `skipped`.

- File screenshot disimpan di `reports/screenshots/<status>/`
- Screenshot juga di-attach ke hasil test agar tampil di Allure

