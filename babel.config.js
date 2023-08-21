module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@Navigation': './App/navigation',
          '@Components': './App/components',
          '@database': './App/database',
          '@models': './App/database/model',
          '@Screens': './App/screens',
          '@Assets': './assets',
          '@lib': './App/lib',
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    ],
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    'react-native-reanimated/plugin',
  ],
};
