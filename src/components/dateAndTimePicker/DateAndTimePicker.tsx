import React, { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { Modalize } from 'react-native-modalize';
import colors from 'src/constants/colors';
import { SCREEN_WIDTH } from 'src/constants/deviceInfo';
import { fonts } from 'src/constants/fonts';
import { globalStyle } from 'src/constants/global.style';
import CustomButton from '../customButton/CustomButton';
type IProps = {
    value?: Date;
    mode?: 'date' | 'time' | 'datetime';
    show?: boolean;
    is24Hour?: boolean;
    onChange: (value: string | Date) => void;
    onClose: React.Dispatch<React.SetStateAction<any>>;
    minDate?: any;
    maxDate?: any;
    style?: ViewStyle;
    onClearPress?: () => void;
};

const DateAndTimePicker = ({
    value,
    mode,
    show,
    is24Hour,
    onChange,
    onClose,
    minDate,
    maxDate,
    style,
    onClearPress,
}: IProps) => {
    const modalizeRef = useRef<Modalize>(null);
    useEffect(() => {
        show && modalizeRef.current?.open();
        isModalOpen && !show && modalizeRef.current?.close();
        setDate(value ?? new Date());
    }, [show]);

    const [date, setDate] = useState(new Date());
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (minDate) {
            // setDate(minDate);
        }
    }, [minDate]);
    return (
        <>
            <Modalize
                onOpened={() => setIsModalOpen(true)}
                onClosed={() => setIsModalOpen(false)}
                ref={modalizeRef}
                handlePosition='inside'
                adjustToContentHeight
                onClose={() => onClose(false)}
                useNativeDriver={true}
                rootStyle={{
                    shadowColor: colors.blackOpacity,
                    shadowOffset: {
                        width: 0,
                        height: 4,
                    },
                    shadowOpacity: 0.82,
                    shadowRadius: 2.65,
                    elevation: 2,
                }}
                avoidKeyboardLikeIOS
                handleStyle={{ backgroundColor: colors.background }}
            >
                {onClearPress && (
                    <Pressable
                        onPress={onClearPress}
                        style={{
                            alignSelf: 'flex-end',
                            padding: 20,
                            zIndex: 1,
                        }}
                        hitSlop={30}
                    >
                        <Text
                            onPress={onClearPress}
                            style={{
                                color: colors.red,
                                fontFamily: fonts.regular,
                                fontSize: 16,
                                fontWeight: '400',
                            }}
                        >
                            Clear filter
                        </Text>
                    </Pressable>
                )}
                <View
                    style={[
                        globalStyle.center,
                        {
                            marginVertical: 20,
                        },
                        style,
                    ]}
                >
                    <DatePicker
                        minimumDate={minDate}
                        maximumDate={maxDate}
                        androidVariant='iosClone'
                        mode={mode ?? 'date'}
                        is24hourSource='locale'
                        locale={is24Hour ? 'en-GB' : 'en'}
                        date={date}
                        onCancel={() => {
                            onClose(false);
                        }}
                        style={{
                            backgroundColor: '#FFF',
                        }}
                        onDateChange={(value) => {
                            setDate(value);
                        }}
                    />

                    <CustomButton
                        title='Confirm'
                        style={{
                            marginVertical: 15,
                            width: SCREEN_WIDTH * 0.5,
                        }}
                        onPress={() => {
                            onChange && onChange(date);
                            modalizeRef.current?.close();
                        }}
                    />

                    <CustomButton
                        title='Cancel'
                        btnType='delete'
                        style={{
                            marginBottom: 10,
                            width: SCREEN_WIDTH * 0.5,
                        }}
                        onPress={() => {
                            setDate(value ?? new Date());
                            modalizeRef.current?.close();
                        }}
                    />
                </View>
            </Modalize>
        </>
    );
};

export default DateAndTimePicker;

const styles = StyleSheet.create({
    inputBox: {
        borderRadius: 20,
        borderWidth: 1,
        borderColor: colors.linkWater,
        height: 70,
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
});
