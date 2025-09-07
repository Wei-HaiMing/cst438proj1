import { useRouter } from 'expo-router';
import { View } from 'react-native';
import { Pressable, TextInput, Text } from 'react-native-gesture-handler';
import { Platform, StyleSheet } from 'react-native';


export default function SignupScreen() {
  const router = useRouter();


  const handleSignup = () => {
    router.replace('/login'); // redirect to login page after signup
  };


  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Sign Up</Text>
      <TextInput placeholder="Email" style={{ borderWidth: 1, marginVertical: 8, padding: 8 }} />
      <TextInput placeholder="Password" secureTextEntry style={{ borderWidth: 1, marginVertical: 8, padding: 8 }} />
      <View style={{ marginVertical: 8 }} />


      <Pressable
        onPress={handleSignup}
        style={({pressed}) => [
        {
            backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
            borderColor: pressed ? 'green' : 'blue',
            borderWidth: 1,
        },
        styles.wrapperCustom,
      ]}>
        {({pressed}) => (
            <Text style={styles.text}>{pressed ? 'Pressed!' : 'Signup'}</Text>
        )}
    </Pressable>
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


