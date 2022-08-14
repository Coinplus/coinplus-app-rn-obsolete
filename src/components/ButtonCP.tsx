import React from 'react';
// @ts-ignore
import styled from 'styled-components/native';
import {StyleSheet, View, GestureResponderEvent, ViewStyle} from 'react-native';
import colors from '../utils/colors';

const StyledButton = styled.TouchableOpacity`
  background-color: ${colors.BUTTON_PRIMARY};
  border-radius: 8px;
  color: white;
  padding: 10px;
  width: ${(props: {width: string}) => (props.width ? props.width : '180px')};
`;
const StyledText = styled.Text`
  color: white;
  text-align: center;
  font-weight: 300;
  font-family: 'Lexend-Medium';
`;
interface IButtonCp {
  title: string;
  width?: string;
  disabled?: boolean;
  onPress: (event: GestureResponderEvent) => void;
  style?: ViewStyle;
}
export const ButtonCp = ({
  title,
  width,
  onPress,
  style,
  disabled,
}: IButtonCp) => {
  return (
    <View style={[styles.fixToText, style, disabled && {opacity: 0.5}]}>
      <StyledButton onPress={onPress} width={width} disabled={disabled}>
        <StyledText>{title}</StyledText>
      </StyledButton>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
