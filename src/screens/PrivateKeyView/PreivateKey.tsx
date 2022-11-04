import React, {useState, useEffect} from 'react';
// @ts-ignore
import styled from 'styled-components/native';
import colors from '../../utils/colors';
import {View, ScrollView, Text, h3} from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
import {PAGE_WIDTH} from '../../utils';
import { retriveCardData, retrivaeAuthData, storeCardData } from "../../utils/store";
import {authenticate} from '../../utils/biometrics';
import {getBitCoinRate, getBalances} from '../../utils/bitcoin';
import 'intl';
import 'intl/locale-data/jsonp/en';
import { ButtonCp } from "../../components/ButtonCP";

const WalletWrapper = styled.View`
  flex: 1;
  background-color: ${colors.WHITE};
  padding: 0 16px;
`;

const WalletTitle = styled.Text`
  font-family: 'Lexend-Regular';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 30px;

  color: ${colors.PRIMARY_TEX};
`;

const BalanceTitle = styled.Text`
  font-family: 'Lexend-Regular';
  font-weight: 600;
  font-size: 16px;
  color: ${colors.TITLE_TEX};
`;
const BalanceAmount = styled.Text`
  font-family: 'Lexend-Regular';
  font-weight: 700;
  font-size: 28px;
  color: ${colors.PRIMARY_TEX};
`;

interface Iwallet {
  navigation: any;
  route: any;
}

export const PrivateKey = ({navigation, route}: Iwallet) => {
  const [privateKey, setPrivateKey] = useState('');
  const [publicKey, setPublicKey] = useState('');
  useEffect(() => {
    let {publicId, privateKey} = route.params;
    setPublicKey(publicId);
    setPrivateKey(privateKey);
  }, []);

  const baseOptions = {
    vertical: false,
    width: PAGE_WIDTH * 0.75,
    height: PAGE_WIDTH / 2,
  } as const;
  return (
    <WalletWrapper>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 30,
        }}>
        <WalletTitle>Your Private key</WalletTitle>
      </View>
      <View style={{color: '#0D2449', width: '100%', height: '100%'}}>
        <Text
          style={{
            color: '#000000',
            width: '100%',
            marginBottom: 17,
            fontSize: 25,
          }}>
          This is your Private Key you can copy it, write it down or save it to
          the application
        </Text>

        <Text
          selectable={true}
          style={{
            padding:10,
            backgroundColor:'#ddddeb',
            color: '#000000',
            width: '100%',
            marginBottom: 17,
            fontSize: 16,
          }}>
          {privateKey}
        </Text>
        <ButtonCp
          style={{
            opacity:  1,
            alignSelf: 'center',
            marginBottom: 16,
          }}
          title="Save"
          onPress={async () => {
            await storeCardData({publicId: publicKey, privateKey: privateKey});
            retrivaeAuthData().then(res => {
              if (!res || !res.authEnabled) {
                navigation.navigate('Auth');
              } else {
                navigation.navigate('Wallet');
              }
            });
          }}
        />
      </View>
    </WalletWrapper>
  );
};
