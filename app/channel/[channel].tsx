import { Stack, useLocalSearchParams } from "expo-router";
import { useState } from 'react';
import { View } from 'react-native';
import TriviaScreen from "../../components/choice_component";
import TriviaCategoriesScreen from "../../components/trivia_categories_component";

const Page = () => {
    const { channel } = useLocalSearchParams();
    const [selectedCategory, setSelectedCategory] = useState<{category: string, description: string} | null>(null);

    const onTriviaClick = (questionNum: number, score: number) => {
        console.log("Trivia question: ", questionNum, ". Current score: ", score);
        // Here you can broadcast to Supabase or handle the game state
    }

    const handleCategorySelect = (category: string, description: string) => {
        setSelectedCategory({ category, description });
    }

    const handleBackToCategories = () => {
        setSelectedCategory(null);
    }

    return (
        <View style={{ flex:1, backgroundColor: 'white' }}>
            <Stack.Screen options={{ title: `Channel ${channel}` }} />
            {selectedCategory ? (
                <TriviaScreen 
                    onClick={onTriviaClick}
                    category={selectedCategory.category}
                    description={selectedCategory.description}
                    onBackToCategories={handleBackToCategories}
                />
            ) : (
                <TriviaCategoriesScreen onCategorySelect={handleCategorySelect} />
            )}
        </View>
    )
}
export default Page
