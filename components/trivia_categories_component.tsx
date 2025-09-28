/**
 * Trivia Categories Screen Component
 * 
 * This screen allows users to choose what category they want to choose for the trivia game.
 * The categories are generated dynamically, which makes categories not static.
 * 
 * Features:
 * - Dynamic category generation
 * - Animated fade-in effect for category display
 * - Grid layout with 2 categories per row
 * - Loading state management
 * - Responsive design with styled components
 * 
 * @author CST-438 Project Team
 * @version 1.0
 * @date Fall 2025
 */

import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Animated, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { askChatGPT } from '../lib/chatgpt';

/**
 * Props interface for the Trivia Categories screen
 */
interface TriviaCategoriesProps {
    onCategorySelect?: (category: string, description: string) => void;
}

/**
 * Main functional component for the Trivia Categories screen
 * Handles category generation, state management, and user interactions
 */
const TriviaCategoriesScreen = ({ onCategorySelect }: TriviaCategoriesProps) => {
    const router = useRouter();
    const chatPrompt = `Come up with 4 fun trivia categories.  Your response should strictly follow the following format:
                            (first category's name)-(discription)|(second category's name)-(discription)|ect.
                            Where '-' seperates a category's name and discription, and '|' seperates categories, and '()'
                            is just a place holder so DO NOT include parenthesis '()' in your response`;
    const [categories, setCategories] = useState<{ name: string; description: string}[]>([]);
    const [loading, setLoading] = useState(false);
    const [fadeAnim] = useState(new Animated.Value(0));

    /**
     * Handles the generation of trivia categories
     * 
     * This async function:
     * 1. Sets loading state to true
     * 2. Sends a structured prompt to the API
     * 3. Parses the response into category objects
     * 4. Updates state with new categories
     * 5. Triggers fade-in animation
     * 
     * Expected response format: "Category1-Description1|Category2-Description2|..."
     * TODO: Switch to handle a JSON response.
     */
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
                                    onPress={() => {
                                        if (onCategorySelect) {
                                            onCategorySelect(cat.name, cat.description);
                                        } else {
                                            router.push({pathname: '/choice_component', params: { category: cat.name, description: cat.description} });
                                        }
                                    }}>
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

/**
 * StyleSheet for TriviaCategoriesScreen
 * 
 * Defines the visual styling for all components in the screen:
 * - Container: Consistent pastel background with centered content
 * - Cards: Consistent tile color as other screens
 * - Row layout: Flexbox for 2-column grid arrangement
 * - Typography: Bold, dark text for readability
 * - Spacing: Consistent margins and padding throughout
 */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fdf6f0', // soft pastel background (matches other screens)
        paddingHorizontal: 16,
        paddingTop: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    card: {
        flex: 1,
        backgroundColor: '#fff7e0', // same tile color as other screens
        marginHorizontal: 6,
        borderRadius: 12,
        padding: 16,
        minHeight: 140,
        alignItems: 'center',
        justifyContent: 'center',

        // shadow for iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,

        // elevation for Android
        elevation: 3,
    },
    text: {
        fontSize: 16,
        fontWeight: '700',
        color: '#333',
        textAlign: 'center',
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

export default TriviaCategoriesScreen;