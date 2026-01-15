import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import "./global.css"
import AppNavigation from './src/appNavigation/appNavigation';


export default function App() {
  return (
    <AppNavigation/>
  );
}