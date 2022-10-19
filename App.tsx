import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home} from './src/screens/home/Home';
import {SafeAreaView, Text} from 'react-native';
import {SelectMode} from './src/screens/selectMode/SelectMode';
import {FormFactor} from './src/screens/formFactor/FormFactor';
import {Address} from './src/screens/address/Address';
import {ScanScreen} from './src/screens/QrScanner/QrScanner';
import {Auth} from './src/screens/auth/Auth';
import {Wallet} from './src/screens/wallet/Wallet';
import {retriveCardData, retrivaeAuthData} from './src/utils/store'
import {authenticate} from './src/utils/biometrics'

const Stack = createNativeStackNavigator();

function App() {
const [defaultPage, setDefaultPage] = useState("");
    useEffect(() => {
        retrivaeAuthData().then(dt => {
            if(dt && dt.authEnabled) {
                authenticate().then(res => {
                    if(res) {
                        detectFirstView()
                    } else {
                        authenticate();
                    }
                })
            } else {
                detectFirstView();
            }
        });
    }, []);

    const detectFirstView = () => {
        retriveCardData().then(res => {
            if(res && res.length > 0) {
                setDefaultPage("Wallet")
            } else {
                setDefaultPage("Home")
            }
        })
    }
  return (
      defaultPage === ""  ? <Text/> : <SafeAreaView style={{flex: 1}}>
              <NavigationContainer>
                  <Stack.Navigator
                      initialRouteName={defaultPage}>
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
                          name="QrScanner"
                          component={ScanScreen}
                          options={{
                              title: 'Scan Qr Code',
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
