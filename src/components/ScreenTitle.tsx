import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components/native';

import colors from '../utils/colors';

const ScreenTitleText = styled.Text`
  font-family: 'Lexend-Bold';
  font-size: 32px;
  margin-bottom: 32px;
  margin-top: 25px;
  margin-left: 16px;
  color: ${colors.PRIMARY_TEX};
`;
const TitleWrapper = styled.View`
  padding-left: 16px;
  padding-right: 16px;
`;

interface IScreenTitle {
  title: string;
  navigation: any;
}

export const ScreenTitle = ({title, navigation}: IScreenTitle) => {
  return (
    <TitleWrapper>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="arrow-back-ios" size={24} color={colors.PRIMARY_TEX} />
      </TouchableOpacity>
      <ScreenTitleText>{title}</ScreenTitleText>
    </TitleWrapper>
  );
};
