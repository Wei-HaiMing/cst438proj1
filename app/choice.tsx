import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function TriviaScreen() {
  const [selected, setSelected] = useState<string | null>(null);

  const question = "What is the capital of California?";
  const answers = ["San Jose", "Los Angeles", "Sacramento", "San Diego"];

  const handlePress = (answer: string) => {
    setSelected(answer);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Question */}
      <Text style={styles.question}>{question}</Text>

      {/* Answers in a grid */}
      <View style={styles.grid}>
        {answers.map((answer) => (
          <TouchableOpacity
            key={answer}
            style={[
              styles.answerBox,
              selected === answer && styles.selectedAnswer,
            ]}
            onPress={() => handlePress(answer)}
            activeOpacity={0.7}
          >
            <Text style={styles.answerText}>{answer}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f2f2f2",
  },
  question: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 30,
    textAlign: "center",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 20, 
  },
  answerBox: {
    width: 140,
    height: 140,
    backgroundColor: "white",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    elevation: 3, 
    shadowColor: "#000", 
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  selectedAnswer: {
    borderColor: "green",
    backgroundColor: "#e6ffe6",
  },
  answerText: {
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 8,
  },
});