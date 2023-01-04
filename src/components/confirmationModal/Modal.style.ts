import { StyleSheet } from 'react-native';
import colors from 'src/constants/colors';
import { SCREEN_WIDTH } from 'src/constants/deviceInfo';
import { fonts } from 'src/constants/fonts';
import { globalStyle } from 'src/constants/global.style';

export default StyleSheet.create({
    container: {
        padding: 10,
        width: SCREEN_WIDTH - 60,
        paddingHorizontal: 20,
        alignSelf: 'center',
        backgroundColor: colors.defaultWhite,
        borderRadius: 13,
        ...globalStyle.shadow,
    },
    text: {
        color: colors.defaultBlack,
        fontFamily: fonts.regular,
        fontSize: 17,
        paddingTop: 15,
        textAlign: 'center',
        lineHeight: 22,
    },
});
