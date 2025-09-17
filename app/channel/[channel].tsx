import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import TriviaScreen from "../../components/choice_component";
import TriviaCategoriesScreen from "../../components/trivia_categories_component";

import { createClient, RealtimeChannel } from '@supabase/supabase-js';
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;
const client = createClient(supabaseUrl, supabaseAnonKey);

const Page = () => {
    const { channel } = useLocalSearchParams();
    const [broadcastChannel, setBroadcastChannel] = useState<RealtimeChannel | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<{category: string, description: string} | null>(null);

    useEffect(() => {
        if(!channel || isConnected ) return;

        const newChannel = client.channel(`drawing-${channel}`);
        setBroadcastChannel(newChannel);

        const subscription = newChannel.on('broadcast', {event: 'click'}, ({payload}) => {
            console.log('Received click event', payload);
        }).subscribe((status) =>{
            if (status === 'SUBSCRIBED')
                setIsConnected(true);
        });


        return () => {
            subscription.unsubscribe();
            newChannel.unsubscribe();
        }
    }, [channel])

    const onTriviaClick = (questionNum: number, score: number) => {
        // console.log("Trivia question: ", questionNum, ". Current score: ", score);
        broadcastChannel?.send({
            type: 'broadcast',
            event: 'click',
            payload: { questionNum, score}
        })
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
            {isConnected && (
            selectedCategory ? (
                <TriviaScreen 
                onClick={onTriviaClick}
                category={selectedCategory.category}
                description={selectedCategory.description}
                onBackToCategories={handleBackToCategories}
                />
            ) : (
                <TriviaCategoriesScreen onCategorySelect={handleCategorySelect} />
            )
            )}
        </View>
    )
}
export default Page
