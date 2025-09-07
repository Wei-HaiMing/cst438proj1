import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { askChatGPT } from '../lib/chatgpt';

export default function TriviaScreen() {
  const [selected, setSelected] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [question, setQuestion] = useState<string>('');
  const [answers, setAnswers] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { category, description } = useLocalSearchParams();
  const [parsedQuestions, setParsedQuestions] = useState<
  { question: String; answers: string[]; correctIndex: number }[]
  >([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  useEffect(() => {
    const fetchQuestion = async () => {
      setLoading(true);
      const questionAndAnswerPrompt = `Generate 8 fun trivia questions with 4 multiple choice answers each for the following category.

Category: ${category}
Description: ${description}

IMPORTANT: Respond with ONLY a valid JSON array. Each question should be an object with:
- "question": the trivia question (string)
- "answers": array of exactly 4 possible answers (strings)
- "correctIndex": index (0-3) of the correct answer (number)

Example format:
[
  {
    "question": "What is the capital of France?",
    "answers": ["London", "Paris", "Berlin", "Rome"],
    "correctIndex": 1
  }
]

Make the questions engaging and appropriately challenging. Ensure each question has exactly 4 unique answers with only one correct answer.`;
      
      try{
        const response = await askChatGPT(questionAndAnswerPrompt);
        
        // Try to parse JSON response
        let parsed;
        try {
          parsed = JSON.parse(response.trim());
        } catch (jsonError) {
          // Fallback: try to extract JSON from response if it contains extra text
          const jsonMatch = response.match(/\[[\s\S]*\]/);
          if (jsonMatch) {
            parsed = JSON.parse(jsonMatch[0]);
          } else {
            throw new Error('Invalid JSON response from ChatGPT');
          }
        }

        // Validate the parsed data
        const validatedQuestions = parsed.filter((item: any) => {
          return (
            item &&
            typeof item.question === 'string' &&
            Array.isArray(item.answers) &&
            item.answers.length === 4 &&
            typeof item.correctIndex === 'number' &&
            item.correctIndex >= 0 &&
            item.correctIndex < 4 &&
            item.answers.every((answer: any) => typeof answer === 'string' && answer.trim().length > 0)
          );
        });

        if (validatedQuestions.length === 0) {
          throw new Error('No valid questions found in response');
        }

        setParsedQuestions(validatedQuestions);
      } catch (e){
        console.error('Error fetching or parsing questions:', e);
        Alert.alert(
          'Error Loading Questions',
          'Failed to load trivia questions. Please try again.',
          [{ text: 'OK' }]
        );
        setParsedQuestions([]);
      }
      setLoading(false);
    };

    fetchQuestion();
  }, [category, description]);

  const handlePress = (answer: string, index: number) => {
    if (hasAnswered) return;
    setSelected(answer);
    setHasAnswered(true);

    const currentQ = parsedQuestions[currentQuestionIndex];
    const isCorrect = index == currentQ.correctIndex;
    
    if (isCorrect) {
      setScore(score + 1);
    }
    
    setTimeout(() => {
      setSelected(null);
      setHasAnswered(false);
      nextQuestion();
    }, 1000);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < parsedQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelected(null);
    } else {
      // Quiz completed
      Alert.alert(
        'Quiz Complete!',
        `You scored ${score} out of ${parsedQuestions.length} questions!`,
        [{ text: 'OK' }]
      );
    }
  };


  const currentQuestion = parsedQuestions[currentQuestionIndex];

  return (
    <SafeAreaView style={styles.container}>
      {loading ?(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#888" />
          <Text>Loading...</Text>
        </View>
      ): currentQuestion ? (
      <>
      {/* Question Counter and Navigation */}
      <View style={styles.header}>
        <Text style={styles.questionCounter}>
          Question {currentQuestionIndex + 1} of {parsedQuestions.length}
        </Text>
        <Text style={styles.questionCounter}>
          Score: {score} / {currentQuestionIndex + 1}
        </Text>
      </View>

      {/* Question */}
      <Text style={styles.question}>{currentQuestion.question}</Text>

      {/* Answers in a grid */}
      <View style={styles.grid}>
        {currentQuestion.answers.map((answer, index) => {
          const isSelected = selected === answer;
          const isCorrect = index == currentQuestion.correctIndex;
          
          return(
          <TouchableOpacity
            key={answer}
            style={[
              styles.answerBox,
              isSelected ? (isCorrect ? styles.correctAnswer : styles.incorrectAnswer) : {}
            ]}
            onPress={() => handlePress(answer, index)}
            activeOpacity={0.7}
            disabled={hasAnswered}
          >
            <Text style={styles.answerText}>{answer}</Text>
          </TouchableOpacity>
          );  
      })}
      </View>
      </>
      ) : (
        <Text>No questions available.</Text>
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
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  questionCounter: {
    fontSize: 16,
    fontWeight: "500",
    color: "#666",
    marginBottom: 10,
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
  answerText: {
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 8,
  },
  correctAnswer: {
    backgroundColor: "#b6fcb6"
  },
  incorrectAnswer: {
    backgroundColor: '#ffb6b6',
  },

});