# Automation Test Store - Test Report Overview

Date: 2026-03-16
Environment: Chromium (Playwright)
Base URL: https://automationteststore.com

## Overall Result

- Total executed: 32
- Passed: 31
- Skipped: 1
- Failed: 0
- Duration: ~2.6 minutes

## Core Features Covered

1. Authentication (`tests/auth/`)
2. Product Search (`tests/search/`)
3. Product Details (`tests/product/`)
4. Shopping Cart (`tests/cart/`)
5. Checkout Flow (`tests/checkout/`)

## Report Artifacts

- HTML report: `reports/html-report/index.html`
- JSON report: `reports/json-report/test-results.json`
- Per-feature summaries: `reports/feature-reports/*.md`

## Notes

- `TC_AUTH_L06` is skipped intentionally when real account credentials are not provided in environment variables.
- To enable full login success scenario, set `TEST_LOGIN_NAME` and `TEST_PASSWORD` in `.env`.

