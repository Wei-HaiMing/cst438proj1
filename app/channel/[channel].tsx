import { Stack, useLocalSearchParams } from "expo-router";
import { View } from 'react-native';
import TriviaCategoriesScreen from "../../components/trivia_categories_component";

const Page = () => {
    const { channel } = useLocalSearchParams();
    return (
        <View style={{ flex:1, backgroundColor: 'white' }}>
            <Stack.Screen options={{ title: `Channel ${channel}` }} />
            <TriviaCategoriesScreen />
        </View>
    )
}
export default Page
