import React, {useState} from 'react';
import {
  View,
  Image,
  Easing,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';
// @ts-ignore
import styled from 'styled-components/native';
import {ScreenTitle} from '../../components/ScreenTitle';
import colors from '../../utils/colors';
import {ButtonCp} from '../../components/ButtonCP';
import {images} from '../../assets';
import FlipView from '../../components/FlipView';
import {CardOption} from '../selectMode/components/CardOption';

const SelectFormWrapper = styled.View`
  flex: 1;
  background-color: ${colors.WHITE};
  justify-content: space-between;
`;
const CardFrontTouchable = styled.TouchableOpacity`
  position: relative;
  width: 302px;
  height: 168px;
  overflow: hidden;
  justify-content: flex-end;
  align-self: center;
`;
//
// const ProgressBarWrapper = styled.View`
//   flex-direction: row;
//   justify-content: space-between;
//   padding: 0 16px;
//   margin-bottom: 24px;
// `;
//
// const EnterAddressText = styled.Text`
//   font-family: 'Lexend-Regular';
//   font-weight: 300;
//   font-size: 17px;
//   color: ${colors.SECONDARY_TEX};
//   text-align: center;
//   margin-bottom: 8px;
// `;
// const OrText = styled.Text`
//   font-family: 'Lexend-Regular';
//   font-weight: 300;
//   font-size: 14px;
//   color: ${colors.SECONDARY_TEX};
//   text-align: center;
//   margin-bottom: 8px;
// `;
//
// const BtnText = styled.Text`
//   font-family: 'Lexend-Medium';
//   font-weight: 300;
//   font-size: 17px;
//   color: ${colors.SECONDARY_TEX};
//   text-align: center;
//   margin-left: 8px;
// `;

const BalanceText = styled.Text`
  font-family: 'Lexend-Medium';
  font-weight: 400;
  font-size: 13px;
  color: ${colors.WHITE};
  margin-left: 8px;
  position: absolute;
  top: 47px;
`;
const BalanceValue = styled.Text`
  font-family: 'Lexend-Medium';
  font-weight: 300;
  font-size: 14px;
  color: ${colors.WHITE};
  margin-left: 8px;
  position: absolute;
  top: 63px;
`;
//
// const QrScan = styled.TouchableOpacity`
//   color: ${colors.BUTTON_PRIMARY_OP_TEXT};
//   background-color: ${colors.BUTTON_PRIMARY_OP};
//   text-align: center;
//   align-items: center;
//   flex-direction: row;
//   justify-content: center;
//   padding: 10px 20px;
//   width: 137px;
//   border-radius: 42px;
//   align-self: center;
//   margin-bottom: 51px;
// `;

const AddressInput = styled.TextInput`
  background-color: ${props => (props.isInFocus ? colors.WHITE : colors.WHITE)};
  height: 40px;
  padding: 10px;
  margin-bottom: 32px;
  letter-spacing: 0.5px;
`;

const SecretInput1 = styled.TextInput`
  background-color: white;
  height: 56px;
  width: 146px;
  padding: 10px;
  margin-bottom: 32px;
  letter-spacing: 0.5px;
  position: absolute;
  top: 30px;
`;
const SecretInput2 = styled.TextInput`
  background-color: white;
  height: 56px;
  width: 146px;
  padding: 10px;
  margin-bottom: 32px;
  letter-spacing: 0.5px;
  position: absolute;
  top: 30px;
  right: 0;
`;

interface IAddress {}

export const Address = ({navigation}: IAddress) => {
  const [title, setTitle] = useState('Your Card');
  const [address, onAddressChange] = React.useState(
    'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
  );
  const [balance, setBalance] = useState('0.0');
  const [secret1, setSecret1] = useState('');
  const [secret2, setSecret2] = useState('7279xstw2vemznyj4t3ymrc64jyssc');
  const [isAddressinFoucs, toggleAddressFocus] = React.useState(false);
  const [isFlipped, setFlipped] = useState(false);

  return (
    <SelectFormWrapper>
      <View>
        <ScreenTitle title={title} navigation={navigation} />
        <View style={{height: 162, marginBottom: 32}}>
          <FlipView
            style={{flex: 1, alignItems: 'center'}}
            isFlipped={isFlipped}
            front={
              <View>
                <CardFrontTouchable style={{position: 'relative'}}>
                  <Image
                    source={images.cardAddress}
                    style={{position: 'absolute', left: 0, top: 0}}
                  />
                  <BalanceText>Balance</BalanceText>
                  <BalanceValue>{balance} BTC</BalanceValue>
                  <AddressInput
                    autoFocus={false}
                    isInFocus={isAddressinFoucs}
                    onChangeText={onAddressChange}
                    value={address}
                    placeholder="Address"
                    onFocus={() => toggleAddressFocus(true)}
                    onBlur={() => toggleAddressFocus(false)}
                  />
                </CardFrontTouchable>
              </View>
            }
            back={
              <View style={{alignItems: 'center'}}>
                <TouchableOpacity style={{position: 'relative'}}>
                  <Image source={images.cardAddressBack} />
                  <SecretInput1
                    placeholder="Secret 1"
                    value={secret1}
                    onChangeText={setSecret1}
                    multiline={true}
                    maxLength={30}
                  />
                  <SecretInput2
                    placeholder="Secret 2"
                    value={secret2}
                    onChangeText={setSecret2}
                    multiline={true}
                    maxLength={30}
                  />
                </TouchableOpacity>
              </View>
            }
            onFlipped={val => {
              return null;
            }}
            flipAxis="y"
            flipEasing={Easing.out(Easing.ease)}
            flipDuration={500}
            perspective={1000}
          />
        </View>
        <View style={{paddingHorizontal: 16}}>
          <CardOption
            title="SOLO simple support"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Velit adipiscing interdum odio purus."
            isActive={false}
          />
          <Text style={{color: '#AFB2C4', marginTop: 34, marginBottom: 64}}>
            Your SOLO Card is easy to transport. Put it in your pocket or wallet
          </Text>
          {!isFlipped && (
            <ButtonCp
              style={{
                opacity: address ? 1 : 0,
                alignSelf: 'center',
                marginBottom: 16,
              }}
              title="Save"
              onPress={() => navigation.navigate('Auth')}
            />
          )}
          <ButtonCp
            style={{
              opacity: address ? 1 : 0,
              alignSelf: 'center',
              marginBottom: 16,
            }}
            disabled={(!secret1 || !secret2) && isFlipped}
            title="Redeem"
            onPress={() => {
              setTitle('Fill in secret fields');
              setFlipped(true);
            }}
          />

          <TouchableOpacity
            onPress={() =>
              isFlipped ? setFlipped(false) : navigation.goBack()
            }>
            <Text style={{textAlign: 'center'}}>Back</Text>
          </TouchableOpacity>
        </View>
        {/*//TODO the code below was from the previous iteration and can be used*/}
        {/*<EnterAddressText>Enter an address on your card</EnterAddressText>*/}
        {/*<OrText>Or</OrText>*/}
        {/*<QrScan>*/}
        {/*  <Icon name="line-scan" size={17} />*/}
        {/*  <BtnText>Scan</BtnText>*/}
        {/*</QrScan>*/}
        {/*<NfcText />*/}
      </View>
      <View>
        {/*// TODO code bellow can be used again, this was from previous iteration */}
        {/*<ProgressBarWrapper>*/}
        {/*  <Progress.Bar*/}
        {/*    progress={1}*/}
        {/*    width={PAGE_WIDTH * 0.3}*/}
        {/*    color={colors.GRAY}*/}
        {/*    height={4}*/}
        {/*  />*/}
        {/*  <Progress.Bar*/}
        {/*    progress={1}*/}
        {/*    width={PAGE_WIDTH * 0.55}*/}
        {/*    color={colors.PRIMARY_TEX}*/}
        {/*    height={4}*/}
        {/*  />*/}
        {/*</ProgressBarWrapper>*/}
        {/*<ButtonCp*/}
        {/*  style={{opacity: address ? 1 : 0, alignSelf: 'center'}}*/}
        {/*  title="Next"*/}
        {/*  onPress={() => null}*/}
        {/*/>*/}
      </View>
    </SelectFormWrapper>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  LinearGradientStyle: {
    height: 50,
    borderRadius: 10,
    height: 50,
    width: '80%',
  },

  ChildViewStyle: {
    borderWidth: 1,
    borderColor: '#028b53',
    width: '100%',
    height: 50,
    borderRadius: 10,
  },

  TextInputStyleClass: {
    textAlign: 'center',
    height: 50,
    width: '90%',
  },
});
