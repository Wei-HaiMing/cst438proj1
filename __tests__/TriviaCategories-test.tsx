import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import TriviaCategoriesScreen from '../app/trivia_categories';

// Create mock functions that we can control
const mockPush = jest.fn();
const mockReplace = jest.fn();
const mockGetAllAsync = jest.fn();
const mockExecAsync = jest.fn();

// Mock the dependencies with our controlled functions
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: mockPush,
    replace: mockReplace,
  }),
}));

jest.mock('expo-sqlite', () => ({
  useSQLiteContext: () => ({
    getAllAsync: mockGetAllAsync,
    execAsync: mockExecAsync,
  }),
}));

jest.mock('../lib/chatgpt', () => ({
  askChatGPT: jest.fn(),
}));

// Mock React Native components
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  return {
    ...RN,
    Animated: {
      ...RN.Animated,
      timing: jest.fn(() => ({
        start: jest.fn(),
      })),
      Value: jest.fn(() => ({
        setValue: jest.fn(),
      })),
    },
    SafeAreaView: 'SafeAreaView',
    View: 'View',
    Text: 'Text',
    TouchableOpacity: 'TouchableOpacity',
  };
});

describe('<TriviaCategoriesScreen />', () => {
  beforeEach(() => {
    // Clear all mock calls before each test
    jest.clearAllMocks();
    
    // Set default resolved values to prevent undefined errors
    mockGetAllAsync.mockResolvedValue([]);
    mockExecAsync.mockResolvedValue(undefined);
  });

  test('renders logout button when user is logged in', async () => {
    // Mock database to return a user (logged in state)
    mockGetAllAsync.mockResolvedValue([{ id: 1, username: 'testuser' }]);

    const { getByText } = render(<TriviaCategoriesScreen />);

    // Wait for the component to check login status and update UI
    await waitFor(() => {
      expect(getByText('Logout')).toBeTruthy();
    }, { timeout: 3000 });
  });

  test('does not render logout button when user is not logged in', async () => {
    // Mock database to return no users (not logged in state)
    mockGetAllAsync.mockResolvedValue([]);

    const { queryByText } = render(<TriviaCategoriesScreen />);

    // Wait for the component to check login status
    await waitFor(() => {
      expect(queryByText('Logout')).toBeNull();
    });
  });

  test('logout button click clears user data and navigates to landing page', async () => {
    // Mock database to return a user (logged in state)
    mockGetAllAsync.mockResolvedValue([{ id: 1, username: 'testuser' }]);
    mockExecAsync.mockResolvedValue(undefined);

    const { getByText } = render(<TriviaCategoriesScreen />);

    // Wait for logout button to appear (component needs time to check login status)
    await waitFor(() => {
      expect(getByText('Logout')).toBeTruthy();
    }, { timeout: 3000 });

    // Click the logout button
    fireEvent.press(getByText('Logout'));

    // Wait for logout operations to complete
    await waitFor(() => {
      // Verify that the database DELETE query was called
      expect(mockExecAsync).toHaveBeenCalledWith('DELETE FROM UserInfo;');
      
      // Verify that router.replace was called with the correct path
      expect(mockReplace).toHaveBeenCalledWith('/');
    }, { timeout: 3000 });
  });

  test('handles database error during logout gracefully', async () => {
    // Mock database to return a user (logged in state)
    mockGetAllAsync.mockResolvedValue([{ id: 1, username: 'testuser' }]);
    
    // Mock database error during logout
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    mockExecAsync.mockRejectedValue(new Error('Database error'));

    const { getByText } = render(<TriviaCategoriesScreen />);

    // Wait for logout button to appear
    await waitFor(() => {
      expect(getByText('Logout')).toBeTruthy();
    }, { timeout: 3000 });

    // Click the logout button
    fireEvent.press(getByText('Logout'));

    // Wait for error handling
    await waitFor(() => {
      // Verify that console.error was called with the error
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error logging out:', expect.any(Error));
    });

    consoleErrorSpy.mockRestore();
  });

  test('renders "Get Categories" button initially when no categories are loaded', async () => {
    // Mock database to return no users (not logged in state)
    mockGetAllAsync.mockResolvedValue([]);

    const { getByText } = render(<TriviaCategoriesScreen />);

    // Wait for component to render
    await waitFor(() => {
      expect(getByText('Get Categories')).toBeTruthy();
    });
  });

  test('handles database error during user check gracefully', async () => {
    // Mock database error during user check
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    mockGetAllAsync.mockRejectedValue(new Error('Database connection error'));

    render(<TriviaCategoriesScreen />);

    // Wait for error handling
    await waitFor(() => {
      // Verify that console.error was called with the error
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error checking user login:', expect.any(Error));
    });

    consoleErrorSpy.mockRestore();
  });
});