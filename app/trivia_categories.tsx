import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Animated, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { askChatGPT } from '../lib/chatgpt';

export default function TriviaCategoriesScreen() {
    const router = useRouter();
    const chatPrompt = `Come up with 4 fun trivia categories.  Your response should strictly follow the following format:
                            (first category's name)-(discription)|(second category's name)-(discription)|ect.
                            Where '-' seperates a category's name and discription, and '|' seperates categories, and '()'
                            is just a place holder so DO NOT include parenthesis '()' in your response`;
    const [categories, setCategories] = useState<{ name: string; description: string}[]>([]);
    const [loading, setLoading] = useState(false);
    const [fadeAnim] = useState(new Animated.Value(0));

    const handleGetCategories = async () => {
        setLoading(true);
        const response = await askChatGPT(chatPrompt);
        const categories = response.split('|').map((cat: { split: (arg0: string) => [any, any]; }) => {
            const [name, description] = cat.split('-');
            return { name: name?.trim() ?? '', description: description?.trim() ?? ''};
        });
        
        setCategories(categories);
        setLoading(false);
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };

    return (
        <SafeAreaView style={styles.container}>
            {!categories.length ?(
                <View 
                style={ styles.card}>
                    <TouchableOpacity onPress={handleGetCategories} disabled={loading}>
                        <Text style={styles.text}>{loading ? 'Loading...' : 'Get Categories'}</Text>
                    </TouchableOpacity>
                </View>
            ) : (
            <Animated.View
                style={{ backgroundColor: 'white', margin: 8, borderRadius: 8, opacity: fadeAnim}}>
                    <View>
                        {Array.from({ length: Math.ceil(categories.length / 2)}).map((_, rowIdx) => (
                            <View key={rowIdx} style={styles.row}>
                                {categories.slice(rowIdx * 2, rowIdx * 2 + 2).map((cat, idx) => (
                                    <TouchableOpacity 
                                    key={idx} 
                                    style={styles.card}
                                    onPress={() => router.push({pathname: '/choice', params: { category: cat.name, description: cat.description} })}>
                                        <Text style={styles.text}>{cat.name}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        ))}
                    </View>
                </Animated.View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 8,
    },
    card: {
        //flex: 1,
        backgroundColor: '#f7c873',
        padding: 16,
        marginHorizontal: 8,
        borderRadius: 8,
        alignItems: 'center',
    },
    text: {
        fontWeight: 'bold',
        color: '#333',
        alignContent: 'center',
    },
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