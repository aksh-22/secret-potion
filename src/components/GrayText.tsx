import { StyleSheet, Text, TextStyle, View } from 'react-native';
import React from 'react';
import colors from 'src/constants/colors';
import { fonts } from 'src/constants/fonts';

type TProps = {
    children: any;
    style?: TextStyle;
    numberOfLines?: number;
};

const GrayText = ({ children, style, numberOfLines }: TProps) => {
    return (
        <Text numberOfLines={numberOfLines} style={[styles.text, style]}>
            {children}
        </Text>
    );
};

export default GrayText;

const styles = StyleSheet.create({
    text: {
        opacity: 0.5,
        fontSize: 15,
        lineHeight: 24,
        color: colors.defaultBlack,
        textAlign: 'center',
        fontWeight: '300',
        fontFamily: fonts.regular,
    },
});
