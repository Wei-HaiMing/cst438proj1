import { useRouter } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useState } from 'react';
import { Alert, Button, StyleSheet, TextInput, View } from 'react-native';
import { useAuth } from '../lib/hooks';

const UserForm = ({ mode = 'signup' }) => {
    const [form, setForm] = useState({ // text in the text boxes
        name: '',
        password: '',
    });
    const db = useSQLiteContext();
    const router = useRouter();
    const { user, isLoggedIn, loading, login, logout, checkAuthStatus } = useAuth();
    const handleLogin = async (userData) => {
        const success = await login(userData);
        if (success) {
        console.log('Login successful!');
        }
    };

    const handleSubmit = async () => {
        try{
            //validating form data
            if(!form.name.trim() || !form.password.trim()){
                Alert.alert('Error', 'All fields are required');
                return;
            }
            
            if(mode === 'signup'){
                await db.runAsync(
                    'INSERT INTO UserInfo (name, password) VALUES (?, ?);',
                    [form.name, form.password]
                );

                const result = await db.getFirstAsync(
                    'SELECT * FROM UserInfo WHERE name = ? ORDER BY id DESC LIMIT 1',
                    [form.name]
                );

                if(result){
                    // Store complete user data in AsyncStorage
                    const userData = {
                        id: (result as any).id,
                        name: (result as any).name
                    };
                    await handleLogin(userData);
                    console.log('User inserted with ID:', (result as any).id);
                    Alert.alert('Success', `User ${(result as any).name} added successfully!`);
                    router.replace('/trivia_categories');
                }else{
                    Alert.alert('Error', 'User insert failed.');
                }

                setForm({ name: '', password: '' });
            } else if(mode === 'login'){
                
                const existingData = await db.getFirstAsync(
                    `SELECT * FROM UserInfo WHERE name = ? AND password = ?` ,
                    [form.name, form.password]
                );
                if(existingData){
                    // Store complete user data in AsyncStorage
                    const userData = {
                        id: (existingData as any).id,
                        name: (existingData as any).name
                    };
                    await handleLogin(userData);
                    Alert.alert('Success', `Welcome back, ${(existingData as any).name}!`);
                    router.replace('/trivia_categories');
                } else {
                    Alert.alert('Error', 'Invalid name or password.');
                }

                setForm({ name: '', password: '' });
                
            }

            
        }catch(error){
            console.error(error);
            Alert.alert('Error', (error as Error).message || 'An error occurred while adding a user');
        }
};

    return(
        <>
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={form.name}
                    onChangeText={(text) => setForm({...form, name: text})}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={form.password}
                    onChangeText={(text) => setForm({...form, password: text})}
                    secureTextEntry={true} 
                />
                <Button title={(mode === "login") ? "Sign In" : "Sign Up"} onPress={handleSubmit} />
                {mode === "login" && (
                    <>
                        <View style={{ height : 20}} />
                        <Button title="Need an account? Sign Up!" 
                                onPress ={ () => router.push('/signup') } 
                        />
                    </>
                )}
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#e5e5e5',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        alignItems: 'center',
    },
    input: {
        width: '40%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        fontSize: 14,
    },
});

export default UserForm;
