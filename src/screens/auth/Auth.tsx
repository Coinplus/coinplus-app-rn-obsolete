import React, {useState} from 'react';
import {View, Text, Image, Switch} from 'react-native';
import {images} from '../../assets';
import styled from 'styled-components/native';
import colors from '../../utils/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {ButtonCp} from '../../components/ButtonCP';

const TitleText = styled.Text`
  font-family: 'Lexend-Regular';
  font-weight: 700;
  font-size: 28px;
  color: ${colors.PRIMARY_TEX};
  text-align: center;
  margin-bottom: 8px;
`;
const DescriptionText = styled.Text`
  font-family: 'Lexend-Regular';
  font-weight: 400;
  font-size: 17px;
  color: ${colors.PRIMARY_TEX};
  text-align: center;
  margin-bottom: 40px;
`;
const FaceIDWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 9px 12px;
  gap: 49px;

  width: 343px;
  background: ${colors.GRAY_BG};
  border-radius: 8px;
  align-self: center;
  margin-bottom: 90;
`;
const FaceIDText = styled.Text`
  font-family: 'Lexend-Regular';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  color: ${colors.PRIMARY_TEX};
`;
const FaceIDDesc = styled.Text`
  font-family: 'Lexend-Regular';
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 18px;
  color: ${colors.PRIMARY_TEX};
`;

export const Auth = props => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <Image
        source={images.authID}
        style={{marginTop: 100, alignSelf: 'center'}}
      />
      <TitleText>Protect your wallet</TitleText>
      <DescriptionText>
        Adding a biometric security will ensure that you are the only one that
        can access your wallet.
      </DescriptionText>
      <FaceIDWrapper>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon name="face" size={28} style={{marginRight: 8}} />
          <View>
            <FaceIDText style={{fontSize: 16, fontWeight: 'bold'}}>
              Face ID
            </FaceIDText>
            <FaceIDDesc>Authentication with Face ID</FaceIDDesc>
          </View>
        </View>

        <Switch
          ios_backgroundColor="#DBDCE1"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </FaceIDWrapper>
      <ButtonCp title={'Next'} style={{alignSelf: 'center'}} />
    </View>
  );
};
