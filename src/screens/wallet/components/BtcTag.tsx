import React from 'react';
// @ts-ignore
import styled from 'styled-components/native';
import colors from '../../../utils/colors';

const BtcTagWrapper = styled.View`
  padding: 2px 4px;
  background: ${(props: {isActive: boolean; bgColor: string}) =>
    props.isActive
      ? colors.GRAY2
      : props.bgColor
      ? props.bgColor
      : colors.GRAY3};
  border-radius: ${(props: {bgColor: string}) =>
    props.bgColor ? '4px' : '2px'};
  align-self: center;
  justify-self: center;
  margin-right: 5px;
`;
const BtcTagText = styled.Text`
  font-family: 'Lexend-Regular';
  font-style: normal;
  font-weight: 600;
  font-size: ${(props: {fontSize: string}) =>
    props.fontSize ? props.fontSize : '10px'};
  color: ${(props: {isActive: boolean; color: string}) =>
    props.isActive
      ? colors.WHITE
      : props.color
      ? props.color
      : colors.TITLE_TEX};
  justify-self: center;
`;

interface IBtcTag {
  children: any;
  isActive?: boolean;
  bgColor?: string;
  color?: string;
  fontSize?: string;
}

export const BtcTag = ({
  children,
  isActive,
  bgColor,
  color,
  fontSize,
}: IBtcTag) => {
  return (
    <BtcTagWrapper isActive={isActive} bgColor={bgColor}>
      <BtcTagText isActive={isActive} color={color} fontSize={fontSize}>
        {children}
      </BtcTagText>
    </BtcTagWrapper>
  );
};
