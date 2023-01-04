import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import colors from 'src/constants/colors';
import { fonts } from 'src/constants/fonts';

type Props = {
  progress?: number;
};

const CircularChart = ({ progress }: Props) => {
  return (
    <View
      style={[
        {
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
          paddingVertical: 20,
        },
      ]}
    >
      <View style={styles.textWrapper}>
        <Text style={styles.text}>{progress}%</Text>
      </View>
      <CircularProgress
        value={progress}
        radius={90}
        progressValueColor={colors.transparent}
        activeStrokeColor={'#72CACC'}
        inActiveStrokeColor={colors.borderColor}
        inActiveStrokeOpacity={0.5}
        inActiveStrokeWidth={12}
        activeStrokeWidth={18}
        clockwise
      />
    </View>
  );
};

export default CircularChart;

const styles = StyleSheet.create({
  text: {
    color: colors.defaultBlack,
    fontFamily: fonts.regular,
    fontSize: 24,
    lineHeight: 28,
  },
  textWrapper: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
});
