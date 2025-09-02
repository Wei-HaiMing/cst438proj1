import { View, Text, TextInput, Button } from 'react-native';

export default function SignupScreen() {
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Sign Up</Text>
      <TextInput placeholder="Email" style={{ borderWidth: 1, marginVertical: 8, padding: 8 }} />
      <TextInput placeholder="Password" secureTextEntry style={{ borderWidth: 1, marginVertical: 8, padding: 8 }} />
    <View style={{ marginVertical: 8 }} /> 
    <Button title="Create Account" onPress={() => {}} />
    </View>
  );
}