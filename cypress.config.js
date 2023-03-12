const { defineConfig } = require("cypress");
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    watchForFileChanges: false,
    setupNodeEvents(on, config) {
        allureWriter(on, config);
        return config;
      // implement node event listeners here
      }
    }
  })