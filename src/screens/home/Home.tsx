import React, {useEffect} from 'react';
import {Image, TouchableOpacity, View, Text} from 'react-native';
import {images} from '../../assets';
import {ButtonCp} from '../../components/ButtonCP';
import styled from 'styled-components/native';
import colors from '../../utils/colors';
import {NfcText} from '../address/components/NfcText';
import {retriveCardData} from '../../utils/store'

const HomeWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  background-color: ${colors.WHITE};
`;

const HelloText = styled.Text`
  font-family: 'Lexend-Bold';
  font-size: 24px;
  color: ${colors.PRIMARY_TEX};
`;
const SecondaryText = styled.Text`
  font-family: 'Lexend-Regular';
  font-size: 17px;
  color: ${colors.PRIMARY_TEX};
`;

interface IHome {
  navigation: any;
}



export const Home = ({navigation}: IHome) => {
  return (
    <HomeWrapper>
      <Image
        source={images.logo}
        style={{width: 165, height: 32, marginBottom: 162}}
      />
      <HelloText>Hello!</HelloText>
      <SecondaryText style={{marginBottom: 32}}>
        Let’s connect your first card
      </SecondaryText>
      <View style={{marginBottom: 128}}>
        <NfcText />
      </View>
      <ButtonCp
        title="QR scan"
        width="180px"
        style={{marginBottom: 17}}
        onPress={() =>
          navigation.navigate('QrScanner', {
            prevScreen: 'Home',
            nextScreen: 'Address',
          })
        }
      />
      <Text style={{marginBottom: 17, fontSize: 13}}>Or</Text>
      <TouchableOpacity
        style={{marginBottom: 57, backgroundColor: 'white'}}
        onPress={() => navigation.navigate('SelectMode')}>
        <Text>Fill in manually</Text>
      </TouchableOpacity>
    </HomeWrapper>
  );
};
