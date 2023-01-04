import React, { ReactNode } from 'react';
import {
    ActivityIndicator,
    Pressable,
    Text,
    TextStyle,
    ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import RightArrow from 'src/assets/svg/rightArrow.svg';
import colors from 'src/constants/colors';
import { fonts } from 'src/constants/fonts';

type Props = {
    onPress?: () => void;
    children?: ReactNode;
    isLoading?: boolean;
    style?: ViewStyle;
    style2?: ViewStyle;
    btnType?: 'delete' | 'normal' | 'leave' | 'cancel';
    title?: string;
    arrow?: boolean;
    disabled?: boolean;
    color?: Array<string>;
    textStyle?: TextStyle;
};

const CustomButton = ({
    onPress,
    children,
    isLoading,
    style,
    style2,
    btnType = 'normal',
    title,
    arrow,
    disabled,
    color,
    textStyle,
}: Props) => {
    return (
        <Pressable
            disabled={disabled || isLoading}
            style={style2}
            onPress={onPress}
        >
            <LinearGradient
                colors={
                    disabled
                        ? [colors.borderColor, colors.borderColor]
                        : color
                        ? color
                        : btnType === 'delete'
                        ? [colors.Illusion, colors.red]
                        : btnType === 'leave'
                        ? [colors.close2, colors.close1]
                        : btnType === 'cancel'
                        ? [colors.toggleDisable, colors.toggleDisable]
                        : [colors.mintTulip, colors.downy]
                }
                style={[
                    {
                        width: 84,
                        height: 57,
                        borderRadius: 40,
                        justifyContent: 'center',
                        alignItems: 'center',
                    },
                    style,
                ]}
            >
                {isLoading ? (
                    <ActivityIndicator color={colors.defaultWhite} />
                ) : title ? (
                    <Text
                        style={[
                            {
                                color: colors.defaultWhite,
                                fontFamily: fonts.book,
                            },
                            textStyle,
                        ]}
                    >
                        {title}
                    </Text>
                ) : arrow ? (
                    <RightArrow />
                ) : (
                    children
                )}
            </LinearGradient>
        </Pressable>
    );
};

export default CustomButton;
