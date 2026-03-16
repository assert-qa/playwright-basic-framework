const { spawn } = require('child_process');
const { generateLatestSummary } = require('./generate-latest-summary');

const extraArgs = process.argv.slice(2);
const command = `npx playwright test ${extraArgs.join(' ')}`.trim();

const testProcess = spawn(command, {
  stdio: 'inherit',
  shell: true,
});

testProcess.on('close', (code) => {
  try {
    generateLatestSummary();
  } catch (error) {
    // Keep original test status even if summary generation fails.
    console.error('[summary] Failed to generate latest-summary.md:', error.message);
  }

  process.exit(typeof code === 'number' ? code : 1);
});

testProcess.on('error', (error) => {
  console.error('[runner] Failed to start Playwright test process:', error.message);

  try {
    generateLatestSummary();
  } catch (summaryError) {
    console.error('[summary] Failed to generate latest-summary.md:', summaryError.message);
  }

  process.exit(1);
});

