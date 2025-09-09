
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";
// import { Button, Pressable } from "react-native-gesture-handler";
import { useRouter } from 'expo-router';
import { Pressable, Text } from 'react-native-gesture-handler';

export default function Index() {
  const router = useRouter();
  
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      
            <View 
              style={{ backgroundColor: 'white' }}>

              <TouchableOpacity onPress={() => router.push('/trivia_categories')}>
                  <Text>Welcome to Trivia!</Text>
              </TouchableOpacity>
            </View>
    <Pressable
            onPress={() => router.push('/login')}
            style={({pressed}) => [
            {
                backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
                borderColor: pressed ? 'green' : 'blue',
                borderWidth: 1,
            },
            styles.wrapperCustom,
          ]}>
            {({pressed}) => (
                <Text style={styles.text}>{pressed ? 'Pressed!' : 'Press Me'}</Text>
            )}
        </Pressable>
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  // titleContainer: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   gap: 8,
  // },
  // stepContainer: {
  //   gap: 8,
  //   marginBottom: 8,
  // },
  // reactLogo: {
  //   height: 178,
  //   width: 290,
  //   bottom: 0,
  //   left: 0,
  //   position: 'absolute',
  // },
  // input: {
  //   height: 40,
  //   margin: 12,
  //   borderWidth: 1,
  //   padding: 10,
  // },
  wrapperCustom: {
    borderRadius: 8,
    padding: 6,
  },
  text: {
    fontSize: 16,
  },
});
