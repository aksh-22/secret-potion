import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import colors from 'src/constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { fonts } from 'src/constants/fonts';
type Props = {
    isSamePrev?: boolean;
    isSameNext?: boolean;
    onSubtractDate: () => void;
    onAddDate: () => void;
    onDatePress?: () => void;
    date?: any;
    disableDatePress?: boolean;
};

const DateController = ({
    isSamePrev,
    onSubtractDate,
    isSameNext,
    date,
    onAddDate,
    onDatePress,
    disableDatePress = false,
}: Props) => {
    return (
        <View
            style={{
                backgroundColor: colors.defaultWhite,
                flexDirection: 'row',
                // flex: 1,
                // width: '100%',
                borderBottomEndRadius: 10,
                borderBottomStartRadius: 10,
                paddingVertical: 15,
                paddingHorizontal: 20,
                marginBottom: 20,
                // marginRight: -20,
            }}
        >
            <TouchableOpacity disabled={isSamePrev} onPress={onSubtractDate}>
                <Ionicons
                    // style={{ paddingLeft: 10 }}
                    name='chevron-back-sharp'
                    size={22}
                    color={isSamePrev ? colors.linkWater : colors.regentBlue}
                />
            </TouchableOpacity>
            <View
                style={{
                    flexDirection: 'row',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <TouchableOpacity
                    disabled={disableDatePress}
                    onPress={onDatePress}
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <MaterialCommunityIcons
                        color={colors.regentBlue}
                        name='calendar-month'
                        size={20}
                    />
                    <Text
                        style={{
                            color: colors.defaultBlack,
                            marginLeft: 10,
                            fontFamily: fonts.regular,
                        }}
                    >
                        {date}
                    </Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity disabled={isSameNext} onPress={onAddDate}>
                <Ionicons
                    // style={{ paddingLeft: 10 }}
                    name='chevron-forward-sharp'
                    size={22}
                    color={isSameNext ? colors.linkWater : colors.regentBlue}
                />
            </TouchableOpacity>
        </View>
    );
};

export default DateController;

const styles = StyleSheet.create({});
