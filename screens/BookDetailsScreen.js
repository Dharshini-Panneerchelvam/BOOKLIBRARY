import React, { useState, useEffect } from 'react';
import { View, Text, Alert, TouchableOpacity } from 'react-native';
import { collection, getDocs, addDoc, where, query, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import styles from '../styles';

export default function BookDetailsScreen({ route, navigation }) {
  const { book } = route.params;
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [isBorrowed, setIsBorrowed] = useState(false);
  
  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      const borrowedRef = collection(db, 'borrowedBooks');
      const q = query(borrowedRef, where("userId", "==", "user123"));
      const querySnapshot = await getDocs(q);
      const borrowed = querySnapshot.docs.map(doc => doc.data());

      setBorrowedBooks(borrowed);
      setIsBorrowed(borrowed.some(b => b.bookId === book.id));
    };

    fetchBorrowedBooks();
    
    const unsubscribe = navigation.addListener('focus', fetchBorrowedBooks);
    return unsubscribe;
  }, [navigation]);

  const borrowBook = async () => {
    try {
      if (borrowedBooks.length >= 3) {
        Alert.alert("Limit Reached", "You cannot borrow more than 3 books.");
        return;
      }
      if (isBorrowed) {
        Alert.alert("Already Borrowed", "You cannot borrow the same book twice.");
        return;
      }
  
      // Attempt to add the book to borrowedBooks collection
      const docRef = await addDoc(collection(db, 'borrowedBooks'), {
        userId: 'user123',  // Replace with actual user ID
        bookId: book.id,    // Ensure this is the correct book ID
        title: book.title,  // Make sure `book.title` is available
        borrowedAt: new Date().toISOString(), // Optionally track when the book was borrowed
      });
      console.log("Book added to borrowedBooks with ID: ", docRef.id); // Log document ID
  
      // Update Firestore book availability
      const bookRef = doc(db, 'books', book.id);
      await updateDoc(bookRef, { available: false });
  
      setIsBorrowed(true);
      Alert.alert("Success", "Book borrowed successfully!");
      navigation.navigate('CheckedOutBooks');
    } catch (error) {
      console.error("Error borrowing book:", error);
      Alert.alert("Error", "Failed to borrow the book.");
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{book.title}</Text>
      <Text style={styles.authorText}>Author: {book.author}</Text>
      <Text style={styles.authorDsc}>{book.description}</Text>

      <TouchableOpacity 
        style={[styles.button, isBorrowed && { backgroundColor: 'gray' }]}
        onPress={borrowBook}
        disabled={isBorrowed}
      >
        <Text style={styles.buttonText}>{isBorrowed ? "Borrowed" : "Borrow"}</Text>
      </TouchableOpacity>
    </View>
  );
}
