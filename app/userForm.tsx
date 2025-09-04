import {useState} from 'react';
import {View, TextInput, Button, StyleSheet, Alert} from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';

const UserForm = () => {
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
    });
}