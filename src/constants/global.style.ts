import { StyleSheet } from 'react-native';
import colors from './colors';
import { fonts } from './fonts';

export const globalStyle = StyleSheet.create({
    flexRow: {
        flexDirection: 'row',
    },
    appPadding: {
        paddingHorizontal: 20,
    },
    bottomRadius: {
        borderBottomEndRadius: 40,
        borderBottomStartRadius: 40,
    },
    bottomRadius10: {
        borderBottomEndRadius: 10,
        borderBottomStartRadius: 10,
    },
    topRadius: {
        borderTopEndRadius: 40,
        borderTopStartRadius: 40,
    },
    shadow: {
        shadowColor: colors.defaultBlack,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    shadow4: {
        shadowColor: colors.defaultBlack,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    shadow1: {
        shadowColor: colors.defaultBlack,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 8,
    },
    shadow2: {
        shadowColor: colors.downy,

        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 8,
    },
    shadow3: {
        shadowColor: colors.defaultBlack,

        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.5,
        shadowRadius: 15,
        elevation: 8,
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    heading: {
        fontFamily: fonts.regular,
        fontSize: 22,
        color: colors.defaultBlack,
        lineHeight: 28,
    },
    directionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
});
