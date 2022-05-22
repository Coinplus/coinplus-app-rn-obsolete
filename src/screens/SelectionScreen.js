import React, {Component} from 'react';
import {View, StyleSheet, Text,TouchableOpacity} from 'react-native';
import {
  Picker,
  Item,
} from 'native-base';

import {connect} from 'react-redux';
import {
  resetKeysAction,
  updateCurrencyAction,
  updateModeAction,
} from '../redux/reducers/inputs';

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    color: '#1565c0',
    fontSize: 20,
    fontWeight:"bold"
  },
  currencyView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  deviceView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  picker: {
    height: 40,
    width: 180,

    color: '#000000',
  },
  button: {
    padding: 9,
    flexDirection: 'column',
    alignItems: 'center',
  },

  buttonLabel: {
    padding: 8,
    color: '#2c363f',
  },
  mt48: {
    marginTop: 48,
  },
});

class SelectionScreen extends Component {
  componentDidUpdate() {
    const {resetKeys} = this.props;
    resetKeys();
  }

  render() {
    const {
      navigation,
      currency,
      mode,
      updateCurrency,
      updateMode,
    } = this.props;

    const buttonImageHeight = 80;
    const buttonGutter = 48;

    return (
      <View style={{
        flexDirection: "column",
        alignItems:"center",
        justifyContent:"center",
        height: "100%",
        width: "100%"
      }}>
        <View >
          <Text style={styles.title}>1. SELECT CRYPTO</Text>
          <View style={{display:"flex",
          alignItems:"center"}}>
          <Item picker style={styles.picker}>
            <Picker
                mode="dropdown"
                iosHeader="Select crypto"
                selectedValue={currency}
                onValueChange={updateCurrency}
                style={styles.picker}
            >
              <Picker.Item label="Bitcoin BTC" value="btc" />
              <Picker.Item label="Bitcoin Cash BCH" value="bch" />
              <Picker.Item label="Litecoin LTC" value="ltc" />
              <Picker.Item label="Ethereum ETH" value="eth" />
              <Picker.Item label="Tezos XTZ" value="xtz" />
            </Picker>
          </Item>
          </View>
        </View>
        <View>
          <Text style={styles.title}>2. SELECT MODE</Text>
          <View style={{display:"flex",
            alignItems:"center"}}>
          <Item picker style={styles.picker}>
            <Picker
                mode="dropdown"
                iosHeader="Select mode"
                selectedValue={mode}
                onValueChange={updateMode}
                style={styles.picker}
            >
              <Picker.Item label="SOLO simple support" value="simple" />
              <Picker.Item label="SOLO pro 2 of 3" value="pro" />
            </Picker>
          </Item>
          </View>
        </View>
        <View style={{marginTop:50}}>
          <TouchableOpacity
              title={"Continue to setup the card"}
              onPress={() => navigation.navigate('CardFrontInput')}
              style={[
                styles.button,
                {
                  backgroundColor:"#1565c0",
                },
              ]}
          >
            <Text>Continue to setup the card</Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}

export default connect(
    (state) => ({
      currency: state.inputs.currency,
      mode: state.inputs.mode,
    }),
    (dispatch) => ({
      resetKeys: () => {
        dispatch(resetKeysAction());
      },
      updateCurrency: (currency) => {
        dispatch(updateCurrencyAction(currency));
      },
      updateMode: (mode) => {
        dispatch(updateModeAction(mode));
      },
    }),
)(SelectionScreen);
