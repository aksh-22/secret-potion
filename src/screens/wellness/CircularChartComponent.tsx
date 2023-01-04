import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import CircularChart from 'src/components/CircularChart';
import colors from 'src/constants/colors';
import { globalStyle } from 'src/constants/global.style';
import { useTranslation } from 'react-i18next';
import Info from 'src/assets/svg/info.svg';
import { fonts } from 'src/constants/fonts';

type Props = {
    progress?: string;
    onPress?: () => void;
};

const CircularChartComponent = ({ progress, onPress }: Props) => {
    const { t } = useTranslation();

    return (
        <View style={styles.container}>
            <View
                style={{
                    borderRadius: 10,
                    backgroundColor: colors.defaultWhite,
                }}
            >
                {progress ? (
                    <CircularChart progress={Math.floor(parseInt(progress))} />
                ) : null}
            </View>
            <View style={styles.textWrapper}>
                <Text style={styles.text}>{t('wellness:overall')}</Text>
                <View style={styles.iconWrapper}>
                    <TouchableOpacity onPress={onPress} style={{ padding: 10 }}>
                        <Info />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default CircularChartComponent;

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background,
        justifyContent: 'center',
        borderRadius: 10,
        ...globalStyle.shadow4,
        // overflow: 'hidden',
        marginTop: 20,
    },
    textWrapper: {
        backgroundColor: colors.background,
        paddingVertical: 15,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
    },
    text: {
        color: colors.defaultBlack,
        fontSize: 18,
        lineHeight: 21,
        fontWeight: '400',
        textAlign: 'center',
        fontFamily: fonts.regular,
    },
    iconWrapper: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 10,
    },
});
