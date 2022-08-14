import React, {useState} from 'react';
import {Image, View} from 'react-native';
import colors from '../../utils/colors';
import styled from 'styled-components/native';
import * as Progress from 'react-native-progress';
import {ScreenTitle} from '../../components/ScreenTitle';
import {images} from '../../assets';
import {PAGE_WIDTH} from '../../utils';
import {ButtonCp} from '../../components/ButtonCP';

const SelectFormWrapper = styled.View`
  flex: 1;
  background-color: ${colors.WHITE};
  justify-content: space-between;
`;
const FormFactorWrapper = styled.View`
  margin-top: 85px;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;
const SingleFormFactor = styled.TouchableOpacity`
  align-items: center;
  justify-content: space-between;
  height: 145px;
`;
const FormFactorTitle = styled.Text`
  font-family: 'Lexend-Light';
  font-weight: 300;
  font-size: 17px;
  color: ${colors.PRIMARY_TEX};
`;
const FooterText = styled.Text`
  font-family: 'Lexend-Light';
  font-weight: 400;
  font-size: 17px;
  color: ${colors.SECONDARY_TEX};
  text-align: center;
  padding: 0 16px;
  margin-bottom: 32px;
`;
const ProgressBarWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 0 16px;
  margin-bottom: 24px;
`;

interface IFormFactor {}

export const FormFactor = ({navigation}: IFormFactor) => {
  const [formFactor, setFormFactor] = useState(null);
  const navigateToFillAddress = (type: string) => {
    if (type === 'card') {
      navigation.navigate('Address');
    }
  };
  return (
    <SelectFormWrapper>
      <View>
        <ScreenTitle title="Select form factor" navigation={navigation} />
        <FormFactorWrapper>
          <SingleFormFactor onPress={() => navigateToFillAddress('card')}>
            <Image source={images.formCard} />
            <FormFactorTitle>Card</FormFactorTitle>
          </SingleFormFactor>
          <SingleFormFactor onPress={() => navigateToFillAddress('bar')}>
            <Image source={images.formBar} />
            <FormFactorTitle>Bar</FormFactorTitle>
          </SingleFormFactor>
        </FormFactorWrapper>
      </View>
      <View>
        <FooterText>Choose a desired form for your Coinplus wallet</FooterText>
        <ProgressBarWrapper>
          <Progress.Bar
            progress={1}
            width={PAGE_WIDTH * 0.3}
            color={colors.GRAY}
            height={4}
          />
          <Progress.Bar
            progress={1}
            width={PAGE_WIDTH * 0.55}
            color={colors.PRIMARY_TEX}
            height={4}
          />
        </ProgressBarWrapper>
        <ButtonCp style={{opacity: 0}} title="next" onPress={() => null} />
      </View>
    </SelectFormWrapper>
  );
};
