import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home} from './src/screens/home/Home';
import {SafeAreaView} from 'react-native';
import {SelectMode} from './src/screens/selectMode/SelectMode';
import {FormFactor} from './src/screens/formFactor/FormFactor';
import {Address} from './src/screens/address/Address';
import {Auth} from './src/screens/auth/Auth';
import {Wallet} from './src/screens/wallet/Wallet';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{title: 'My home', headerShown: false}}
          />
          <Stack.Screen
            name="SelectMode"
            component={SelectMode}
            options={{
              title: 'Select Mode',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="FormFactor"
            component={FormFactor}
            options={{
              title: 'Select Form Factor',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Address"
            component={Address}
            options={{
              title: 'Fill in address',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Auth"
            component={Auth}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Wallet"
            component={Wallet}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;
