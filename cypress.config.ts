import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    supportFile: false,
    video: false,
    retries: {
      // Configure retry attempts for `cypress run`
      "runMode": 2,
      // Configure retry attempts for `cypress open`
      "openMode": 0
  },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
