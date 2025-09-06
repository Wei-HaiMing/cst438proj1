import { useRouter } from 'expo-router';
import { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { askChatGPT } from '../lib/chatgpt';

export default function TriviaCategoriesScreen() {
    const router = useRouter();
    const chatPrompt = `Come up with 4 fun trivia categories.  Your response should strictly follow the following format:
                            (first category's name)-(discription)|(second category's name)-(discription)|ect.
                            Where '-' seperates a category's name and discription, and '|' seperates categories, and '()'
                            is just a place holder so DO NOT include parenthesis '()' in your response`;
    const [categories, setCategories] = useState<{ name: string; description: string}[]>([]);
    const [loading, setLoading] = useState(false);

    const handleGetCategories = async () => {
        setLoading(true);
        const response = await askChatGPT(chatPrompt);
        const categories = response.split('|').map((cat: { split: (arg0: string) => [any, any]; }) => {
            const [name, description] = cat.split('-');
            return { name: name?.trim() ?? '', description: description?.trim() ?? ''};
        });
        
        setCategories(categories);
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
            {categories.length > 0 && (
                <View>
                    <Text>Categories:</Text>
                    {categories.map((cat, idx) => (
                        <TouchableOpacity key={idx} style={{ marginVertical: 5}}>
                            <Text>{cat.name}</Text>
                        </TouchableOpacity>
                    ))}
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