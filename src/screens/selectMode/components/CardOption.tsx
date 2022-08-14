import Icon from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components/native';
import colors from '../../../utils/colors';
import React from 'react';

const SoloCardWrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: flex-start;
  border: 1px solid rgba(94, 102, 138, 0.2);
  padding: 14px 10px 14px 20px;
  border-radius: 8px;
  margin-bottom: 10px;
  background-color: ${(props: {isActive: boolean}) =>
    props.isActive ? colors.BUTTON_PRIMARY : colors.WHITE};
`;

const CardTitle = styled.Text`
  font-family: 'Lexend-Medium';
  font-size: 16px;
  color: ${(props: {isActive: boolean}) =>
    props.isActive ? colors.WHITE : colors.TITLE_TEX};
  margin-bottom: 4px;
`;

const CardBody = styled.Text`
  font-weight: 300;
  font-size: 14px;
  line-height: 18px;
  color: ${(props: {isActive: boolean}) =>
    props.isActive ? colors.WHITE : colors.TITLE_TEX};
`;

const CardTextWrapper = styled.View`
  width: 80%;
`;

const CardIsActiveWrapper = styled.View`
  width: 20%;
  align-items: flex-end;
`;

export const CardOption = ({
  onPress,
  title,
  description,
  isActive,
}: {
  onPress?: () => void;
  title: string;
  description: string;
  isActive: boolean;
}) => {
  return (
    <SoloCardWrapper
      onPress={onPress}
      isActive={isActive}
      style={{
        shadowColor: isActive ? '#000' : '#fff',
        shadowOffset: {
          width: 1,
          height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
      }}>
      <CardTextWrapper>
        <CardTitle isActive={isActive}>{title}</CardTitle>
        <CardBody isActive={isActive}>{description}</CardBody>
      </CardTextWrapper>
      <CardIsActiveWrapper>
        {isActive && <Icon name="check" size={32} color={colors.WHITE} />}
      </CardIsActiveWrapper>
    </SoloCardWrapper>
  );
};
