import { StyleSheet } from 'react-native';
import colors from 'src/constants/colors';
import { fonts } from 'src/constants/fonts';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.defaultWhite,
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
  heading: {
    fontFamily: fonts.regular,
    fontSize: 15,
    lineHeight: 18,
    fontWeight: '400',

  },
  containerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
