import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Container, Content} from 'native-base';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {connect} from 'react-redux';
import {
  updatePublicKeyAction,
  updateDestinationAddressAction,
  updateKey1Action,
  updateKey2Action
} from '../redux/reducers/inputs';

import parseScannedCode from '../util/scannedCodeParser';

const styles = StyleSheet.create({
  zeroContainer: {
    height: 0,
    flex: 0,
  },
  cameraContainer: {
    flex: 1,
  },
});

// eslint-disable-next-line require-jsdoc
class QRScanScreen extends Component {
  constructor(props) {
    super(props);
    this.onSuccess = this.onSuccess.bind(this);
  }

  onSuccess(e) {
    console.log('Scanned');
    const {
      navigation,
      updatePublicKey,
      updateDestinationAddress,
      updateKey1,
      updateKey2
    } = this.props;
    const {qrtype, callback} = navigation.state.params;
    try {
      const data = parseScannedCode(e.data);
      if (qrtype === 'card') {
        updatePublicKey(data);
      } else if (qrtype === 'destination') {
        updateDestinationAddress(data);
      } else if(qrtype === 'secret1') {
        updateKey1(data);
      } else if(qrtype === 'secret2') {
        updateKey2(data);
      }
      if (typeof(callback) !== 'undefined') {
        callback(publicKey);
      }
    } finally {
      navigation.goBack();
    }
  }

  render() {
    return (
      <Container>
        <Content contentContainerStyle={{flexGrow: 1}}>
          <QRCodeScanner
            onRead={this.onSuccess}
            cameraStyle={styles.cameraContainer}
            topViewStyle={styles.zeroContainer}
            bottomViewStyle={styles.zeroContainer}
            fadeIn={false}
            cameraProps={{
              captureAudio: false,
            }}
          />
        </Content>
      </Container>
    );
  }
}

export default connect(
    null,
    (dispatch) => ({
      updatePublicKey: (key) => {
        dispatch(updatePublicKeyAction(key));
      },
      updateDestinationAddress: (key) => {
        dispatch(updateDestinationAddressAction(key));
      },
      updateKey1: (key) => {
        dispatch(updateKey1Action(key))
      },
      updateKey2: (key) => {
        dispatch(updateKey2Action(key))
      }
    }),
)(QRScanScreen);
