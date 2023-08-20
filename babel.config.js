module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@Navigation': './App/navigation',
          '@Components': './App/components',
          '@Context': './App/contexts',
          '@Screens': './App/screens',
          '@Styles': './App/styles',
          '@Assets': './assets',
          '@root': './index.js',
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    ],
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    'react-native-reanimated/plugin',
  ],
};
