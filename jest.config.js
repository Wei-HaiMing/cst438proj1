module.exports = {
  preset: null,
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^react-native$': '<rootDir>/__mocks__/react-native.js',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(@expo|expo|@react-native-community|@testing-library|@react-navigation)/)',
  ],
  testEnvironment: 'node',
};
