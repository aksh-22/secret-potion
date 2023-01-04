import { StyleSheet } from 'react-native';
import colors from 'src/constants/colors';
import { fonts } from 'src/constants/fonts';

export default StyleSheet.create({
  welcomeTxt: {
    marginTop: 100,
    color: colors.defaultBlack,
    fontSize: 33,
    lineHeight: 43,
    textAlign: 'center',
    fontFamily: fonts.regular
  },
  description: {
    fontFamily: fonts.regular,
    fontWeight: '400',
    color: colors.defaultBlack,
    textAlign: 'center',
    fontSize: 15,
    lineHeight: 18,
    marginTop: 25,
    opacity: 0.5,
  },
});
