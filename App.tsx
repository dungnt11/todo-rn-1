import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useFonts} from 'expo-font';
import AppLoading from 'expo-app-loading';
import axios from './helpers/axios';

// Screens
import {LoginScreen} from './screens/Login';
import {SignUpScreen} from './screens/SignUp';
import {TodoMainScreen} from "./screens/TodoMain";
import {user} from "./stores/jwt";

const Stack = createNativeStackNavigator();

function App() {
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    user.setJwtLocalStorage().then(() => {
      setLoading(false);
    });
  }, []);

  const [loaded] = useFonts({
    popPin: require('./assets/fonts/Poppins-Regular.ttf'),
    popPinBold: require('./assets/fonts/Poppins-SemiBold.ttf'),
  });
  if (!loaded || loading) return <AppLoading/>;

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
      >
        <Stack.Screen
          options={{headerShown: false, gestureEnabled: false}}
          name="TodoMainScreen"
          component={TodoMainScreen}
        />
        <Stack.Screen
          options={{headerShown: false, gestureEnabled: false}}
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          options={{headerShown: false, gestureEnabled: false}}
          name="SignUp"
          component={SignUpScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;