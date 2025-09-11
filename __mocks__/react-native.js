// __mocks__/react-native.js
const React = require('react');

const StyleSheet = {
  create: (styles) => styles,
  flatten: (style) => style,
};

const Text = ({ children, ...props }) => React.createElement('Text', props, children);
const View = ({ children, ...props }) => React.createElement('View', props, children);

module.exports = {
  StyleSheet,
  Text,
  View,
};
