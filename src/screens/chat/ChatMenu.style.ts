import { StyleSheet } from 'react-native';
import colors from 'src/constants/colors';
import { fonts } from 'src/constants/fonts';

export default StyleSheet.create({
  card: {
    padding: 10,
    marginHorizontal: 10,
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 22,
  },
  username: {
    color: colors.defaultBlack,
    fontSize: 14,
    fontFamily: fonts.regular,
    fontWeight: '500',
  },
  centerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatDescription: {
    color: colors.defaultBlack,
    fontFamily: fonts.regular,
    opacity: 0.6,
    fontSize: 16,
    paddingTop: 5,
  },
  dot: {
    width: 15,
    height: 15,
    backgroundColor: colors.green,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: colors.defaultWhite,
    // marginVertical: 10,
    position: 'absolute',
    zIndex: 100,
    right: 0,
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 0,
    borderRightWidth: 45,
    borderBottomWidth: 90,
    borderLeftWidth: 45,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'red',
    borderLeftColor: 'transparent',
  },
});
