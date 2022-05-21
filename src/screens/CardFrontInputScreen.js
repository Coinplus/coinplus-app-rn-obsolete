import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Image,
  Keyboard,
  Dimensions,
  View,
  Platform,
  StyleSheet,
} from 'react-native';
import {
  Container,
  Content,
  Footer,
  FooterTab,
  Input,
  Button,
  Text,
  Item
} from 'native-base';
import {connect} from 'react-redux';
import NfcManager, {Ndef, NfcTech} from 'react-native-nfc-manager';

import {
  resetPublicKeyAction,
  updatePublicKeyAction,
} from '../redux/reducers/inputs';
import parseScannedCode from '../util/scannedCodeParser';
import {isValidAddress} from '../util/generic';

const monospaceFont = Platform.OS === 'android' ? 'monospace' : 'Menlo';

const originalWidth = 680;
const originalHeight = 434;
const ratio = originalWidth / originalHeight;

const adjust = 6;

const input1 = {
  x: 3 - adjust,
  y: 262,
  width: 677 - 3,
  height: 330 - 262,
};

const VERBOSE = true;

const styles = StyleSheet.create({
  view: {
    alignSelf: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    position: 'relative',
  },
  image: {
    maxWidth: '100%',
    maxHeight: '100%',
  },
  item: {
    position: 'absolute',
    backgroundColor: '#fff',
  },
  textInput: {
    fontFamily: monospaceFont,
    fontSize: 14,
    paddingVertical: 0,
    paddingLeft: 20,
    paddingRight: 20,
    textAlignVertical: 'center',
  },
  transparentBackground: {
    backgroundColor: 'transparent',
  },
  colorWhite: {
    color: '#fff',
  },
});

class CardFrontInputScreen extends Component {
  state = {
    bar: {},
    layoutComputed: false,
  };

  constructor(props) {
    super(props);
    props.resetPublicKey();
    this.stateChangedSubscription = null;
  }

  componentDidMount() {
    NfcManager.isSupported().then((supported) => {
      VERBOSE && console.log('NfcManager.isSupported', supported);
      if (supported) {
        this.startNfc();
      }
    });
  }

  componentWillUnmount() {
    if (this.stateChangedSubscription) {
      this.stateChangedSubscription.remove();
    }
    console.log("removed NFC");
    NfcManager.cancelTechnologyRequest();
  }

  handleBar = (event) => {
    this.setState({
      bar: event.nativeEvent.layout,
      layoutComputed: true,
    });
  };

  onTagDiscovered = (tag) => {
    const {updatePublicKey} = this.props;
    VERBOSE && console.log('onTagDiscovered', tag);
    try {
      if (Ndef.isType(tag.ndefMessage[0], Ndef.TNF_WELL_KNOWN, Ndef.RTD_TEXT)) {
        const text = Ndef.text.decodePayload(tag.ndefMessage[0].payload);
        const publicKey = parseScannedCode(text);
        updatePublicKey(publicKey);
      }
      VERBOSE && console.log('is type uri', Ndef.isType(tag.ndefMessage[0], Ndef.TNF_WELL_KNOWN, Ndef.RTD_URI));
      if (Ndef.isType(tag.ndefMessage[0], Ndef.TNF_WELL_KNOWN, Ndef.RTD_URI)) {
        const uri = Ndef.uri.decodePayload(tag.ndefMessage[0].payload);
        const publicKey = parseScannedCode(uri);
        updatePublicKey(publicKey);
      }
    } catch (e) {
      VERBOSE && console.log(e);
    }
  };

  startDetection = async () => {
    VERBOSE && console.log('startDetection');
    // NfcManager.registerTagEvent(
    //     this.onTagDiscovered,
    //     'Hold your device over the SOLO card',
    //     true,
    // );
    try {
      // register for the NFC tag with NDEF in it
      await NfcManager.requestTechnology(NfcTech.Ndef);
      // the resolved tag object will contain `ndefMessage` property
      const tag = await NfcManager.getTag();
      this.onTagDiscovered(tag);
      console.log('Tag found', tag);
      await NfcManager.cancelTechnologyRequest();
      this.startNfc();
    } catch (ex) {
      console.log('Oops!', ex);
    } finally {
      // stop the nfc scanning
      VERBOSE && console.log('restartedDetection');
      await NfcManager.cancelTechnologyRequest();
      // this.startNfc();
    }
  };
  startNfc() {
    NfcManager.start()
        .then(() => {
          VERBOSE && console.log('Platform.OS', Platform.OS );
          if (Platform.OS === 'android') {
            NfcManager.isEnabled().then((enabled) => {
              if (enabled) this.startDetection();
              VERBOSE && console.log('NfcManager.isEnabled', enabled);
            });

            NfcManager.onStateChanged((event) => {
              if (event.state === 'on') {
              // this.setState({ nfcEnabled: true });
                console.log("Started");
                this.startDetection();
              } else if (event.state === 'off') {
              // this.setState({ nfcEnabled: false });
                console.log("Stopped");
                this.stopDetection();
              } else if (event.state === 'turning_on') {
              // do whatever you want
              } else if (event.state === 'turning_off') {
              // do whatever you want
              }
            })
                .then((sub) => {
                  this.stateChangedSubscription = sub;
                })
                .catch((/* err */) => {
                  VERBOSE && console.warn(err);
                });
          } else {
            this.startDetection();
          }
        })
        .catch(() => {});
  }

  render() {
    const {navigation, publicKey, currency, updatePublicKey} = this.props;
    const {bar, layoutComputed} = this.state;

    const isValid = isValidAddress(publicKey, currency);

    const padding = 12;
    const {width: windowWidth, height: windowHeight} = Dimensions.get(
        'window',
    );

    let imageWidth = 0;
    let imageHeight = 0;

    const idealImageWidth = windowWidth - padding * 2;
    const idealImageHeight = windowHeight - padding * 2 - 120; // take header and footer into account

    if (idealImageWidth > idealImageHeight * ratio) {
      imageHeight = idealImageHeight;
      imageWidth = imageHeight * ratio;
    } else {
      imageWidth = idealImageWidth;
      imageHeight = imageWidth / ratio;
    }

    const scale = imageWidth / originalWidth;

    return (
      <Container>
        <Content contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.view}>
            <Image
              source={require('../assets/card-front.png')}
              style={[
                styles.image,
                {
                  width: imageWidth,
                  height: imageHeight,
                },
              ]}
              onLayout={this.handleBar}
            />
            {layoutComputed && (
              <Item
                regular
                success={isValid}
                style={[
                  styles.item,
                  {
                    top: bar.y + input1.y * scale,
                    left: input1.x * scale,
                    width: input1.width * scale,
                    height: input1.height * scale,
                  },
                ]}
              >
                <Input
                  placeholder="Address"
                  onChangeText={updatePublicKey}
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={publicKey}
                  style={styles.textInput}
                />
                <Icon name="qrcode-scan" size={28} color="#000" style={{marginRight:5}}
                      onPress={() => {
                        Keyboard.dismiss();
                        console.log(navigation);
                        navigation.navigate('QRScan', {qrtype: 'card'});
                      }}/>
              </Item>
            )}
          </View>
        </Content>
        <Footer style={styles.transparentBackground}>
          <FooterTab>
            <Button
              primary
              full
              disabled={!isValid}
              onPress={() => {
                Keyboard.dismiss();
                navigation.navigate('Balance');
              }}
            >
              <Text style={styles.colorWhite}>Balance</Text>
            </Button>
          </FooterTab>
          <FooterTab>
            <Button
              primary
              full
              disabled={!isValid}
              onPress={() => {
                Keyboard.dismiss();
                navigation.navigate('CardBackInput');
              }}
            >
              <Text style={styles.colorWhite}>Next</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

export default connect(
    (state) => ({
      publicKey: state.inputs.publicKey,
      currency: state.inputs.currency,
    }),
    (dispatch) => ({
      resetPublicKey: () => {
        dispatch(resetPublicKeyAction());
      },
      updatePublicKey: (key) => {
        dispatch(updatePublicKeyAction(key));
      },
    }),
)(CardFrontInputScreen);
