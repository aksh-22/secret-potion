import React, { useState } from 'react';
import {
    ColorValue,
    KeyboardTypeOptions,
    NativeSyntheticEvent,
    Platform,
    StyleProp,
    Text,
    TextInput,
    TextInputFocusEventData,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from 'src/constants/colors';
import { fonts } from 'src/constants/fonts';

interface TCustomInput {
    placeholder?: string;
    icon?: React.ReactElement;
    secureTextEntry?: boolean;
    placeholderTextColor?: ColorValue;
    value?: string;
    onChangeText?: ((text: string) => void) | undefined;
    inputTextStyle?: StyleProp<TextStyle>;
    inputBoxStyle?: StyleProp<ViewStyle>;
    keyboardType?: KeyboardTypeOptions;
    errorMessage?: string;
    errorStyle?: StyleProp<ViewStyle>;
    label?: string;
    onFocus?:
        | ((
              e: NativeSyntheticEvent<TextInputFocusEventData>,
              value: string
          ) => void)
        | undefined;
    onBlur?:
        | ((
              e: NativeSyntheticEvent<TextInputFocusEventData>,
              value: string
          ) => void)
        | undefined;
    marginBottom?: number;
    dateOfBirth?: boolean;
    editable?: boolean;
    isLoading?: boolean;
    multiline?: boolean;
    numberOfLines?: number;
    countryCode?: number;
    onClearInput?: () => void;
    maxLength?: number;
    disabled?: boolean;
    rightIcon?: React.ReactElement;
    onRightIconPress?: () => void;
    onSubmitEditing?: () => void;
    disableRightIcon?: boolean;
    useMaskedInput?: boolean;
    mask?: any;
    borderColor?: string;
    focusedBorderColor?: string;
    showLabel?: boolean;
    marginTop?: number;
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}

const CustomInput = ({
    placeholder,
    secureTextEntry,
    placeholderTextColor,
    keyboardType,
    onChangeText,
    errorMessage,
    inputBoxStyle,
    value,
    borderColor,
    multiline = false,
    focusedBorderColor,
    inputTextStyle,
    maxLength,
    showLabel = true,
    editable,
    marginTop,
    autoCapitalize,
}: TCustomInput) => {
    const [isFocused, setIsFocused] = useState(false);
    const [visible, setVisible] = useState(secureTextEntry);

    return (
        <View
            style={[
                {
                    justifyContent: 'flex-end',
                    marginTop: 20,
                    // marginTop: value && showLabel ? marginTop ?? 30 : 0,
                },
                inputBoxStyle,
            ]}
        >
            {value && showLabel ? (
                <Text
                    style={{
                        fontSize: 15,
                        lineHeight: 18,
                        color: colors.placeholderColor,
                        fontFamily: fonts.regular,
                    }}
                >
                    {placeholder}
                </Text>
            ) : (
                <Text
                    style={{
                        fontSize: 15,
                        lineHeight: 18,
                        color: colors.lightBlack,
                        fontFamily: fonts.regular,
                    }}
                >
                    {' '}
                </Text>
            )}
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderBottomWidth: 1,
                    borderBottomColor: isFocused
                        ? focusedBorderColor ?? colors.regentBlue
                        : borderColor ?? colors.borderColor,
                }}
            >
                <TextInput
                    editable={editable}
                    caretHidden={false}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    textAlignVertical={multiline ? 'top' : 'auto'}
                    scrollEnabled
                    value={value}
                    multiline={multiline}
                    keyboardType={keyboardType}
                    secureTextEntry={visible}
                    placeholder={placeholder}
                    maxLength={maxLength}
                    autoCapitalize={autoCapitalize}
                    placeholderTextColor={
                        placeholderTextColor ?? colors.placeholderColor
                    }
                    style={[
                        {
                            backgroundColor: colors.transparent,
                            flex: 1,
                            color: colors.defaultBlack,
                            paddingVertical: Platform.OS === 'ios' ? 10 : 5,
                            fontFamily: fonts.regular,
                        },
                        inputTextStyle,
                    ]}
                    onChangeText={onChangeText}
                />
                {secureTextEntry ? (
                    <TouchableOpacity
                        onPress={() => setVisible((prev) => !prev)}
                    >
                        <Ionicons
                            style={{ paddingLeft: 10 }}
                            name={!visible ? 'eye' : 'eye-off'}
                            size={22}
                            color={
                                value ? colors.defaultBlack : colors.lightBlack
                            }
                        />
                    </TouchableOpacity>
                ) : null}
            </View>
            {errorMessage ? (
                <Text
                    style={{
                        color: colors.red,
                        fontFamily: fonts.regular,
                        marginVertical: 3,
                        fontSize: 12,
                    }}
                >
                    {errorMessage}
                </Text>
            ) : (
                <Text
                    style={{
                        color: colors.red,
                        fontFamily: fonts.regular,
                        marginVertical: 3,
                        fontSize: 12,
                    }}
                >
                    {' '}
                </Text>
            )}
        </View>
    );
};

export default CustomInput;
