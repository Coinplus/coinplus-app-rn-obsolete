import React, {useState} from 'react';
// @ts-ignore
import styled from 'styled-components/native';
import colors from '../../utils/colors';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
import {BtcPrice} from './components/BtcPrice';
import {images} from '../../assets';
import Carousel, {ICarouselInstance} from 'react-native-reanimated-carousel';
import {CarItem} from '../selectMode/SelectMode';
import {PAGE_WIDTH} from '../../utils';

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

export const Wallet = () => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const ref = React.useRef<ICarouselInstance>(null);

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
        <WalletTitle>Wallet</WalletTitle>
        <Icon name="plus" size={23} />
      </View>

      <View>
        <BalanceTitle>Total balance</BalanceTitle>
        <BalanceAmount>$234.01</BalanceAmount>
      </View>
      <Carousel
        {...baseOptions}
        panGestureHandlerProps={{
          activeOffsetX: [-10, 10],
        }}
        pagingEnabled={true}
        snapEnabled={true}
        onScrollEnd={index => setActiveIndex(index)}
        ref={ref}
        loop={true}
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
        mode="parallax"
        style={{width: '100%'}}
        data={[
          {colored: images.coloredSolo, bw: images.coloredSolo},
          {colored: images.bwSoloPro, bw: images.bwSoloPro},
        ]}
        renderItem={({item, index}) => (
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              width: 261,
              borderColor: 'white',
            }}>
            <CarItem
              isActive={activeIndex === index}
              index={index}
              item={item.colored}
            />
          </View>
        )}
      />
      <BtcPrice />
    </WalletWrapper>
  );
};
