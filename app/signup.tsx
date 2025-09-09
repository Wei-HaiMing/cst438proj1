import { View, Text } from 'react-native';
import UserForm from './UserForm';
import UserList from './UserList';

export default function SignupScreen() {
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 12 }}>
        Sign Up
      </Text>

      <UserForm />
      <UserList />
    </View>
  );
}