module.exports = {
  overrides: [
    {
      files: ['*.js'],
      parser: '@babel/eslint-parser',
    },
  ],
  rules: {
    'no-undef': 'off',
  },
  extends: 'universe/native',
};
