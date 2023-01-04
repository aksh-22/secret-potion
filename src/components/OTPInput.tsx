import { StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import colors from 'src/constants/colors';
import { fonts } from 'src/constants/fonts';

type Props = {
    errorMessage?: string;
    onChange?: (otp: string) => void;
    value?: string;
};

const OTPInput = ({ errorMessage, onChange, value }: Props) => {
    const [OTP, setOTP] = useState<any>('');
    useEffect(() => {
        setOTP(value?.trim());
        // if (value) {
        // }
    }, [value]);

    return (
        <View>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}
            >
                <View
                    style={[
                        styles.textWrapper,
                        {
                            borderBottomColor:
                                OTP.length === 0
                                    ? colors.regentBlue
                                    : colors.borderColor,
                        },
                    ]}
                >
                    <Text style={styles.text}>{OTP[0]}</Text>
                </View>
                <View
                    style={[
                        styles.textWrapper,
                        {
                            borderBottomColor:
                                OTP.length === 1
                                    ? colors.regentBlue
                                    : colors.borderColor,
                        },
                    ]}
                >
                    <Text style={styles.text}>{OTP[1]}</Text>
                </View>
                <View
                    style={[
                        styles.textWrapper,
                        {
                            borderBottomColor:
                                OTP.length === 2
                                    ? colors.regentBlue
                                    : colors.borderColor,
                        },
                    ]}
                >
                    <Text style={styles.text}>{OTP[2]}</Text>
                </View>
                <View
                    style={[
                        styles.textWrapper,
                        {
                            borderBottomColor:
                                OTP.length === 3
                                    ? colors.regentBlue
                                    : colors.borderColor,
                        },
                    ]}
                >
                    <Text style={styles.text}>{OTP[3]}</Text>
                </View>
                <View
                    style={[
                        styles.textWrapper,
                        {
                            borderBottomColor:
                                OTP.length === 4
                                    ? colors.regentBlue
                                    : colors.borderColor,
                        },
                    ]}
                >
                    <Text style={styles.text}>{OTP[4]}</Text>
                </View>
                <View
                    style={[
                        styles.textWrapper,
                        {
                            borderBottomColor:
                                OTP.length === 5
                                    ? colors.regentBlue
                                    : colors.borderColor,
                        },
                    ]}
                >
                    <Text style={styles.text}>{OTP[5]}</Text>
                </View>
                <TextInput
                    maxLength={6}
                    value={OTP ?? ''}
                    keyboardType='decimal-pad'
                    style={styles.textInput}
                    caretHidden
                    onChangeText={(text) => {
                        const temp = text.trim();
                        onChange && onChange(text);
                        setOTP(temp);
                    }}
                />
            </View>
            {errorMessage ? (
                <Text
                    style={{
                        color: colors.red,
                        fontFamily: fonts.regular,
                        marginVertical: 3,
                    }}
                >
                    {errorMessage}
                </Text>
            ) : (
                <View />
            )}
        </View>
    );
};

export default OTPInput;

const styles = StyleSheet.create({
    textWrapper: {
        color: colors.defaultBlack,
        // marginHorizontal: 20,
        borderBottomWidth: 1,
        paddingHorizontal: 18,
        fontSize: 15,
        lineHeight: 18,
        paddingBottom: 5,
        fontFamily: fonts.regular,
        // backgroundColor:'red'
        // borderBottomColor
    },
    text: {
        color: colors.defaultBlack,
        // marginHorizontal: 20,
        fontSize: 15,
        lineHeight: 18,
        fontFamily: fonts.regular,
        // backgroundColor:'red'
        // borderBottomColor
    },
    textInput: {
        backgroundColor: colors.transparent,
        flex: 1,
        position: 'absolute',
        // top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0,
        paddingVertical: 20,
    },
});
