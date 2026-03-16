const fs = require('node:fs');
const path = require('node:path');
const { test: base, expect } = require('@playwright/test');

function sanitizeFileName(value) {
  return value.replace(/[^a-zA-Z0-9-_]+/g, '_').slice(0, 120);
}

const test = base.extend({
  _captureIssueScreenshot: [
    async ({ page }, use, testInfo) => {
      await use();

      const status = testInfo.status || 'unknown';
      const issueStatuses = new Set(['failed', 'timedOut', 'interrupted', 'skipped']);
      if (!issueStatuses.has(status)) {
        return;
      }

      const reportDir = path.join(process.cwd(), 'reports', 'screenshots', status);
      fs.mkdirSync(reportDir, { recursive: true });

      if (!page || page.isClosed()) {
        await testInfo.attach(`no-page-${status}`, {
          body: Buffer.from('Screenshot unavailable because page is not active.'),
          contentType: 'text/plain',
        });
        return;
      }

      const screenshotName = `${sanitizeFileName(`${testInfo.title}-${Date.now()}`)}.png`;
      const screenshotPath = path.join(reportDir, screenshotName);

      await page.screenshot({ path: screenshotPath, fullPage: true });
      await testInfo.attach(`screenshot-${status}`, {
        path: screenshotPath,
        contentType: 'image/png',
      });
    },
    { auto: true },
  ],
});

module.exports = { test, expect };


