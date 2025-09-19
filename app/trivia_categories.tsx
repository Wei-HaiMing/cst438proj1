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
 * - Fun UI improvements (title, emoji icons, random category button)
 * 
 * @author CST-438 Project Team
 * @version 1.1
 * @date Fall 2025
 */

import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { Animated, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import { askChatGPT } from '../lib/chatgpt';
import { useAuth } from '../lib/hooks';

export default function TriviaCategoriesScreen() {
    const router = useRouter(); // navigation hook from expo-router
    const db = useSQLiteContext(); // SQLite database context
    const [categories, setCategories] = useState<{ name: string; description: string}[]>([]); // stores trivia categories
    const [loading, setLoading] = useState(false); // loading state while fetching categories
    const [fadeAnim] = useState(new Animated.Value(0));
    const [isLoggedIn, setIsLoggedIn] = useState(false); // track login state
    const { user, logout } = useAuth();

    // // Check if a user is logged in by querying the UserInfo table. 
    // // If a user is stored in the table, mark the user as logged in
    // const checkUser = async () => {
    //     try {
    //         const users = await db.getAllAsync("SELECT * FROM UserInfo;");
    //         setIsLoggedIn(users.length > 0); // logged in if at least one user exists
    //     } catch (error) {
    //         console.error("Error checking user login:", error);
    //     }
    // };

    // // Run checkUser only once when component mounts
    // useEffect(() => {
    //     checkUser();
    // }, []);

    // /**
    //  * Logout function
    //  * - Clears all users from UserInfo table
    //  * - Updates login state
    //  * - Redirects back to landing page
    //  */
    // const handleLogout = async () => {
    //     try {
    //         await db.execAsync("DELETE FROM UserInfo;"); // removes all users
    //         setIsLoggedIn(false);
    //         router.replace('/'); // go back to landing page
    //     } catch (error) {
    //         console.error("Error logging out:", error);
    //     }
    // };

    // Prompt used to fetch categories from ChatGPT
    // We tell GPT to give us 4 categories with names + descriptions
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
            <Text style={styles.title}>Hello {user?.name}</Text>
            {/* Page Header → helps avoid empty feel */}
            <Text style={styles.title}>🎉 Choose a Trivia Category</Text>
            <Text style={styles.subtitle}>Powered by AI • Pick something fun!</Text>

            {/* Show logout button if someone is logged in */}
            {isLoggedIn && (
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            )}

            {/* If no categories yet, show the Get Categories button */}
            {!categories.length ? (
                <View style={styles.loadingContainer}>
                    <TouchableOpacity 
                        onPress={handleGetCategories} 
                        disabled={loading} 
                        style={styles.getButton}
                    >
                        <Text style={styles.getButtonText}>
                            {loading ? '✨ AI is picking categories...' : 'Get Categories'}
                        </Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <Animated.View style={{ opacity: fadeAnim }}>
                    {/* Render categories in rows of 2 */}
                    {Array.from({ length: Math.ceil(categories.length / 2)}).map((_, rowIdx) => (
                        <View key={rowIdx} style={styles.row}>
                            {categories.slice(rowIdx * 2, rowIdx * 2 + 2).map((cat, idx) => (
                                <TouchableOpacity
                                    key={idx}
                                    style={styles.card}
                                    activeOpacity={0.8}
                                    onPress={() =>
                                        router.push({
                                            pathname: '/choice',
                                            params: { category: cat.name, description: cat.description },
                                        })
                                    }
                                >
                                    {/* Placeholder emoji → could be dynamic later */}
                                    <Text style={styles.cardEmoji}>🎯</Text>
                                    <Text style={styles.cardTitle}>{cat.name}</Text>
                                    <Text style={styles.cardDescription}>{cat.description}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    ))}
                </Animated.View>
            )}

            {/* Footer button to pick a random category (fills the page more) */}
            {categories.length > 0 && (
                <TouchableOpacity 
                    style={styles.randomButton} 
                    onPress={() => {
                        const randomCat = categories[Math.floor(Math.random() * categories.length)];
                        router.push({ 
                            pathname: '/choice', 
                            params: { category: randomCat.name, description: randomCat.description } 
                        });
                    }}
                >
                    <Text style={styles.randomText}>🎲 Random Category</Text>
                </TouchableOpacity>
            )}
        </SafeAreaView>
    );
}

// Stylesheet for how the page is going to be displayed
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdf6f0', // soft pastel background (matches questions screen)
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#333",
    textAlign: "center",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  logoutButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#66a8ff',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    zIndex: 10,
  },
  logoutText: {
    color: 'white',
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  getButton: {
    backgroundColor: "#66a8ff",
    padding: 14,
    borderRadius: 10,
  },
  getButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    flex: 1,
    backgroundColor: '#fff7e0',
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
  cardEmoji: {
    fontSize: 28,
    marginBottom: 6,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
  },
  cardDescription: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    marginTop: 4,
  },
  randomButton: {
    backgroundColor: "#f7c873",
    margin: 20,
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  randomText: {
    fontWeight: "600",
    color: "#333",
    fontSize: 16,
  },
});