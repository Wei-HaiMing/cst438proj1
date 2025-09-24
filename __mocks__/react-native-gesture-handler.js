// Mock for react-native-gesture-handler
import React from 'react';

export const TouchableOpacity = ({ children, onPress, style, ...props }) => {
  return React.createElement('TouchableOpacity', { 
    ...props, 
    style,
    onClick: onPress // Convert onPress to onClick for web testing
  }, children);
};

export const Pressable = ({ children, onPress, style, ...props }) => {
  return React.createElement('Pressable', { 
    ...props, 
    style: typeof style === 'function' ? style({ pressed: false }) : style,
    onClick: onPress 
  }, typeof children === 'function' ? children({ pressed: false }) : children);
};

export const Text = ({ children, ...props }) => {
  return React.createElement('Text', props, children);
};

export const TextInput = ({ onChangeText, value, ...props }) => {
  return React.createElement('TextInput', {
    ...props,
    onChange: (e) => onChangeText && onChangeText(e.target.value),
    value
  });
};

export const GestureHandlerRootView = ({ children, ...props }) => {
  return React.createElement('GestureHandlerRootView', props, children);
};

export default {
  TouchableOpacity,
  Pressable,
  Text,
  TextInput,
  GestureHandlerRootView,
};