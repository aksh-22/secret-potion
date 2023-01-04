import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import colors from 'src/constants/colors';
import { fonts } from 'src/constants/fonts';
import RangeSlider from 'src/components/RangeSlider';

type Props = {
  question: any;
};

const WellnessQuestionEl = ({ question }: Props) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.defaultWhite,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View>
        <Text style={styles.question}>{question?.question}</Text>
      </View>
      <RangeSlider height={10} />
    </View>
  );
};

export default WellnessQuestionEl;

const styles = StyleSheet.create({
  question: {
    color: colors.defaultBlack,
    fontWeight: '400',
    lineHeight: 29,
    fontSize: 24,
    marginTop: 30,
    fontFamily: fonts.regular,
  },
});
