import { StyleSheet } from 'react-native';
import colors from 'src/constants/colors';
import { globalStyle } from 'src/constants/global.style';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.defaultWhite,
    flex: 0.7,
    borderRadius: 40,
    zIndex: 10,
    padding: 20,
  },
  whiteShadowContainer1: {
    backgroundColor: colors.defaultWhite,
    borderRadius: 40,
    height: 100,
    width: '95%',
    alignSelf: 'center',
    marginBottom: -85,
    opacity: 0.5,
    ...globalStyle.shadow2,
  },
  whiteShadowContainer2: {
    backgroundColor: colors.defaultWhite,
    borderRadius: 40,
    height: 100,
    marginBottom: -80,
    width: '95%',
    alignSelf: 'center',
    opacity: 0.5,
    ...globalStyle.shadow2,
  },
  button: {
    // alignSelf: 'flex-end',
    // marginTop: -30,
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 11,
    marginHorizontal: 20,
    marginTop: -30,
  },
  loadingContainer: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    backgroundColor: colors.blackOpacity,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingWrapper: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: colors.defaultWhite,
    ...globalStyle.shadow3,
  },
});
