import React from 'react';
import styled from 'styled-components/native';
import colors from '../../../utils/colors';
import Lottie from 'lottie-react-native';
import {View} from 'react-native';

const NfcTextWrapper = styled.View`
  background-color: ${colors.GRAY_BG};
  margin: 0 16px;
  padding: 10px 14px;
  border-radius: 8px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const NfcTextCp = styled.Text`
  font-family: 'Lexend-Medium';
  font-weight: 300;
  font-size: 14px;
  width: 260px;
`;

export const NfcText = () => {
  return (
    <NfcTextWrapper>
      <NfcTextCp>
        Hold your card near the back panel of your Iphone to scan with NFC
      </NfcTextCp>
      <View
        style={{
          backgroundColor: 'white',
          borderRadius: 70,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Lottie
          source={require('./animation.json')}
          autoPlay
          loop
          style={{
            width: 70,
            height: 70,
            left: -4,
          }}
        />
      </View>
    </NfcTextWrapper>
  );
};
