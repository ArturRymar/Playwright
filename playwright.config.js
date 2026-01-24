// @ts-check
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import path from 'path';

//@ts-ignore
function selectEnvData(env) {
  const envData = dotenv.config({ path: `.env.${env}` });
  return envData.parsed;
}
const devEnv = selectEnvData('dev');
const stageEnv = selectEnvData('stage');

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './e2e',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    // baseURL: 'https://qauto.forstudy.space/',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    // httpCredentials: {
    //   username: 'guest',
    //   password: 'welcome2qauto',
    // },
  },
  /* Configure projects for major browsers */
  projects: [
    {
      name: 'dev',
      use: {
        //@ts-ignore
        baseURL: devEnv.BASE_URL,
        httpCredentials: {
          //@ts-ignore
          username: devEnv.BROWSER_USERNAME,
          //@ts-ignore
          password: devEnv.BROWSER_PASSWORD,
        },
        ...devices['Desktop Chrome'],
      },
    },

    {
      name: 'stage',
      use: {
        //@ts-ignore
        baseURL: stageEnv.BASE_URL,
        httpCredentials: {
          //@ts-ignore
          username: stageEnv.BROWSER_USERNAME,
          //@ts-ignore
          password: stageEnv.BROWSER_PASSWORD,
        },
        ...devices['Desktop Firefox'],
      },
    },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
