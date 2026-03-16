const fs = require('fs');
const path = require('path');

const REPORT_JSON_PATH = path.join(__dirname, '..', 'reports', 'json-report', 'test-results.json');
const SUMMARY_PATH = path.join(__dirname, '..', 'reports', 'feature-reports', 'latest-summary.md');

function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function getAllSpecs(suites = [], collector = []) {
  for (const suite of suites) {
    if (Array.isArray(suite.specs)) {
      collector.push(...suite.specs);
    }
    if (Array.isArray(suite.suites)) {
      getAllSpecs(suite.suites, collector);
    }
  }
  return collector;
}

function getFinalStatus(testEntry) {
  const results = Array.isArray(testEntry?.results) ? testEntry.results : [];
  const finalResult = results[results.length - 1];
  return finalResult?.status || 'unknown';
}

function parseTags(specTitle, specTags) {
  if (Array.isArray(specTags) && specTags.length > 0) {
    return specTags.map((tag) => (tag.startsWith('@') ? tag : `@${tag}`));
  }
  return specTitle.match(/@\w+/g) || [];
}

function buildMarkdown(payload) {
  const {
    generatedAt,
    total,
    passed,
    failed,
    skipped,
    flaky,
    durationMs,
    smokeCount,
    regressionCount,
    byFeature,
  } = payload;

  const durationSec = (durationMs / 1000).toFixed(1);
  const featureRows = Object.keys(byFeature)
    .sort()
    .map((feature) => {
      const item = byFeature[feature];
      return `| ${feature} | ${item.total} | ${item.passed} | ${item.failed} | ${item.skipped} |`;
    })
    .join('\n');

  return [
    '# Latest Test Summary',
    '',
    `Generated at: ${generatedAt}`,
    '',
    '## Overall',
    '',
    `- Total: ${total}`,
    `- Passed: ${passed}`,
    `- Failed: ${failed}`,
    `- Skipped: ${skipped}`,
    `- Flaky (pass on retry): ${flaky}`,
    `- Duration: ${durationSec} seconds`,
    '',
    '## Tag Coverage',
    '',
    `- @smoke executed: ${smokeCount}`,
    `- @regression executed: ${regressionCount}`,
    '',
    '## Result by Feature',
    '',
    '| Feature | Total | Passed | Failed | Skipped |',
    '| --- | ---: | ---: | ---: | ---: |',
    featureRows || '| - | 0 | 0 | 0 | 0 |',
    '',
    '## Artifacts',
    '',
    '- HTML report: `reports/html-report/index.html`',
    '- JSON report: `reports/json-report/test-results.json`',
    '',
  ].join('\n');
}

function generateLatestSummary() {
  ensureDir(SUMMARY_PATH);

  if (!fs.existsSync(REPORT_JSON_PATH)) {
    fs.writeFileSync(
      SUMMARY_PATH,
      [
        '# Latest Test Summary',
        '',
        `Generated at: ${new Date().toISOString()}`,
        '',
        'No JSON report found. Run Playwright tests first.',
        '',
      ].join('\n'),
      'utf8'
    );
    return;
  }

  const reportJson = JSON.parse(fs.readFileSync(REPORT_JSON_PATH, 'utf8'));
  const specs = getAllSpecs(reportJson.suites || []);

  let total = 0;
  let passed = 0;
  let failed = 0;
  let skipped = 0;
  let flaky = 0;
  let durationMs = 0;
  let smokeCount = 0;
  let regressionCount = 0;

  const byFeature = {};

  for (const spec of specs) {
    const tests = Array.isArray(spec.tests) ? spec.tests : [];
    const tags = parseTags(spec.title || '', spec.tags || []);
    const isSmoke = tags.includes('@smoke');
    const isRegression = tags.includes('@regression');

    for (const item of tests) {
      const status = getFinalStatus(item);
      const results = Array.isArray(item.results) ? item.results : [];
      const finalResult = results[results.length - 1];

      total += 1;
      durationMs += finalResult?.duration || 0;

      if (status === 'passed') {
        passed += 1;
      } else if (status === 'skipped') {
        skipped += 1;
      } else {
        failed += 1;
      }

      if (results.length > 1 && status === 'passed') {
        flaky += 1;
      }

      if (isSmoke) {
        smokeCount += 1;
      }
      if (isRegression) {
        regressionCount += 1;
      }

      const feature = (spec.file || '').split('/')[0] || 'unknown';
      if (!byFeature[feature]) {
        byFeature[feature] = { total: 0, passed: 0, failed: 0, skipped: 0 };
      }

      byFeature[feature].total += 1;
      if (status === 'passed') {
        byFeature[feature].passed += 1;
      } else if (status === 'skipped') {
        byFeature[feature].skipped += 1;
      } else {
        byFeature[feature].failed += 1;
      }
    }
  }

  const content = buildMarkdown({
    generatedAt: new Date().toISOString(),
    total,
    passed,
    failed,
    skipped,
    flaky,
    durationMs,
    smokeCount,
    regressionCount,
    byFeature,
  });

  fs.writeFileSync(SUMMARY_PATH, content, 'utf8');
}

if (require.main === module) {
  generateLatestSummary();
}

module.exports = { generateLatestSummary };

