import { SafeAreaView } from 'react-native-safe-area-context';
import UserForm from './UserForm';
import UserList from './UserList';

export default function UsersScreen() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <UserForm />
            <UserList />
        </SafeAreaView>
    );
}