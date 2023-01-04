import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import * as Progress from 'react-native-progress';
import { SCREEN_WIDTH } from 'src/constants/deviceInfo';
import colors from 'src/constants/colors';
import { fonts } from 'src/constants/fonts';
import { useTranslation } from 'react-i18next';

type Props = {
  currentStep: number;
  totalTotalSteps?: number;
};

const ProgressBar = ({ currentStep, totalTotalSteps }: Props) => {
  const { t } = useTranslation();
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Text style={styles.text}>
        {t('questions:step')}: {currentStep ?? 0}
      </Text>
      <Progress.Bar
        color={colors.progress}
        unfilledColor={colors.regentBlueOpacity}
        borderRadius={80}
        height={15}
        progress={currentStep ? currentStep / totalTotalSteps : 0}
        width={SCREEN_WIDTH - 60}
        borderColor={colors.background2}
      />
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  text: {
    color: colors.defaultBlack,
    fontFamily: fonts.regular,
    alignSelf: 'flex-start',
    paddingLeft: 30,
    fontSize: 18,
    lineHeight: 22,
    marginVertical: 10,
  },
});
