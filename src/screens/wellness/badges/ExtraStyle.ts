import { StyleSheet } from 'react-native';
import colors from 'src/constants/colors';
import { fonts } from 'src/constants/fonts';

export default StyleSheet.create({
    textContainer: {
        backgroundColor: colors.background,
    },
    textContainer2: {
        backgroundColor: colors.defaultWhite,
        paddingVertical: 20,
        borderBottomEndRadius: 60,
        // flex: 1,
        paddingHorizontal: 20,

    },
    heading: {
        fontFamily: fonts.regular,
        fontWeight: '400',
        fontSize: 29,
        lineHeight: 35,
        color: colors.defaultBlack,
    },
    description: {
        fontFamily: fonts.regular,
        fontWeight: '400',
        fontSize: 15,
        lineHeight: 18,
        color: colors.lightBlack,
        marginTop: 10,
    },
    bottomContainer: {
        backgroundColor: colors.background,
        paddingTop: 40,
        flex: 1,
        paddingHorizontal: 20
    },
})