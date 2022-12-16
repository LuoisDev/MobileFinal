import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/home';
import PerScreen from './screens/personal';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator screenOptions={{headerShown:false}}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={({route}) => ({
          tabBarLabel: 'Trang chủ',
        })}
      />
      <Tab.Screen name="Personal" component={PerScreen} />
    </Tab.Navigator>
  );
}
export default MyTabs;
