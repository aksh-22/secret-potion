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
  iconWrapper: {
    width: 20,
    alignItems: 'center'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  }
});
