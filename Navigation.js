import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import BookDetailsScreen from './screens/BookDetailsScreen';
import BorrowedBooksScreen from './screens/BorrowedBooksScreen';

const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome to the Book Haven!"    screenOptions={{
          headerTintColor: '#5b408b',  // Change the back arrow and title color here
        }}>
        <Stack.Screen
          name="Welcome to the Book Haven!"
          component={HomeScreen}
          options={{
            headerTitleStyle: {
              color: '#5b408b',  // Change the title color here (Tomato color in this case)
            },
          }}
        />
        <Stack.Screen name="Book Insights" component={BookDetailsScreen}  options={{
            headerTitleStyle: {
              color: '#5b408b',  // Change the title color here (Tomato color in this case)
            },
          }} />
        <Stack.Screen name="CheckedOutBooks" component={BorrowedBooksScreen}  options={{
            headerTitleStyle: {
              color: '#5b408b',  // Change the title color here (Tomato color in this case)
            },
          }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
