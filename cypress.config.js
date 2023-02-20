const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "k1c4y7",
  chromeWebSecurity: false,
  defaultCommandTimeout: 8000,
  pageLoadTimeout: 30000,
  env: {
    url: 'https://mailfence.com'
  },
  retries: {
    runMode: 1
  },
  e2e: {
    setupNodeEvents,
    specPattern: 'cypress/integration/tests/*Test.{js}' 
  },
});
