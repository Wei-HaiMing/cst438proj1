import { useState } from 'react';
import { StyleSheet, View } from "react-native";
import { useRouter } from 'expo-router';
import { Text, TouchableOpacity, Pressable, TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "react-native";

export default function Index() {
  const router = useRouter();
  const [channel, setChannel] = useState('1');
  const [showMultiplayerInput, setShowMultiplayerInput] = useState(false);

  const handleMultiplayerClick = () => {
    setShowMultiplayerInput(true);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      
      <View style={{ backgroundColor: 'white' }}>
        <TouchableOpacity onPress={() => router.push('/trivia_categories')}>
          <Text>Welcome to Trivia!</Text>
        </TouchableOpacity>
      </View>

      <View style={{ backgroundColor: 'grey', marginTop: 16 }}>
        {showMultiplayerInput ? (
          <View>
            <TextInput
              style={{
                height: 40,
                width: 100,
                borderColor: 'grey',
                borderWidth: 1,
                marginBottom: 16,
                textAlign: 'center',
              }}
              keyboardType="numeric"
              value={channel}
              onChangeText={setChannel}
              placeholder="Enter number"
            />
            <TouchableOpacity onPress={() => router.push(`/channel/${channel}`)}>
              <Text>Enter</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity onPress={handleMultiplayerClick}>
            <Text>Multiplayer</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* <Pressable
        onPress={() => router.push('/login')}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
            borderColor: pressed ? 'green' : 'blue',
            borderWidth: 1,
          },
          styles.wrapperCustom,
        ]}
      >
        {({ pressed }) => (
          <Text style={styles.text}>{pressed ? 'Pressed!' : 'Press Me'}</Text>
        )}
      </Pressable> */}
              <TouchableOpacity onPress={() => router.push('/trivia_categories')}>
                  <Text>Welcome to Trivia!</Text>
              </TouchableOpacity>
            <Button title="Go To Login" onPress={() => router.push('/login')} />

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
