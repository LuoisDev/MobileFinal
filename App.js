import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProfileScreen from './screens/profile';
import Login from './screens/Login';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AddCategory from './screens/addCategory';
import DetailCategory from './screens/detailCategory';
import AddStory from './screens/addStory';
import DetailStory from './screens/detailStory';
import {Provider} from 'react-redux';

const Stack = createNativeStackNavigator();
import {store} from './redux/store';
import MyWeb from './screens/webview';
import MyStory from './screens/myStory';
import MyTabs from './tabbar';
import CartScreen from './screens/cart';
import Register from './screens/register';
import MyDetailStory from './screens/myDetailStory';
export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerTitleAlign: 'center',
              headerShown: false,
            }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Tabs" component={MyTabs} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Cart" component={CartScreen} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="AddCategory" component={AddCategory} />
            <Stack.Screen name="DetailCategory" component={DetailCategory} />
            <Stack.Screen name="AddStory" component={AddStory} />
            <Stack.Screen name="DetailStory" component={DetailStory} />
            <Stack.Screen name="MyDetailStory" component={MyDetailStory} />
            <Stack.Screen name="MyWeb" component={MyWeb} />
            <Stack.Screen name="MyStory" component={MyStory} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
}
