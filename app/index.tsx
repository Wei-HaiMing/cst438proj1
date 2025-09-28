import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const router = useRouter();
  const [channel, setChannel] = useState('1');
  const [showMultiplayerInput, setShowMultiplayerInput] = useState(false);

  const handleMultiplayerClick = () => {
    setShowMultiplayerInput(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome to Trivia!</Text>
      <Text style={styles.subtitle}>Choose your game mode below</Text>
      
      <TouchableOpacity 
        style={styles.mainButton}
        onPress={() => router.push('/trivia_categories')}
        activeOpacity={0.8}
      >
        <Text style={styles.mainButtonText}>Single Player</Text>
      </TouchableOpacity>

      {!showMultiplayerInput ? (
        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={handleMultiplayerClick}
          activeOpacity={0.8}
        >
          <Text style={styles.secondaryButtonText}>Multiplayer</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.multiplayerContainer}>
          <Text style={styles.inputLabel}>Enter Channel Number:</Text>
          <TextInput
            style={styles.textInput}
            keyboardType="numeric"
            value={channel}
            onChangeText={setChannel}
            placeholder="Enter number"
          />
          <TouchableOpacity 
            style={styles.enterButton}
            onPress={() => router.push(`/channel/${channel}`)}
            activeOpacity={0.8}
          >
            <Text style={styles.enterButtonText}>Enter Channel</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity 
        style={styles.loginButton}
        onPress={() => router.push('/login')}
        activeOpacity={0.8}
      >
        <Text style={styles.loginButtonText}>Go To Login</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdf6f0",  // pastel background consistent with other screens
    paddingHorizontal: 20,
    paddingTop: 40,
    justifyContent: "center",
    alignItems: "center",
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
    marginBottom: 40,
  },
  mainButton: {
    backgroundColor: "#66a8ff",
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 12,
    marginBottom: 20,
    width: 200,
    alignItems: "center",
    
    // shadow for consistency
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 3,
  },
  mainButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  secondaryButton: {
    backgroundColor: "#fff7e0",  // same tile color as category cards
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 12,
    marginBottom: 20,
    width: 200,
    alignItems: "center",
    
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 3,
  },
  secondaryButtonText: {
    color: "#333",
    fontWeight: "600",
    fontSize: 16,
  },
  multiplayerContainer: {
    backgroundColor: "#fff7e0",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    width: 250,
    alignItems: "center",
    
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 3,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 10,
  },
  textInput: {
    height: 40,
    width: 100,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    textAlign: "center",
    backgroundColor: "white",
  },
  enterButton: {
    backgroundColor: "#66a8ff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  enterButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: "#f7c873",  // same color as random category button
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
  },
  loginButtonText: {
    color: "#333",
    fontWeight: "600",
    fontSize: 16,
  },
});
