// import { useSQLiteContext } from 'expo-sqlite';
// import { useEffect, useState } from 'react';
// import { ActivityIndicator, FlatList, RefreshControl, Text, View } from 'react-native';

// const UserList = () => {
//     const[users, setUsers] = useState([]);
//     const[isLoading, setIsLoading] = useState(false);
//     const db = useSQLiteContext();

//     const loadUsers = async () => {
//         try{
//             setIsLoading(true);
//             const results = await db.getAllAsync('SELECT * FROM users ORDER BY id DESC');
//             setUsers(results); 
//         }catch(error){
//             console.error('Database error:', error);
//         }finally{
//             setIsLoading(false);
//         }
//     };

//     useEffect(() => {
//         loadUsers();
//     }, []);

//     if(isLoading){
//         return <ActivityIndicator size="large" color="#0000ff" />;
//     }

//     return(
//         <FlatList 
//             data={users}
//             refreshControl={
//                 <RefreshControl refreshing={isLoading} onRefresh={loadUsers} tintColor="#007AFF" />
//             }
//             keyExtractor={(item) => item.id.toString()}
//             renderItem={({ item }) => (
//                 <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
//                     <Text>{`${item.name}`}</Text>
//                     <Text>{item.password}</Text>
//                 </View>
//             )}
//             ListEmptyComponent={<Text>No users found</Text>}
//         />
//     );
// };

// export default UserList;

import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

const UserList = () => {
  const db = useSQLiteContext();
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    try {
      const results = await db.getAllAsync("SELECT * FROM users;");
      setUsers(results);
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