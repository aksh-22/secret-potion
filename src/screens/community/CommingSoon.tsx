import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { fonts } from "src/constants/fonts";
import colors from "src/constants/colors";

type Props = {};

const CommingSoon = (props: Props) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text
        style={{
          fontFamily: fonts.regular,
          fontSize: 30,
          color: colors.defaultBlack,
        }}
      >
        Coming Soon
      </Text>
    </View>
  );
};

export default CommingSoon;

const styles = StyleSheet.create({});
