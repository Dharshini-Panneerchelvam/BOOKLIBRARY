import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Button } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import styles from '../styles';

export default function HomeScreen({ navigation }) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ marginRight: 15 }}>
          <Button title="Return" onPress={() => navigation.navigate('CheckedOutBooks')}  color="#5b408b" />
        </View>
      ),
    });

    const fetchBooks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'books'));

        if (querySnapshot.empty) {
          console.log("No books found in Firestore.");
        } else {
          const bookList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setBooks(bookList);
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Our Book Collection 📚</Text>
      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.bookItem} onPress={() => navigation.navigate('Book Insights', { book: item })}>
            <Text style={styles.bookTitle}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
