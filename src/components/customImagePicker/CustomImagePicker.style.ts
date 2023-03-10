import { StyleSheet } from 'react-native';
import colors from 'src/constants/colors';
import { SCREEN_WIDTH } from 'src/constants/deviceInfo';
import { fonts } from 'src/constants/fonts';

export const CustomImagePickerStyle = StyleSheet.create({
  button: {
    height: 120,
    width: SCREEN_WIDTH * 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    borderRadius: 22,
    backgroundColor: colors.background,
    padding: 10,
  },
  iconContainer: {
    height: 50,
    width: 50,
    borderRadius: 22,
    backgroundColor: colors.blueOpacity,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  textStyle: {
    color: colors.defaultBlack,
    opacity: 0.5,
    fontFamily: fonts.regular,
    fontSize: 16,
    marginTop: 5
  },
});
