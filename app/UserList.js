import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

const UserList = () => {
    //Access the SQLite database context
  const db = useSQLiteContext();
  // Local state to hold the list of users fetched from the database
  const [users, setUsers] = useState([]);

  //Function to fetch all users from the "users" table
  const loadUsers = async () => {
    try {
      const results = await db.getAllAsync("SELECT * FROM UserInfo;");
      setUsers(results); //update state so UI re-renders with new data
    } catch (error) {
      console.error("Error loading users:", error);
    }
  };

  // Load users when component mounts
  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registered Users:</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text style={styles.item}>
            {item.name} — {item.password}
          </Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  item: {
    padding: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
});

export default UserList;