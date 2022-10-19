import React, {useEffect, useState} from 'react';
// @ts-ignore
import styled from 'styled-components/native';
import colors from '../../../utils/colors';
import {Image, Text, View} from 'react-native';
import {images} from '../../../assets';
import {BtcTag} from './BtcTag';
import Icon from 'react-native-vector-icons/AntDesign';
import * as Progress from 'react-native-progress';
import {getBitcoinData} from '../../../utils/bitcoin'

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
  const [lowest, setLowest] = useState(0);
  const [highest, setHighest] = useState(0);
  const [percentChange, setPercentChange] = useState(0);
  const [current, setCurrent] = useState(0);
  useEffect (() => {
    getBitcoinData().then(res => {
      setLowest(res.low);
      setHighest(res.high);
      setPercentChange(res.percent_change);
      setCurrent(res.close);
    })
  }, [])
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
          <BtcUsdPrice>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(current.toFixed(2))}</BtcUsdPrice>
        </BtcInnerRow>
        <BtcInnerRow>
          <BtcFlexRow>
            <BtcTag isActive={true}>Rank #1</BtcTag>
            <BtcTag>Coin</BtcTag>
            {/*<BtcTag>On 3,396,129 watchlists</BtcTag>*/}
          </BtcFlexRow>

          <BtcTag bgColor={percentChange > 0 ? colors.GREEN : colors.PRIMARY_RED} color={colors.WHITE} fontSize="16px">
            <Icon name={percentChange > 0 ? 'caretup' : 'caretdown'} size={10} /> {percentChange.toFixed(2).toLocaleString('en-US')}%
          </BtcTag>
        </BtcInnerRow>
        <View style={{marginTop: 10}}>
          <BtcInnerRow>
            <BtcFlexRow>
              <BtcLowHighText>Low:</BtcLowHighText>
              <BtcLowHighValueText>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(lowest.toFixed(2))}</BtcLowHighValueText>
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
              <BtcLowHighValueText>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(highest.toFixed(2))}</BtcLowHighValueText>
            </BtcFlexRow>
          </BtcInnerRow>
        </View>
      </BtcPriceWrapper>
    </Wrapper>
  );
};
