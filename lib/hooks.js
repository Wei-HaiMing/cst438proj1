// Custom hook for AsyncStorage operations
import { useEffect, useState } from 'react';
import * as Storage from './storage';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const loggedIn = await Storage.checkLoginStatus();
      if (loggedIn) {
        const userData = await Storage.getCurrentUser();
        setUser(userData);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (userData) => {
    const success = await Storage.saveUserSession(userData);
    if (success) {
      setUser(userData);
      setIsLoggedIn(true);
    }
    return success;
  };

  const logout = async () => {
    const success = await Storage.logout();
    if (success) {
      setUser(null);
      setIsLoggedIn(false);
    }
    return success;
  };

  return {
    user,
    isLoggedIn,
    loading,
    login,
    logout,
    checkAuthStatus,
  };
};

export const useHighScore = (userId) => {
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    if (userId) {
      loadHighScore();
    }
  }, [userId]);

  const loadHighScore = async () => {
    const score = await Storage.getHighScore(userId);
    setHighScore(score);
  };

  const updateHighScore = async (newScore) => {
    const success = await Storage.saveHighScore(userId, newScore);
    if (success) {
      setHighScore(newScore);
    }
    return success;
  };

  return {
    highScore,
    updateHighScore,
    loadHighScore,
  };
};