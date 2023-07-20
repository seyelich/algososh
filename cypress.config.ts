import { defineConfig } from "cypress";
import { testUrl } from './src/constants/test';

export default defineConfig({
  projectId: 'mdyjho',
  e2e: {
    baseUrl: testUrl,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
