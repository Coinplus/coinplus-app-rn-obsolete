import React, { Fragment } from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import color from 'color';

import { StyleProvider } from 'native-base';

import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/material';

import createStore from './redux';
import StackNavigator from './navigation/router';

const store = createStore();

// eslint-disable-next-line react/display-name
export default () => (
  <Provider store={store}>
    <StyleProvider style={getTheme(material)}>
      <Fragment>
        <StatusBar
          barStyle="light-content"
          backgroundColor={color('#1565c0').darken(0.2).hex()}
        />
        <StackNavigator />
      </Fragment>
    </StyleProvider>
  </Provider>
);
