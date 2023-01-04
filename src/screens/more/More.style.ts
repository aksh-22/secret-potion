import { StyleSheet } from 'react-native';
import colors from 'src/constants/colors';
import { fonts } from 'src/constants/fonts';

export default StyleSheet.create({
    text: {
        fontSize: 16,
        lineHeight: 19,
        fontWeight: '400',
        color: colors.defaultBlack,
        fontFamily: fonts.regular,
        marginLeft: 10,
    },
    heading: {
        fontSize: 20,
        lineHeight: 24,
        textAlign: 'center',
        fontFamily: fonts.regular,
        color: colors.defaultBlack,
    },
    description: {
        fontSize: 15,
        lineHeight: 18,
        // textAlign: 'center',
        fontFamily: fonts.regular,
        color: colors.lightBlack,
        marginTop: 20,
        textAlign: 'center',
    },
    iconWrapper: {
        backgroundColor: colors.regentBlue,
        borderRadius: 50,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 15,
        top: -40,
    },
    iconWrapper2: {
        borderRadius: 50,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
    },
    bottomText: {
        fontSize: 15,
        lineHeight: 19,
        fontWeight: '400',
        color: colors.lightBlack,
        fontFamily: fonts.regular,
    },
});
