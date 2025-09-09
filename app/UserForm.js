import { useSQLiteContext } from 'expo-sqlite';
import { useState } from 'react';
import { Alert, Button, StyleSheet, TextInput, View } from 'react-native';

const UserForm = () => {
    const [form, setForm] = useState({
        name: '',
        password: '',
    });
    const db = useSQLiteContext();

    const handleSubmit = async () => {
        try{
            //validating form data
            if(!form.name.trim() || !form.password.trim()){
                Alert.alert('Error', 'All fields are required');
                return;
            }

            await db.runAsync(
                'INSERT INTO users (name, password) VALUES (?, ?);',
                [form.name, form.password]
              );

            const result = await db.getFirstAsync(
                'SELECT * FROM users WHERE name = ? ORDER BY id DESC LIMIT 1',
                [form.name]
              );

            if(result){
                Alert.alert('Success', `User ${result.name} added successfully!`);
            }else{
                Alert.alert('Error', 'User insert failed.');
            }

            setForm({ name: '', password: '' });
        }catch(error){
            console.error(error);
            Alert.alert('Error', error.message || 'An error occurred while adding a user');
        }
};

    return(
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
            <Button title="Add User" onPress={handleSubmit} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
});

export default UserForm;