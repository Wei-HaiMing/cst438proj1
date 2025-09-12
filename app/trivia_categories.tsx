/**
 * Trivia Categories Screen Component
 * 
 * This screen allows users to choose what category they want to choose for the trivia game.
 * The categories are generated via the OpenAI API, which makes categories not static.
 * 
 * Features:
 * - AI-powered category generation via ChatGPT API
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
import { useState, useEffect } from 'react';
import { Animated, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import { askChatGPT } from '../lib/chatgpt';

export default function TriviaCategoriesScreen() {
    const router = useRouter(); // navigation hook from expo-router
    const db = useSQLiteContext(); // SQLite database context
    const [categories, setCategories] = useState<{ name: string; description: string}[]>([]); // stores trivia categories
    const [loading, setLoading] = useState(false); // loading state while fetching categories
    const [fadeAnim] = useState(new Animated.Value(0));
    const [isLoggedIn, setIsLoggedIn] = useState(false); // track login state

    // Check if a user is logged in by querying the UserInfo table. 
    // If a user is stored in the table, mark the user as logged inn 
    const checkUser = async () => {
        try {
            const users = await db.getAllAsync("SELECT * FROM UserInfo;");
            setIsLoggedIn(users.length > 0); // logged in if at least one user exists
        } catch (error) {
            console.error("Error checking user login:", error);
        }
    };

    // Run checkUser only once when component mounts
    useEffect(() => {
        checkUser();
    }, []);

    /**
     * Logout function
     * - Clears all users from UserInfo table
     * - Updates login state
     * - Redirects back to landing page
     */
    const handleLogout = async () => {
        try {
            await db.execAsync("DELETE FROM UserInfo;"); // removes all users
            setIsLoggedIn(false);
            router.replace('/'); // go back to landing page
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    const chatPrompt = `Come up with 4 fun trivia categories.  Your response should strictly follow the following format:
                            (first category's name)-(discription)|(second category's name)-(discription)|ect.
                            Where '-' seperates a category's name and discription, and '|' seperates categories, and '()'
                            is just a place holder so DO NOT include parenthesis '()' in your response`;

    /**
     * Fetches categories from ChatGPT and updates state
     * - Sets loading while fetching
     * - Splits response string into categories
     * - Animates fade-in effect once data is loaded
     */
    const handleGetCategories = async () => {
        setLoading(true);
        const response = await askChatGPT(chatPrompt);
        // Convert raw response into {name, description} objects
        const categories = response.split('|').map((cat: string) => {
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
            {isLoggedIn && (
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            )}

            {!categories.length ? (
                <View style={styles.card}>
                    <TouchableOpacity onPress={handleGetCategories} disabled={loading}>
                        <Text style={styles.text}>{loading ? 'Loading...' : 'Get Categories'}</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <Animated.View style={{ backgroundColor: 'white', margin: 8, borderRadius: 8, opacity: fadeAnim }}>
                    {Array.from({ length: Math.ceil(categories.length / 2)}).map((_, rowIdx) => (
                        <View key={rowIdx} style={styles.row}>
                            {categories.slice(rowIdx * 2, rowIdx * 2 + 2).map((cat, idx) => (
                                <TouchableOpacity
                                    key={idx}
                                    style={styles.card}
                                    onPress={() => router.push({ pathname: '/choice', params: { category: cat.name, description: cat.description } })}
                                >
                                    <Text style={styles.text}>{cat.name}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    ))}
                </Animated.View>
            )}
        </SafeAreaView>
    );
}

//Stylesheet for how the page is going to be displayed
const styles = StyleSheet.create({
    logoutButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: '#66a8ff',
        padding: 8,
        borderRadius: 6,
        zIndex: 10,
    },
    logoutText: {
        color: 'white',
        fontWeight: 'bold',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 8,
    },
    card: {
        backgroundColor: '#f7c873',
        padding: 16,
        marginHorizontal: 8,
        borderRadius: 8,
        alignItems: 'center',
    },
    text: {
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#f5a7a7ff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});