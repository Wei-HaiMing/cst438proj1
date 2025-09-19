// Storage utility functions for the trivia app
import AsyncStorage from '@react-native-async-storage/async-storage';

// Keys for consistent storage naming
export const STORAGE_KEYS = {
  CURRENT_USER: 'currentUser',
  IS_LOGGED_IN: 'isLoggedIn',
  HIGH_SCORE: 'highScore',
};

// User session management
export const saveUserSession = async (userData) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(userData));
    await AsyncStorage.setItem(STORAGE_KEYS.IS_LOGGED_IN, 'true');
    return true;
  } catch (error) {
    console.error('Failed to save user session:', error);
    return false;
  }
};

export const getCurrentUser = async () => {
  try {
    const userData = await AsyncStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Failed to get current user:', error);
    return null;
  }
};

export const checkLoginStatus = async () => {
  try {
    const isLoggedIn = await AsyncStorage.getItem(STORAGE_KEYS.IS_LOGGED_IN);
    return isLoggedIn === 'true';
  } catch (error) {
    console.error('Failed to check login status:', error);
    return false;
  }
};

export const logout = async () => {
  try {
    await AsyncStorage.multiRemove([STORAGE_KEYS.CURRENT_USER, STORAGE_KEYS.IS_LOGGED_IN]);
    return true;
  } catch (error) {
    console.error('Failed to logout:', error);
    return false;
  }
};

// High score management
export const saveHighScore = async (userId, score) => {
  try {
    const key = `${STORAGE_KEYS.HIGH_SCORE}_${userId}`;
    const currentScore = await AsyncStorage.getItem(key);
    
    if (!currentScore || parseInt(currentScore) < score) {
      await AsyncStorage.setItem(key, score.toString());
      return true;
    }
    return false;
  } catch (error) {
    console.error('Failed to save high score:', error);
    return false;
  }
};

export const getHighScore = async (userId) => {
  try {
    const key = `${STORAGE_KEYS.HIGH_SCORE}_${userId}`;
    const score = await AsyncStorage.getItem(key);
    return score ? parseInt(score) : 0;
  } catch (error) {
    console.error('Failed to get high score:', error);
    return 0;
  }
};

// Clear all app data
export const clearAllData = async () => {
  try {
    await AsyncStorage.clear();
    return true;
  } catch (error) {
    console.error('Failed to clear all data:', error);
    return false;
  }
};