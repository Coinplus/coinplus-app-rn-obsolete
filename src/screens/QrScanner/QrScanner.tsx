import React, {useEffect} from 'react';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';

interface IScanner {
  navigation: any;
  route: any;
}

export const ScanScreen = ({navigation, route}: IScanner) => {
  let addData: any;
  let previouse: any;
  let next: any;

  useEffect(() => {
    let {prevScreen, nextScreen, additionalData} = route.params;
    previouse = prevScreen;
    next = nextScreen;
    addData = additionalData;
  }, [route.params]);

  const onSucsess = (res: any) => {
    let dt = res.data;
    console.log(dt);
    if (dt.includes('http')) {
      let dtar = dt.split('/');
      dt = dtar[dtar.length - 1];
    }
    navigation.navigate(next, {additionalData: addData, data: dt});
  };
  return (
    <QRCodeScanner
      fadeIn={true}
      reactivate={true}
      reactivateTimeout={5000}
      showMarker={true}
      onRead={onSucsess}
      flashMode={RNCamera.Constants.FlashMode.off}
      topContent={
        <Text style={styles.centerText}>Please scan QR code from the card</Text>
      }
      bottomContent={
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(previouse, {additionalData: addData});
          }}
          style={styles.buttonTouchable}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      }
    />
  );
};

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});
