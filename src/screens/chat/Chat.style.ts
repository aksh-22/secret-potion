import { StyleSheet } from 'react-native';
import colors from 'src/constants/colors';

export default StyleSheet.create({
    wrapperStyleLeft: {
        backgroundColor: colors.defaultWhite,
        borderRadius: 10,
        borderBottomLeftRadius: 10,
        borderTopStartRadius: 0,
        paddingVertical: 10,
        marginLeft: -10,
    },

    wrapperStyleRight: {
        backgroundColor: '#C0E4F7',
        borderRadius: 10,
        borderBottomEndRadius: 0,
        borderTopStartRadius: 10,
        paddingVertical: 10,
        marginRight: 5,
    },
});
