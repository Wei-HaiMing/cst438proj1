import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SQLiteProvider
        databaseName = "userDatabase.db"
        onInit={async (db) => {
          await db.execAsync(`
            CREATE TABLE IF NOT EXISTS users (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              name TEXT NOT NULL,
              password TEXT NOT NULL
            );
            PRAGMA journal_mode=WAL;
          `);
        }}
        options={{ useNewConnection: false}}
      >
        <Stack />
      </SQLiteProvider>
    </GestureHandlerRootView>
  );
  // return <Stack />;
}
