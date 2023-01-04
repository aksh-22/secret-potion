import { View, Text, StyleProp, TextStyle, StyleSheet } from "react-native";
import React, { memo } from "react";
import { fonts } from "src/constants/fonts";
type TCustomText = {
  style?: StyleProp<TextStyle>;
  children: string;
};
const CustomText = ({ style, children }: TCustomText) => {
  return <Text style={[textStyle.text, style]}>{children}</Text>;
};

export default memo(CustomText);

const textStyle = StyleSheet.create({
  text: {
    fontFamily: fonts.regular,
  },
});
