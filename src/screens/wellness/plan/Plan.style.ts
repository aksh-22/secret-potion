import { StyleSheet } from 'react-native';
import colors from 'src/constants/colors';
import { fonts } from 'src/constants/fonts';

export default StyleSheet.create({
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
        textAlign: 'left',
    },
    boxHeading: {
        fontSize: 14,
        lineHeight: 17,
        textAlign: 'left',
        color: colors.defaultBlack,
        fontWeight: '400',
        marginBottom: 15
    },
    boxInnerText: {
        fontSize: 15,
        lineHeight: 18,
        textAlign: 'center',
        color: colors.regentBlue,
        fontWeight: '400'
    },
    box: {
        height: 110,
        borderRadius: 10,
        backgroundColor: colors.background2,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 20
    },
    itemHeading: {
        fontSize: 18,
        lineHeight: 24,
        fontWeight: '400',
        fontFamily: fonts.regular,
        color: colors.defaultBlack,
        flex: 1,
        // textAlign: 'center'
    },
    itemDescription: {
        fontSize: 14,
        lineHeight: 16,
        fontWeight: '400',
        fontFamily: fonts.regular,
        color: colors.defaultBlack
    },
    addPlanText: {
        fontFamily: fonts.regular,
        fontSize: 15,
        lineHeight: 18,
        color: colors.defaultBlack
    }
})