module.exports = {
  preset: 'jest-preset-angular',
  moduleNameMapper: {
    '\\.(jpg|jpeg|png)$': `${__dirname}/mock-module.js`,
  },
  globalSetup: 'jest-preset-angular/global-setup',
};
