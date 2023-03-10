const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
  },
  projectId: "mpmv21",
  retries: {
    runMode: 2,
    openMode: 0,
  },
});
