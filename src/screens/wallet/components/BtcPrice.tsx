import React from 'react';
// @ts-ignore
import styled from 'styled-components/native';
import colors from '../../../utils/colors';
import {Image, Text, View} from 'react-native';
import {images} from '../../../assets';
import {BtcTag} from './BtcTag';
import Icon from 'react-native-vector-icons/AntDesign';
import * as Progress from 'react-native-progress';

const Wrapper = styled.View`
  flex: 1;
  background-color: ${colors.WHITE};
  margin-top: 25px;
`;
const CurrentPriceText = styled.Text`
  font-family: 'Lexend-Regular';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  color: ${colors.TITLE_TEX};
  margin-bottom: 12px;
`;
const BtcPriceWrapper = styled.View`
  height: 139px;
  background: #ffffff;
  border: 1px solid rgba(94, 102, 138, 0.2);
  border-radius: 8px;
  padding: 12px;
`;

const BtcInnerRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const BtcFlexRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

const BtcTitle = styled.Text`
  font-family: 'Lexend-Regular';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  color: ${colors.BLACK};
  margin: 0 8px;
`;

const BtcUsdPrice = styled.Text`
  font-family: 'Lexend-Regular';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  color: ${colors.PRIMARY_TEX};
`;

const BtcLowHighText = styled.Text`
  font-family: 'Lexend-Regular';
  font-weight: 500;
  font-size: 12px;
  color: ${colors.TITLE_TEX};
  margin-right: 2px;
`;
const BtcLowHighValueText = styled.Text`
  font-family: 'Lexend-Regular';
  font-weight: 600;
  font-size: 12px;
  color: ${colors.PRIMARY_TEX};
`;
const ProgressBarWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
export const BtcPrice = () => {
  return (
    <Wrapper>
      <CurrentPriceText>Current price</CurrentPriceText>
      <BtcPriceWrapper>
        <BtcInnerRow>
          <BtcFlexRow>
            <Image source={images.btcIcon} />
            <BtcTitle>Bitcoin</BtcTitle>
            <BtcTag>BTC</BtcTag>
          </BtcFlexRow>
          <BtcUsdPrice>$24,018.65</BtcUsdPrice>
        </BtcInnerRow>
        <BtcInnerRow>
          <BtcFlexRow>
            <BtcTag isActive={true}>Rank #1</BtcTag>
            <BtcTag>Coin</BtcTag>
            <BtcTag>On 3,396,129 watchlists</BtcTag>
          </BtcFlexRow>

          <BtcTag bgColor={colors.GREEN} color={colors.WHITE} fontSize="16px">
            <Icon name="caretup" size={10} /> 1.46%
          </BtcTag>
        </BtcInnerRow>
        <View style={{marginTop: 10}}>
          <BtcInnerRow>
            <BtcFlexRow>
              <BtcLowHighText>Low:</BtcLowHighText>
              <BtcLowHighValueText>$23,657.27</BtcLowHighValueText>
            </BtcFlexRow>
            <View style={{justifyContent: 'center', marginBottom: 10}}>
              <Text
                style={{
                  textAlign: 'center',
                  color: colors.TITLE_TEX,
                  fontSize: 10,
                  marginBottom: 4,
                }}>
                24h
              </Text>
              <ProgressBarWrapper>
                <Progress.Bar
                  progress={1}
                  width={50}
                  color={colors.BUTTON_PRIMARY_OP_TEXT}
                  height={3}
                />
                <Progress.Bar
                  progress={1}
                  width={50}
                  color={colors.GRAY3}
                  height={3}
                />
              </ProgressBarWrapper>
            </View>
            <BtcFlexRow>
              <BtcLowHighText>High:</BtcLowHighText>
              <BtcLowHighValueText>$24,406.19</BtcLowHighValueText>
            </BtcFlexRow>
          </BtcInnerRow>
        </View>
      </BtcPriceWrapper>
    </Wrapper>
  );
};
