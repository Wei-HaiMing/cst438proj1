/*
Author: Armando Vega
Date Last Modified: 9 September 2025
Summary: Login page for the app. I put comments everywhere since this is my first time
working with ReactNative.
*/

import { useRouter } from 'expo-router';
import { View } from 'react-native';
import { Text } from 'react-native-gesture-handler';
import { Platform, StyleSheet } from 'react-native';
import UserForm from './UserForm';
import UserList from './UserList';

export default function LoginScreen() {


  return (
    <View style={{ padding: 20, backgroundColor: '#fff7e0' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#333' }}>Login</Text>
      <View style={{ marginVertical: 8 }} />

      <UserForm mode="login" />
      <UserList />
    </View>
  );
}


const styles = StyleSheet.create({
  wrapperCustom: {
    borderRadius: 8,
    padding: 6,
  },
  text: {
    fontSize: 16,
  },
});
