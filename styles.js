import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#cd98ba' 
  },
  title: { 
    fontSize: 30, 
    fontWeight: 'bold', 
    marginBottom: 20, 
    color:'#582563' 
  },
  authorText: {
    marginBottom: 10, 
  },
  authorDsc: {
    marginBottom: 20, 
    padding: 20,
  },
  button: {
    width: 150, 
    backgroundColor: '#5b408b', 
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    alignSelf: 'center', 
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bookItem: {
    flexDirection: 'row',  // Arrange title and button in a row
    justifyContent: 'space-between',  // Space between title and button
    alignItems: 'center',  // Vertically align title and button
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#ead1dc',
    borderRadius: 8,
  },
  bookTitle: {
    fontSize: 18,
    flex: 1,  // Allow the title to take as much space as possible
  },
  returnButton: {
    backgroundColor: '#5b408b',  // Tomato color for the button
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  returnButtonText: {
    color: '#fff',
    fontSize: 14,  // Adjust the size of the button text
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headerTitleStyle: {
    color: '#5b408b',
    fontSize: 24,
    fontWeight: 'bold',
  }
});
