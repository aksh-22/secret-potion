import { StyleSheet } from 'react-native';
import colors from 'src/constants/colors';
import { fonts } from 'src/constants/fonts';

export default StyleSheet.create({
    postWrapper: {
        backgroundColor: colors.defaultWhite,
        borderRadius: 10,
        padding: 15,
        paddingBottom: 20,
        // maxHeight: 220,
    },
    postHeading: {
        fontFamily: fonts.regular,
        fontSize: 15,
        lineHeight: 18,
        color: colors.defaultBlack,
    },
    postHeading2: {
        fontFamily: fonts.regular,
        fontSize: 13,
        lineHeight: 16,
        color: colors.borderColor,
        marginTop: 5,
    },
    postDescription: {
        fontFamily: fonts.regular,
        fontSize: 13,
        lineHeight: 16,
        color: colors.lightBlack,
        marginTop: 5,
    },
    postReactionText: {
        fontFamily: fonts.regular,
        fontSize: 13,
        lineHeight: 15,
        fontWeight: '400',
        color: colors.downy,
        marginLeft: 5,
        // backgroundColor: 'red',
        textAlignVertical: 'center',
        paddingTop: 2,
    },
    line: {
        position: 'absolute',
        width: 1,
        backgroundColor: colors.borderColor,
        opacity: 0.5,
        top: 30,
        bottom: 0,
        left: 30,
    },
    line2: {
        position: 'absolute',
        width: 1,
        backgroundColor: colors.borderColor,
        opacity: 0.5,
        top: 0,
        left: 30,
        height: '40%',
    },
})