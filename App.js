import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/home';
import ProfileScreen from './screens/profile';
import Login from './screens/Login';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AddCategory from './screens/addCategory';
import DetailCategory from './screens/detailCategory';
import AddStory from './screens/addStory';
import DetailStory from './screens/detailStory';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerTitleAlign: 'center',
            headerShown: false,
          }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={HomeScreen} options />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="AddCategory" component={AddCategory} />
          <Stack.Screen name="DetailCategory" component={DetailCategory} />
          <Stack.Screen name="AddStory" component={AddStory} />
          <Stack.Screen name="DetailStory" component={DetailStory} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
