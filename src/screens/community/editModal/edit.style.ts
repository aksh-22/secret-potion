import { StyleSheet } from 'react-native';
import colors from 'src/constants/colors';
import { SCREEN_WIDTH } from 'src/constants/deviceInfo';
import { fonts } from 'src/constants/fonts';
import { globalStyle } from 'src/constants/global.style';

export default StyleSheet.create({
    container: {
        backgroundColor: colors.defaultWhite,
        borderRadius: 10,
        padding: 20,
    },
    buttonWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    button: {
        width: '48%',
    },
    button2: {
        width: '100%',
    },
    inputWrapper: {
        backgroundColor: colors.background3,
        borderRadius: 10,
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
    },
    text: {
        fontFamily: fonts.regular,
        fontWeight: '300',
        fontSize: 16,
        lineHeight: 19,
    },
    deleteContainer: {
        padding: 10,
        width: SCREEN_WIDTH - 60,
        paddingHorizontal: 20,
        alignSelf: 'center',
        backgroundColor: colors.defaultWhite,
        borderRadius: 13,
        ...globalStyle.shadow,
    },
});
