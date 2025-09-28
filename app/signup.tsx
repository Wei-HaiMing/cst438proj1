import { View, Text } from 'react-native';
import UserForm from './UserForm';
import UserList from './UserList';

export default function SignupScreen() {
  return (
    <View style={{ padding: 20, backgroundColor: '#fff7e0' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 12, color: '#333' }}>
        Sign Up
      </Text>

      <UserForm mode="signup" />
      <UserList />
    </View>
  );
}