import { useRouter } from 'expo-router';
import { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { askChatGPT } from '../lib/chatgpt';

export default function TriviaCategoriesScreen() {
    const router = useRouter();
    const chatPrompt = "Come up with 4 fun trivia categories";
    const [response, setResponse] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleGetCategories = async () => {
        setLoading(true);
        const response = await askChatGPT(chatPrompt);
        console.log("ChatGPT response:", response);
        setResponse(response);
        setLoading(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View 
            style={{ backgroundColor: 'white' }}>

            <Text>Select a trivia category:</Text>
            <TouchableOpacity onPress={handleGetCategories} disabled={loading}>
                <Text>{loading ? 'Loading...' : 'Get Categories'}</Text>
            </TouchableOpacity>
            {response && (
                <View>
                    <Text>Categories:</Text>
                    <Text>{response}</Text>
                </View>
            )}
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