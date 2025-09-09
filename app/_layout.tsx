import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    /* Wraps the whole app in GestureHandlerRootView
    Required for react-native-gesture-handler to work correctly */
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SQLiteProvider
        databaseName = "userDatabase.db"
        onInit={async (db) => {
          //Runs when the database is initialized
          await db.execAsync(`
            CREATE TABLE IF NOT EXISTS users (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              name TEXT NOT NULL,
              password TEXT NOT NULL
            );
            PRAGMA journal_mode=WAL;
          `);
        }}
        options={{ useNewConnection: false}} //Reuse connection instead of creating a new one
      >
        <Stack />
      </SQLiteProvider>
    </GestureHandlerRootView>
  );
}
