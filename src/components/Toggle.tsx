import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Switch } from 'react-native-switch';
import { useDispatch } from 'react-redux';
import colors from 'src/constants/colors';
import { fonts } from 'src/constants/fonts';

type Props = {
  isOn?: boolean;
  onValueChange?: () => void;
  id?: number;
};

const Toggle = ({ isOn, onValueChange, id }: Props) => {
  const [On, setOn] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const onUpdate = () => {
    setIsLoading(true);
    dispatch({
      type: 'UPDATE_NOTIFICATION_SETTINGS',
      payload: {
        id,
        callback: () => {
          setIsLoading(false);
        },
        errorCallback: () => {
          setIsLoading(false);
        },
      },
    });
  };

  useEffect(() => {
    setOn(isOn);
  }, [isOn]);

  return (
    <View>
      <Switch
        value={On}
        onValueChange={() => {
          onValueChange && onValueChange();
          setOn((prev) => !prev);
          onUpdate();
        }}
        disabled={isLoading}
        activeText={'ON'}
        activeTextStyle={{ color: colors.defaultWhite, fontFamily: fonts.regular }}
        inactiveTextStyle={{ color: colors.defaultWhite, fontFamily: fonts.regular }}
        inActiveText={'OFF'}
        circleSize={25}
        barHeight={30}
        // barHeight={10}
        circleBorderWidth={0}
        backgroundActive={colors.toggleActive}
        backgroundInactive={colors.toggleDisable}
        circleActiveColor={colors.defaultWhite}
        circleInActiveColor={colors.defaultWhite}
        renderInsideCircle={() => isLoading && <ActivityIndicator />} // custom component to render inside the Switch circle (Text, Image, etc.)
        changeValueImmediately={true} // if rendering inside circle, change state immediately or wait for animation to complete
        // innerCircleStyle={{ alignItems: 'center', justifyContent: 'center' }} // style for inner animated circle for what you (may) be rendering inside the circle
        outerCircleStyle={{}} // style for outer animated circle
        // renderActiveText={false}
        // renderInActiveText={false}
        switchLeftPx={10} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
        switchRightPx={32} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
        switchWidthMultiplier={2.5} // multiplied by the `circleSize` prop to calculate total width of the Switch
        switchBorderRadius={30} // Sets the border Radius of the switch slider. If unset, it remains the circleSize.
      />
    </View>
  );
};

export default Toggle;

const styles = StyleSheet.create({});
