// // Test setup file - automatically mocks React Native components
// import '@testing-library/jest-native/extend-expect';

// // Mock React Native modules
// jest.mock('react-native', () => require('./__mocks__/react-native'));
// jest.mock('react-native-gesture-handler', () => require('./__mocks__/react-native-gesture-handler'));
// jest.mock('react-native-safe-area-context', () => require('./__mocks__/react-native-safe-area-context'));

// // Mock Expo modules
// jest.mock('expo-router', () => ({
//   useRouter: () => ({
//     push: jest.fn(),
//     replace: jest.fn(),
//     back: jest.fn(),
//   }),
//   useLocalSearchParams: () => ({}),
// }));

// jest.mock('expo-sqlite', () => ({
//   SQLiteProvider: ({ children }) => children,
//   useSQLiteContext: () => ({
//     runAsync: jest.fn(),
//     getFirstAsync: jest.fn(),
//     getAllAsync: jest.fn(),
//   }),
// }));

// // Silence console warnings during tests
// global.console = {
//   ...console,
//   warn: jest.fn(),
//   error: jest.fn(),
// };
