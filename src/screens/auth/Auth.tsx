import React, {useState,useEffect} from 'react';
import {View, Text, Image, Switch} from 'react-native';
import {images} from '../../assets';
import styled from 'styled-components/native';
import colors from '../../utils/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {ButtonCp} from '../../components/ButtonCP';
import {getAvailableAuth, authenticate} from '../../utils/biometrics'
import {storeAuthData} from '../../utils/store'
import { BiometryTypes } from 'react-native-biometrics'

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

export const Auth = ({navigation}) => {
    const[authText1, setAuthText1] = useState("");
    const[authText2, setAuthText2] = useState("");
    const[authType, setAuthType] = useState("");
    const[isAuthEnabled, setAuthEnabled] = useState(false);
    useEffect(() => {
        getAvailableAuth().then(res => {
            if (res === BiometryTypes.Biometrics) {
                setAuthText1("Fingerprint")
                setAuthText2("Authentication with Fingerprint")
                setAuthType("Finger")
            }

            if (res === BiometryTypes.TouchID || res === BiometryTypes.FaceID) {
                setAuthText1("Face ID")
                setAuthText2("Authentication with Face ID")
                setAuthType("Face")
            }
        });
    }, [])
  const toggleSwitch = () =>  {
        if(!isAuthEnabled) {
            authenticate().then(res => {
                if(res) {
                    setAuthEnabled(previousState => !previousState);
                }
            })
        } else {
            setAuthEnabled(previousState => !previousState);
        }

  }
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
            {
                authType == "Finger" ?<Icon name="fingerprint" size={28} style={{marginRight: 8}} /> :<Icon name="face" size={28} style={{marginRight: 8}} />
            }
          <View>
            <FaceIDText style={{fontSize: 16, fontWeight: 'bold'}}>
                {authText1}
            </FaceIDText>
            <FaceIDDesc>{authText2}</FaceIDDesc>
          </View>
        </View>

        <Switch
          ios_backgroundColor="#DBDCE1"
          onValueChange={toggleSwitch}
          value={isAuthEnabled}
        />
      </FaceIDWrapper>
      <ButtonCp
        title={'Next'}
        style={{alignSelf: 'center'}}
        onPress={() => {
            storeAuthData({authEnabled:isAuthEnabled})
            navigation.navigate('Wallet')}}
      />
    </View>
  );
};
