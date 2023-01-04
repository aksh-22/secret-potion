import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, Text, View } from 'react-native';
import RightArrow from 'src/assets/svg/rightArrow.svg';
import Container from 'src/components/container/Container';
import CustomButton from 'src/components/customButton/CustomButton';
import colors from 'src/constants/colors';
import { SCREEN_WIDTH } from 'src/constants/deviceInfo';
import { fonts } from 'src/constants/fonts';
import { RootStackName } from 'src/constants/routeName';
import { useAppSelector } from 'src/hooks/reducer';

const Welcome = () => {
  const { navigate } = useNavigation<NativeStackNavigationProp<any>>();

  const user = useAppSelector((state) => state?.userReducer?.user);

  const { t } = useTranslation();

  return (
    <Container statusBarColor={colors.defaultWhite}>
      <View
        style={{
          paddingHorizontal: 30,
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          // paddingVertical: 30,
          paddingBottom: 60,
        }}
      >
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text numberOfLines={2} style={styles.mainHeading}>
            Hi {user?.fname}!
          </Text>
          <Text style={styles.description}>{t('welcome:message1')}</Text>
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <Image
              source={require('src/assets/images/welcome.png')}
              resizeMode='contain'
              style={{ height: 180, width: SCREEN_WIDTH }}
            />
            <Text style={styles.description2}>{t('welcome:message2')}</Text>
          </View>
        </View>
        <Text style={styles.lowerText}>{t('welcome:2min')}</Text>
        <CustomButton onPress={() => navigate(RootStackName.QUESTIONSSTACK)}>
          <RightArrow />
        </CustomButton>
      </View>
    </Container>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  mainHeading: {
    fontWeight: '400',
    fontFamily: fonts.regular,
    fontSize: 36,
    lineHeight: 43,
    color: colors.defaultBlack,
    marginTop: 50,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  description: {
    fontSize: 18,
    lineHeight: 24,
    color: colors.defaultBlack,
    marginTop: 40,
    textAlign: 'center',
    opacity: 0.5,
    fontWeight: '300',
    fontFamily: fonts.regular,
  },
  description2: {
    opacity: 0.5,
    fontSize: 15,
    lineHeight: 24,
    color: colors.defaultBlack,
    marginTop: 50,
    textAlign: 'center',
    fontWeight: '300',
    fontFamily: fonts.regular,
  },
  lowerText: {
    color: colors.regentBlue,
    fontSize: 15,
    lineHeight: 18,
    marginVertical: 10,
    fontFamily: fonts.regular,
  },
});
