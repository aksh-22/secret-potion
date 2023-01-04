import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Switch } from 'react-native-switch';
import { useDispatch } from 'react-redux';
import colors from 'src/constants/colors';

type Props = {
    isOn?: boolean;
    onValueChange?: (val: boolean) => void;
    id?: number;
    barHeight?: number;
    circleSize?: number;
    switchWidthMultiplier?: number;
    backgroundActive?: string;
    backgroundInactive?: string;
};

const Toggler = ({
    isOn,
    onValueChange,
    id,
    barHeight = 30,
    circleSize = 25,
    switchWidthMultiplier = 2.5,
    backgroundActive = colors.toggleActive,
    backgroundInactive = colors.toggleDisable,
}: Props) => {
    const [On, setOn] = useState(true);

    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        setOn(isOn);
    }, [isOn]);

    return (
        <View>
            <Switch
                value={On}
                onValueChange={() => {
                    onValueChange && onValueChange(!On);
                    setOn((prev) => !prev);
                }}
                disabled={isLoading}
                activeText={'  '}
                activeTextStyle={{ color: colors.defaultWhite }}
                inactiveTextStyle={{ color: colors.defaultWhite }}
                inActiveText={'   '}
                circleSize={circleSize}
                barHeight={barHeight}
                // barHeight={10}
                circleBorderWidth={0}
                backgroundActive={backgroundActive}
                backgroundInactive={backgroundInactive}
                circleActiveColor={colors.defaultWhite}
                circleInActiveColor={colors.defaultWhite}
                renderInsideCircle={() => isLoading && <ActivityIndicator />} // custom component to render inside the Switch circle (Text, Image, etc.)
                changeValueImmediately={true} // if rendering inside circle, change state immediately or wait for animation to complete
                // innerCircleStyle={{ alignItems: 'center', justifyContent: 'center' }} // style for inner animated circle for what you (may) be rendering inside the circle
                // renderActiveText={false}
                // renderInActiveText={false}
                switchLeftPx={3} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
                switchRightPx={5} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
                switchWidthMultiplier={switchWidthMultiplier} // multiplied by the `circleSize` prop to calculate total width of the Switch
                switchBorderRadius={30} // Sets the border Radius of the switch slider. If unset, it remains the circleSize.
                innerCircleStyle={{ width: 25 }}
                outerCircleStyle={{}} // style for outer animated circle
            />
        </View>
    );
};

export default Toggler;

const styles = StyleSheet.create({});
