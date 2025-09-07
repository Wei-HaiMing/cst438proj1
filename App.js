// import { SQLiteProvider } from "expo-sqlite";
// import UserForm from "./UserForm";
// import UserList from "./UserList";

// export default function App() {
//   return (
//     <SQLiteProvider
//       databaseName="userDatabase.db"
//       onInit={async (db) => {
//         await db.execAsync(`
//           CREATE TABLE IF NOT EXISTS users (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             name TEXT NOT NULL,
//             password TEXT NOT NULL
//           );
//           PRAGMA journal_mode = WAL;
//         `);
//       }}
//       options={{ useNewConnection: false }}
//     >
//       <UserForm />
//       <UserList />
//     </SQLiteProvider>
//   );
// }