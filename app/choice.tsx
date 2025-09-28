import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Animated,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { askChatGPT } from '../lib/chatgpt';

export default function TriviaScreen() {
  // Tracks which answer the user has selected
  const [selected, setSelected] = useState<string | null>(null);

  // Makes sure the user can’t keep pressing answers after choosing one
  const [hasAnswered, setHasAnswered] = useState(false);

  // Score counter (just keeps going up as they get answers right)
  const [score, setScore] = useState(0);

  // Loading state while we wait for questions
  const [loading, setLoading] = useState<boolean>(true);

  // Category and description passed in from the Categories screen
  const { category, description } = useLocalSearchParams();

  // Stores the full set of parsed questions
  const [parsedQuestions, setParsedQuestions] = useState<
    { question: String; answers: string[]; correctIndex: number }[]
  >([]);

  // Tracks where we’re at in the quiz (which question number)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  // Fade animation for when a new question comes in
  // Starts at 0 (invisible) → animates to 1 (fully visible)
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // ------------------ Fetching questions ------------------
  useEffect(() => {
    const fetchQuestion = async () => {
      setLoading(true);

      // This prompt asks for 8 questions in JSON format only
      const questionAndAnswerPrompt = `Generate 8 fun trivia questions with 4 multiple choice answers each for the following category.

Category: ${category}
Description: ${description}

IMPORTANT: Respond with ONLY a valid JSON array. Each question should be an object with:
- "question": string
- "answers": array of 4 strings
- "correctIndex": number (0-3)`;

      try {
        const response = await askChatGPT(questionAndAnswerPrompt);

        // Sometimes the response wraps JSON in extra text → try to clean it
        const jsonMatch = response.match(/\[[\s\S]*\]/);
        const parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : JSON.parse(response);

        // Sanity check: make sure each item has what we expect
        const validated = parsed.filter((item: any) =>
          item &&
          typeof item.question === 'string' &&
          Array.isArray(item.answers) &&
          item.answers.length === 4
        );

        setParsedQuestions(validated);
      } catch (e) {
        console.error('Error fetching questions:', e);
        Alert.alert('Error', 'Could not load trivia questions.');
      }
      setLoading(false);
    };

    fetchQuestion();
  }, [category, description]);

  // ------------------ Fade-in effect when switching questions ------------------
  useEffect(() => {
    // Reset opacity to 0 every time we move to a new question
    fadeAnim.setValue(0);

    // Animate to full visibility over half a second
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start();
  }, [currentQuestionIndex]);

  // ------------------ Answer selection logic ------------------
  const handlePress = (answer: string, index: number) => {
    if (hasAnswered) return; // Don’t allow double-clicking
    setSelected(answer);
    setHasAnswered(true);

    // Check if answer is correct
    const currentQ = parsedQuestions[currentQuestionIndex];
    const isCorrect = index === currentQ.correctIndex;
    if (isCorrect) setScore(score + 1);

    // Wait a second so user sees the green/red feedback before moving on
    setTimeout(() => {
      setSelected(null);
      setHasAnswered(false);
      nextQuestion();
    }, 1000);
  };

  // ------------------ Move to the next question ------------------
  const nextQuestion = () => {
    if (currentQuestionIndex < parsedQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Quiz completed
      setModalVisible(true);
    }
  };

  // Grab the question we’re currently on
  const currentQuestion = parsedQuestions[currentQuestionIndex];

  // ------------------ Render ------------------
  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        // Loading spinner while we wait for questions
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#888" />
          <Text>Loading...</Text>
        </View>
      ) : currentQuestion ? (
        // Animated wrapper → fades questions in/out
        <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
          {/* Question counter + Score at the top */}
          <View style={styles.header}>
            <Text style={styles.questionCounter}>
              Question {currentQuestionIndex + 1} / {parsedQuestions.length}
            </Text>
            <Text style={styles.questionCounter}>
              Score: {score}
            </Text>
          </View>

          {/* The trivia question itself */}
          <Text style={styles.question}>{currentQuestion.question}</Text>

          {/* The 4 possible answers displayed in a grid of cards */}
          <View style={styles.grid}>
            {currentQuestion.answers.map((answer, index) => {
              const isSelected = selected === answer;
              const isCorrect = index === currentQuestion.correctIndex;

              return (
                <TouchableOpacity
                  key={answer}
                  style={[
                    styles.card,
                    isSelected ? (isCorrect ? styles.correct : styles.incorrect) : {}
                  ]}
                  onPress={() => handlePress(answer, index)}
                  activeOpacity={0.8} // gives a nice press feedback
                  disabled={hasAnswered}
                >
                  <Text style={styles.answerText}>{answer}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </Animated.View>
      ) : (
        <Text>No questions available.</Text>
      )}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Quiz Complete!</Text>
            <View style={styles.scoreContainer}>
              <Text style={styles.scoreLabel}>Your Score:</Text>
              <Text style={styles.scoreValue}>{score} / {parsedQuestions.length}</Text>
              <Text style={styles.scorePercentage}>
                {Math.round((score / parsedQuestions.length) * 100)}%
              </Text>
            </View>
            
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={styles.playAgainButton}
                onPress={() => { setModalVisible(false); router.push('/trivia_categories'); }}
                activeOpacity={0.8}
              >
                <Text style={styles.playAgainButtonText}>Play Again</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.homeButton}
                onPress={() => { setModalVisible(false); router.push('/'); }}
                activeOpacity={0.8}
              >
                <Text style={styles.homeButtonText}>Home</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// ------------------ Styles ------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdf6f0",  // pastel background → same as Categories screen
    padding: 20,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  questionCounter: {
    fontSize: 16,
    fontWeight: "500",
    color: "#666",
    marginBottom: 6,
  },
  question: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 30,
    color: "#333",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  card: {
    width: 140,
    height: 140,
    backgroundColor: "#fff7e0",  // same tile color as category cards
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,

    // subtle shadow so cards pop off the background
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 3,
  },
  answerText: {
    fontSize: 16,
    textAlign: "center",
    color: "#333",
  },
  correct: {
    backgroundColor: "#b6fcb6", // green when correct
  },
  incorrect: {
    backgroundColor: "#ffb6b6", // red when wrong
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    width: "90%",
    maxWidth: 320,
    padding: 30,
    backgroundColor: "#fdf6f0",
    borderRadius: 20,
    alignItems: "center",
    
    // Enhanced shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  scoreContainer: {
    alignItems: "center",
    marginBottom: 30,
    backgroundColor: "#fff7e0",
    padding: 20,
    borderRadius: 15,
    width: "100%",
  },
  scoreLabel: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
  },
  scoreValue: {
    fontSize: 32,
    fontWeight: "700",
    color: "#333",
    marginBottom: 8,
  },
  scorePercentage: {
    fontSize: 18,
    fontWeight: "600",
    color: "#66a8ff",
  },
  modalButtons: {
    width: "100%",
    gap: 12,
  },
  playAgainButton: {
    backgroundColor: "#66a8ff",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 12,
    alignItems: "center",
    
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  playAgainButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  homeButton: {
    backgroundColor: "#f7c873",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 12,
    alignItems: "center",
    
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  homeButtonText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "600",
  },
});