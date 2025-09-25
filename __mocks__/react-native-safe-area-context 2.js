// Mock for react-native-safe-area-context
import React from 'react';

export const SafeAreaView = ({ children, ...props }) => {
  return React.createElement('SafeAreaView', props, children);
};

export const SafeAreaProvider = ({ children, ...props }) => {
  return React.createElement('SafeAreaProvider', props, children);
};

export const useSafeAreaInsets = () => ({
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
});

export default {
  SafeAreaView,
  SafeAreaProvider,
  useSafeAreaInsets,
};