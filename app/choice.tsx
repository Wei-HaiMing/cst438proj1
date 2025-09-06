import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { askChatGPT } from '../lib/chatgpt';

export default function TriviaScreen() {
  const [selected, setSelected] = useState<string | null>(null);
  const [question, setQuestion] = useState<string>('');
  const [answers, setAnswers] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { category, description } = useLocalSearchParams();
  
  useEffect(() => {
    const fetchQuestion = async () => {
      setLoading(true);
      const questionAndAnswerPrompt = `Come up with a fun trivia question and four answers to the following category and its discription. Category: ${category}.  
                                    Desciption: ${description}.  Your response should strictly follow the following format: 
                                    (question)|(answer#1)-(answer#2)-ect. 
                                    Where '|' seperates the question and the answers, and '-' seperates questions, and '()'
                                    is just a place holder so DO NOT include parenthesis '()' or '#' in your response`;
      
      try{
        const response = await askChatGPT(questionAndAnswerPrompt);
        const [q, answersUnformated] = response.split('|');
        setQuestion(q?.trim() || '');
        setAnswers(answersUnformated?.split('-').map((a: string) => a.trim()) || []);
      } catch (e){
        setQuestion('Failed to load question.');
        setAnswers([]);
      }
      setLoading(false);
    };

    fetchQuestion();
  }, [category, description]);

  const handlePress = (answer: string) => {
    setSelected(answer);
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading ?(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#888" />
          <Text>Loading...</Text>
        </View>
      ):(
      <>
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
      </>
      )}
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