import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { collection, getDocs, getDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import styles from '../styles';

export default function BorrowedBooksScreen() {
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      const querySnapshot = await getDocs(collection(db, 'borrowedBooks'));
      setBorrowedBooks(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchBorrowedBooks();
  }, []);

  const returnBook = async (bookId, id) => {
    try {
      // Step 1: Delete the borrowed book document
      await deleteDoc(doc(db, 'borrowedBooks', id));
      console.log('Returning book with ID:', bookId);

      // Step 2: Get the corresponding book document from the 'books' collection
      const bookRef = doc(db, 'books', bookId);
      const bookDoc = await getDoc(bookRef);

      // Check if the book document exists
      if (bookDoc.exists()) {
        // Step 3: Update the book availability if the document exists
        await updateDoc(bookRef, { available: true });
        console.log('Book availability updated to true.');

        // Step 4: Refresh the list of borrowed books
        const querySnapshot = await getDocs(collection(db, 'borrowedBooks'));
        setBorrowedBooks(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } else {
        console.error('Book document not found in books collection.');
        Alert.alert('Error', 'The book document was not found.');
      }
    } catch (error) {
      console.error('Error returning book:', error);
      Alert.alert('Error', 'Failed to return the book.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Borrowed Books</Text>
      <FlatList
        data={borrowedBooks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.bookItem}>
            <Text style={styles.bookTitle}>{item.title}</Text>
            <TouchableOpacity 
              style={styles.returnButton} 
              onPress={() => returnBook(item.bookId, item.id)}
            >
              <Text style={styles.returnButtonText}>Return</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
