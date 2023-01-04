import React, { ReactNode } from 'react';
import {
  ActivityIndicator,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import colors from 'src/constants/colors';
import { fonts } from 'src/constants/fonts';

type Props = {
  onTextPress?: () => void;
  children?: ReactNode;
  textStyle?: TextStyle;
  wrapperStyle?: ViewStyle;
  isLoading?: boolean;
  loadingColor?: string;
};

const PressableText = ({
  onTextPress,
  children,
  textStyle,
  wrapperStyle,
  isLoading,
  loadingColor,
}: Props) => {
  return (
    <TouchableOpacity
      disabled={isLoading}
      onPress={onTextPress}
      style={wrapperStyle}
    >
      {isLoading ? (
        <ActivityIndicator
          color={loadingColor ? loadingColor : colors.regentBlue}
        />
      ) : (
        <Text
          style={[
            {
              color: colors.defaultBlack,
              fontFamily: fonts.regular,
              fontWeight: '400',
            },
            textStyle,
          ]}
        >
          {children}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default PressableText;
