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
import UserForm from './UserForm';
import UserList from './UserList';

export default function LoginScreen() {
  const router = useRouter();


  const handleLogin = () => {
    router.replace('/'); // redirect to index page after login
  };


  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Login</Text>
      {/* <TextInput placeholder="Email" style={{ borderWidth: 1, marginVertical: 8, padding: 8 }} />
      <TextInput placeholder="Password" secureTextEntry style={{ borderWidth: 1, marginVertical: 8, padding: 8 }} /> */}
      <View style={{ marginVertical: 8 }} />

      <UserForm mode="login" />
      <UserList />
      {/* <Pressable
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
    </Pressable> */}
    </View>
  );
}


const styles = StyleSheet.create({
  // titleContainer: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   gap: 8,
  // },
  // stepContainer: {
  //   gap: 8,
  //   marginBottom: 8,
  // },
  // reactLogo: {
  //   height: 178,
  //   width: 290,
  //   bottom: 0,
  //   left: 0,
  //   position: 'absolute',
  // },
  // input: {
  //   height: 40,
  //   margin: 12,
  //   borderWidth: 1,
  //   padding: 10,
  // },
  wrapperCustom: {
    borderRadius: 8,
    padding: 6,
  },
  text: {
    fontSize: 16,
  },
});




// import { Image } from 'expo-image';
// import { Platform, StyleSheet } from 'react-native';


// import { HelloWave } from '@/components/HelloWave';
// import ParallaxScrollView from '@/components/ParallaxScrollView';
// import { ThemedText } from '@/components/ThemedText';
// import { ThemedView } from '@/components/ThemedView';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
// import { Pressable, TextInput, Text } from 'react-native-gesture-handler';
// import {SafeAreaView} from 'react-native-safe-area-context';
// import React from 'react';
// import { useRouter } from 'expo-router';


// export default function LoginScreen() {
//     const router = useRouter();
//     const [usernameInput, onChangeUsername] = React.useState('');
//     const [passwordInput, onChangePassword] = React.useState('');


//     const printLoginInfo = () => {
//         console.log("Username: " + usernameInput + ", \nPassword: " + passwordInput);
//         if(usernameInput.trim().length !== 0 && passwordInput.trim().length !== 0)
//         {
//           router.replace('/(tabs)/explore'); // redirect to home page after login
//         }
//     }
//     return (
//     <ParallaxScrollView
//       headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
//       headerImage={
//         <Image
//           source={require('@/assets/images/partial-react-logo.png')}
//           style={styles.reactLogo}
//         />
//       }>


//       <SafeAreaProvider> {/* code referenced from https://reactnative.dev/docs/textinput */}
//         <SafeAreaView>   {/* https://reactnative.dev/docs/next/safeareaview */}
//             <ThemedView style={styles.titleContainer}>
//               <ThemedText type="title">Login Page</ThemedText>
//               <HelloWave />
//             </ThemedView>


//             <TextInput // enter username box
//                 style = {styles.input}            // the style of the text box as defined at the bottom of the file
//                 onChangeText = {onChangeUsername} // identifies the function to change the text
//                 value = {usernameInput}           // the value of the text box
//                 placeholder = "Username"
//             />
//             <TextInput // enter password box
//                 style = {styles.input}
//                 onChangeText = {onChangePassword}
//                 value = {passwordInput}
//                 secureTextEntry={true}
//                 placeholder = "Password"
//             />
//             <Pressable // https://reactnative.dev/docs/pressable
//                 onPress={printLoginInfo}
//                 style={({pressed}) => [
//                 {
//                     backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
//                     borderColor: pressed ? 'green' : 'blue',
//                     borderWidth: 1,
//                 },
//                 styles.wrapperCustom,
//             ]}>
//                 {({pressed}) => (
//                     <Text style={styles.text}>{pressed ? 'Pressed!' : 'Press Me'}</Text>
//                 )}
//             </Pressable>
//         </SafeAreaView>
//       </SafeAreaProvider>
     
//     </ParallaxScrollView>
//   );
// }


// const styles = StyleSheet.create({
//   titleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   stepContainer: {
//     gap: 8,
//     marginBottom: 8,
//   },
//   reactLogo: {
//     height: 178,
//     width: 290,
//     bottom: 0,
//     left: 0,
//     position: 'absolute',
//   },
//   input: {
//     height: 40,
//     margin: 12,
//     borderWidth: 1,
//     padding: 10,
//   },
//   wrapperCustom: {
//     borderRadius: 8,
//     padding: 6,
//   },
//   text: {
//     fontSize: 16,
//   },
// });
