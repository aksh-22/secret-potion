import React, { useCallback, useEffect, useState } from 'react';
import { memo } from 'react';
import { Platform, StyleSheet, Text, View, ViewStyle } from 'react-native';
import RangeSlider1 from 'rn-range-slider';
import Thumb from 'src/assets/svg/thumb.svg';
import colors from 'src/constants/colors';
import { fonts } from 'src/constants/fonts';
import i18n from 'src/locale/i18n.config';

type Props = {
    value?: number;
    height?: number;
    style?: ViewStyle;
    onChange?: (value: number) => void;
    disabled?: boolean;
};

const colorsVal = [
    colors.sliderColor1,
    colors.sliderColor2,
    colors.sliderColor3,
    colors.sliderColor4,
    colors.sliderColor5,
];

const labels = [
    i18n?.t('wellness:notAtAll'),
    i18n?.t('wellness:mostlyNot'),
    i18n?.t('wellness:sometimes'),
    i18n?.t('wellness:mostlyYes'),
    i18n?.t('wellness:always'),
];

const RangeSlider = ({
    value,
    height = 10,
    style,
    onChange,
    disabled,
}: Props) => {
    const [sliderValue, setSliderValue] = useState<number>(1);

    useEffect(() => {
        if (value) setSliderValue(value);
    }, [value]);

    const renderThumb = useCallback(
        () => (
            <View
                style={{
                    height: 30,
                    width: 30,
                    marginTop: 10,
                    marginLeft: Platform.OS === 'ios' ? 1 : 13,
                    marginRight: 13,
                }}
            >
                <Thumb style={{ marginTop: -10, opacity: 0 }} />
            </View>
        ),
        [sliderValue]
    );
    const renderRail = useCallback(
        () => <View style={{ backgroundColor: colors.transparent }} />,
        []
    );
    const renderRailSelected = useCallback(
        () => <View style={{ height: height }} />,
        []
    );
    const handleValueChange = useCallback((low, high) => {
        setSliderValue(low);
        onChange && onChange(low);
    }, []);

    return (
        <View
            style={[
                {
                    // height: height,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    // marginTop: 20,
                    // paddingHorizontal: 20,
                },
                style,
            ]}
        >
            {[...Array(5)].map((el, index) => (
                <View style={{ flex: 1 }} key={index}>
                    {sliderValue === index + 1 ? (
                        <Text
                            // numberOfLines={1}
                            style={styles.label}
                        >
                            {labels[index]}
                        </Text>
                    ) : (
                        <Text style={styles.label}> </Text>
                    )}
                    <View
                        style={{
                            flexDirection: 'row',
                            flex: 1,
                            backgroundColor:
                                sliderValue > index
                                    ? colorsVal[index]
                                    : colors.sliderNonSelected,
                            height: height,
                            borderTopLeftRadius: index === 0 ? 8 : 0,
                            borderBottomLeftRadius: index === 0 ? 8 : 0,
                            alignItems: 'center',
                        }}
                    >
                        <View
                            style={[
                                styles.box,
                                {
                                    backgroundColor:
                                        sliderValue > index
                                            ? colorsVal[index]
                                            : colors.sliderNonSelected,
                                    height: height,
                                    // borderTopLeftRadius: index === 0 ? 8 : 0,
                                    // borderBottomLeftRadius: index === 0 ? 8 : 0,
                                },
                            ]}
                        />
                        <View>
                            <View
                                style={[
                                    styles.circle,
                                    {
                                        backgroundColor:
                                            sliderValue > index
                                                ? colorsVal[index]
                                                : colors.sliderNonSelected,
                                        height: height * 2,
                                        width: height * 2,
                                        marginRight: -height / 10,
                                    },
                                ]}
                            >
                                {sliderValue === index + 1 ? (
                                    <View
                                        style={{
                                            position: 'absolute',
                                            height: height * 2,
                                            width: height * 2,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            marginTop: 4,
                                        }}
                                    >
                                        <Thumb style={{}} />
                                    </View>
                                ) : null}
                            </View>
                        </View>
                    </View>
                </View>
            ))}
            <RangeSlider1
                // style={styles.slider}
                disabled={disabled}
                min={1}
                max={5}
                step={1}
                floatingLabel
                renderThumb={renderThumb}
                renderRail={renderRail}
                renderRailSelected={renderRailSelected}
                onValueChanged={handleValueChange}
                disableRange
                style={styles.sliderStyle}
                low={sliderValue}
            />
        </View>
    );
};

export default memo(RangeSlider);

const styles = StyleSheet.create({
    box: {
        flex: 1,
        // marginRight: -1,
        // marginLeft: -10,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
    },
    circle: {
        borderRadius: 50,
        zIndex: 1,
        // marginLeft: -5,
    },
    thumb: {
        position: 'absolute',
        zIndex: 10,
        right: 0,
        left: 0,
        top: 0,
        bottom: 0,
        // width: 10,
        // height: 10,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    label: {
        fontSize: 13,
        lineHeight: 15,
        color: colors.lightBlack,
        fontFamily: fonts.regular,
        alignSelf: 'flex-end',
        textAlign: 'right',
        marginBottom: 10,
        marginRight: 5,
        flex: 1,
        width: 100,
    },
    thumbCircle: {
        height: 15,
        width: 15,
        borderRadius: 50,
        backgroundColor: colors.defaultWhite,
        marginBottom: 20,
    },
    sliderStyle: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        opacity: 1,
        zIndex: 1000,
        height: 40,
        // paddingLeft: 10,
        // paddingTop: 10,
    },
});
