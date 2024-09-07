const { devices } = require('@playwright/test');

module.exports = {
  projects: [
    {
      name: 'Chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'WebKit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  use: {
    headless: false, // Set to true to run tests headlessly
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
};