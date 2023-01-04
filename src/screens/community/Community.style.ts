import { Platform, StyleSheet } from 'react-native';
import colors from 'src/constants/colors';
import { fonts } from 'src/constants/fonts';

export default StyleSheet.create({
    initialText: {
        fontFamily: fonts.regular,
        fontWeight: '300',
        fontSize: 15,
        lineHeight: 18,
        color: colors.lightBlack,
        marginBottom: 20,
    },
    beforeText: {
        fontFamily: fonts.regular,
        fontWeight: '300',
        fontSize: 15,
        lineHeight: 18,
        color: colors.defaultBlack,
        marginBottom: 20,
    },
    description: {
        fontFamily: fonts.regular,
        fontWeight: '300',
        fontSize: 14,
        lineHeight: 16,
        color: colors.lightBlack,
    },
    box: {
        backgroundColor: colors.defaultWhite,
        borderRadius: 10,
        // height: 180,
        padding: 10,
        marginHorizontal: 10,
        paddingBottom: 30,
        minHeight: 200,
        // paddingTop: 40,
    },
    boxHeading: {
        fontFamily: fonts.regular,
        fontWeight: '300',
        fontSize: 20,
        lineHeight: 24,
        color: colors.defaultBlack,
    },
    boxDescription: {
        // fontFamily: fonts.regular,
        // fontWeight: '300',
        // fontSize: 15,
        lineHeight: 18,
        // color: colors.lightBlack,
        marginTop: 7,
        // textAlign: 'justify',
        textAlign: 'left',
    },
    writeBox: {
        padding: 15,
        borderRadius: 10,
        backgroundColor: colors.defaultWhite,
        opacity: 0.5,
        marginTop: 20,
    },
    writeText: {
        color: colors.lightBlack,
        fontSize: 15,
        lineHeight: 18,
        fontFamily: fonts.regular,
    },
    writePageHeading: {
        fontFamily: fonts.regular,
        fontSize: 29,
        lineHeight: 35,
        fontWeight: '300',
        color: colors.defaultBlack,
    },
    writePageDescription: {
        fontFamily: fonts.regular,
        fontSize: 15,
        lineHeight: 18,
        fontWeight: '300',
        color: colors.lightBlack,
        marginTop: 10,
    },
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
    searchBox: {
        backgroundColor: colors.defaultWhite,
        borderRadius: 10,
        marginBottom: 30,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    searchInput: {
        paddingVertical: Platform.OS === 'ios' ? 15 : 10,
        color: colors.defaultBlack,
        fontFamily: fonts.regular,
        flex: 1,
    },
    moreIconWrapper: {
        position: 'absolute',
        right: 10,
        top: 40,
        zIndex: 10,
    },
});
