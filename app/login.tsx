/*
Author: Armando Vega
Date Last Modified: 9 September 2025
Summary: Login page for the app. I put comments everywhere since this is my first time
working with ReactNative.
*/

import { useRouter } from 'expo-router';
import { View } from 'react-native';
import { Pressable, TextInput, Text } from 'react-native-gesture-handler';
import { Platform, StyleSheet } from 'react-native';


export default function LoginScreen() {
  const router = useRouter();


  const handleLogin = () => {
    router.replace('/'); // redirect to index page after login
  };


  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Login</Text>
      <TextInput placeholder="Email" style={{ borderWidth: 1, marginVertical: 8, padding: 8 }} />
      <TextInput placeholder="Password" secureTextEntry style={{ borderWidth: 1, marginVertical: 8, padding: 8 }} />
      <View style={{ marginVertical: 8 }} />


      <Pressable
        onPress={handleLogin}
        style={({pressed}) => [
        {
            backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
            borderColor: pressed ? 'green' : 'blue',
            borderWidth: 1,
        },
        styles.wrapperCustom,
      ]}>
        {({pressed}) => (
            <Text style={styles.text}>{pressed ? 'Pressed!' : 'Login'}</Text>
        )}
    </Pressable>
    <Pressable
        onPress={() => router.push('/signup')}
        style={({pressed}) => [
        {
            backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
            borderColor: pressed ? 'green' : 'blue',
            borderWidth: 1,
        },
        styles.wrapperCustom,
      ]}>
        {({pressed}) => (
            <Text style={styles.text}>{pressed ? 'Pressed!' : 'Sign Up'}</Text>
        )}
    </Pressable>
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
