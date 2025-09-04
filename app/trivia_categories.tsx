import { useRouter } from 'expo-router';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function TriviaCategoriesScreen() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>
            <View 
            style={{ backgroundColor: 'white' }}>

            <Text>Welcome to Trivia Categories!</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5a7a7ff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        textAlign: 'center',
    },
});