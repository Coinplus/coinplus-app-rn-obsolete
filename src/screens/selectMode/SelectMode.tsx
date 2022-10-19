import React, {useEffect, useRef, useState} from 'react';
// @ts-ignore
import styled from 'styled-components/native';
import {View, Image, Animated, Text, TouchableOpacity} from 'react-native';
import * as Progress from 'react-native-progress';
import {Grayscale} from 'react-native-color-matrix-image-filters';
import {ScreenTitle} from '../../components/ScreenTitle';
import colors from '../../utils/colors';
import Carousel, {ICarouselInstance} from 'react-native-reanimated-carousel';
import {window} from '../../utils';
import {images} from '../../assets';
import {CardOption} from './components/CardOption';
import {ButtonCp} from '../../components/ButtonCP';

const SelectModeWrapper = styled.View`
  flex: 1;
  background-color: ${colors.WHITE};
  justify-content: space-between;
`;

const CardsWrapper = styled.View`
  flex-direction: column;
  margin-bottom: 32px;
  padding: 0 16px;
`;

const FooterText = styled.Text`
  font-family: 'Lexend-Medium';
  font-weight: 400;
  font-size: 13px;
  color: ${colors.TITLE_TEX};
  opacity: 0.5;
  padding: 0 16px;
  margin-bottom: 30px;
`;

const ProgressBarWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 0 16px;
`;

interface ISelectMode {
  navigation: any;
}
export const PAGE_WIDTH = window.width;

export const SelectMode = ({navigation}: ISelectMode) => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const ref = React.useRef<ICarouselInstance>(null);

  const baseOptions = {
    vertical: false,
    width: PAGE_WIDTH * 0.75,
    height: PAGE_WIDTH / 2,
  } as const;
  const changeSoloMode = (index: number) => {
    if (ref.current && index !== activeIndex) {
      if (activeIndex !== -1 || index !== 0) {
        ref.current.next();
      }
      setActiveIndex(index);
    }
  };
  return (
    <SelectModeWrapper>
      <View>
        <ScreenTitle title="Select mode" navigation={navigation} />
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
            {colored: images.coloredSolo, bw: images.bwSolo},
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
        <CardsWrapper>
          <CardOption
            onPress={() => changeSoloMode(0)}
            title="SOLO simple support"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Velit adipiscing interdum odio purus."
            isActive={activeIndex === 0}
          />
          <CardOption
            onPress={() => changeSoloMode(1)}
            title="SOLO pro 2 of 3"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Velit adipiscing interdum odio purus."
            isActive={activeIndex === 1}
          />
        </CardsWrapper>
      </View>
      <View>
        <FooterText>
          Your SOLO Card is easy to transport. Put it in your pocket or wallet
        </FooterText>
        <ProgressBarWrapper>
          <Progress.Bar
            progress={1}
            width={PAGE_WIDTH * 0.55}
            color={colors.PRIMARY_TEX}
            height={4}
          />
          <Progress.Bar
            progress={1}
            width={PAGE_WIDTH * 0.3}
            color={colors.GRAY}
            height={4}
          />
        </ProgressBarWrapper>
        <ButtonCp
          onPress={() => navigation.navigate('FormFactor', {activeIndex})}
          title="Next"
          style={{
            opacity: activeIndex === -1 ? 0 : 1,
            justifyContent: 'center',
            marginTop: 24,
          }}
        />
      </View>
    </SelectModeWrapper>
  );
};

// TODO: get rid of any type

export const CarItem = ({
                            publicId,
                            onClick,
                            isActive,
                            item,
                            index,
                            isSolo,
                            balance
}: {
  isActive: boolean;
  item: any;
  index: number;
  isSolo: boolean;
  publicId: string;
  onClick: any;
    balance:number
}) => {
  const fadeAnim = useRef(new Animated.Value(1)).current; // Initial value for opacity: 0
  const fadeAnimLogo = useRef(new Animated.Value(1)).current; // Initial value for opacity: 0
  const translateAnim2 = useRef(new Animated.Value(0)).current;
  const translateAnim3 = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (index === 1 && isActive) {
      setTimeout(() => {
        translateTo2(40);
        translateTo3(80);
        fadeOut(0);
        fadeOutLogo(0);
      }, 300);
    } else {
      translateTo2(0);
      translateTo3(0);
      fadeOut(1);
      fadeOutLogo(1);
    }
  }, [isActive, index]);

  const fadeOut = (number: number) => {
    Animated.timing(fadeAnim, {
      toValue: number,
      duration: 120,
      useNativeDriver: false,
    }).start();
  };
  const fadeOutLogo = (number: number) => {
    Animated.timing(fadeAnimLogo, {
      toValue: number,
      duration: 120,
      useNativeDriver: false,
    }).start();
  };
  const translateTo2 = (number: number) => {
    Animated.timing(translateAnim2, {
      toValue: number,
      duration: number ? 500 : 500,
      useNativeDriver: false,
    }).start();
  };
  const translateTo3 = (number: number) => {
    Animated.timing(translateAnim3, {
      toValue: number,
      duration: number ? 500 : 500,
      useNativeDriver: false,
    }).start();
  };
  return !isSolo ? (
    <View>
      {!isActive ? (
        <Grayscale>
          <Image source={item} />
        </Grayscale>
      ) : (
          <View>
        <Image source={item} />
              {publicId ?
              <View style={{
              position: 'absolute',
                  bottom: 20,
              left: 20}}>
                  <Text style={{fontSize: 13,
                      fontWeight: "bold",}}>Balance</Text>
                  <Text style={{fontSize: 13,}}>BTC {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(balance.toFixed(5))}</Text>
              </View>: null}
          </View>
      )}

    </View>
  ) : (
    <View
      style={{
        position: 'relative',
        overflow: 'hidden',
        height: 162,
        borderRadius: 10,
        shadowColor: '#fff',
        shadowOffset: {
          width: 1,
          height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 99999,
      }}>
      <Image source={item} />
      <Animated.Image
        source={item}
        style={{
          zIndex: 9999999,
          elevation: 9,
          opacity: fadeAnim,
          position: 'absolute',
        }}
      />
      <Animated.Image
        source={images.cpTransparentLogo}
        style={{
          zIndex: 9999999,
          elevation: 9,
          opacity: fadeAnimLogo,
          position: 'absolute',
          left: 14,
          top: isActive ? 60 : 57,
        }}
      />
      <Animated.Image
        source={images.soloSimpleNumber2}
        style={[{position: 'absolute', top: 40}]}
      />
      <Animated.Image
        source={images.soloSimpleNumber3}
        style={[
          {position: 'absolute', marginTop: 40},
          {
            top: translateAnim2,
          },
        ]}
      />
      <Animated.Image
        source={images.soloSimpleNumber4}
        style={[
          {position: 'absolute', marginTop: 40},
          {
            top: translateAnim3,
          },
        ]}
      />
    </View>
  );
};
