import React, {useState, useEffect} from 'react';
// @ts-ignore
import styled from 'styled-components/native';
import colors from '../../utils/colors';
import {View } from "react-native";
import Icon from 'react-native-vector-icons/Octicons';
import {BtcPrice} from './components/BtcPrice';
import {images} from '../../assets';
import Carousel, {ICarouselInstance} from 'react-native-reanimated-carousel';
import {CarItem} from '../selectMode/SelectMode';
import {PAGE_WIDTH} from '../../utils';
import {retriveCardData, retrivaeAuthData} from '../../utils/store';
import {authenticate} from '../../utils/biometrics';
import {getBitCoinRate, getBalances} from '../../utils/bitcoin';
import 'intl';
import 'intl/locale-data/jsonp/en';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

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

export const Wallet = ({navigation, route}: Iwallet) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const ref = React.useRef<ICarouselInstance>(null);
  const [data, setData] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [bitcoinRate, setBitcoiRate] = useState(0);
  const [overAllBalance, setOverAllBalance] = useState(0);
  const calculateBalance = (bitcoinRate: number) => {
    var balance = 0;
    let addr = data.map(i => i.publicId);
    if (addr.length > 0) {
      getBalances(addr).then(res => {
        let d = res.addresses;
        d.push({handlesAddCard: true});
        setAddresses(d);
        d.forEach((dt: {address: string; final_balance: number}) => {
          if (dt.address) {
            balance += dt.final_balance * bitcoinRate;
          }
        });
        setOverAllBalance(balance);
      });
    }
  };

  useEffect(() => {
    getBitCoinRate().then(res => {
      setBitcoiRate(res.toNumber());
      calculateBalance(res.toNumber());
    });
  }, [data]);
  useEffect(() => {
    retrivaeAuthData().then(res => {
      if (res && res.authEnabled) {
        authenticate().then(res => {
          if (res) {
            retriveCardData().then(res => {
              setData(res);
            });
          }
        });
      } else {
        retriveCardData().then(res => {
          setData(res);
        });
      }
    });
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
        <WalletTitle>Wallet</WalletTitle>
        <Icon name="plus" size={23} />
      </View>

      <View>
        <BalanceTitle>Total balance</BalanceTitle>
        <BalanceAmount>
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(overAllBalance.toFixed(2))}
        </BalanceAmount>
      </View>
      {addresses && addresses.length > 0 ? (
        <GestureHandlerRootView>
          <Carousel
            {...baseOptions}
            panGestureHandlerProps={{
              activeOffsetX: [-10, 10],
            }}
            pagingEnabled={true}
            snapEnabled={false}
            onScrollEnd={index => {
              setActiveIndex(index);
            }}
            ref={ref}
            loop={false}
            modeConfig={{
              parallaxScrollingScale: 0.9,
              parallaxScrollingOffset: 50,
            }}
            mode="parallax"
            style={{width: '100%'}}
            data={addresses}
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
                  isSolo={false}
                  // publicId={item.address}
                  balance={item.final_balance}
                  navigation={navigation}
                  item={
                    item.handlesAddCard ? images.soloAdd : images.coloredSolo
                  }
                  handlesAddCard={item.handlesAddCard}
                />
              </View>
            )}
          />
        </GestureHandlerRootView>
      ) : null}
      <BtcPrice />
    </WalletWrapper>
  );
};
