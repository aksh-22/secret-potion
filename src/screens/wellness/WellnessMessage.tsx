import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Platform, StatusBar, StyleSheet } from 'react-native';
import FirstMessage from 'src/components/FirstMessage';
import colors from 'src/constants/colors';
import { WellnessRouteNames } from 'src/constants/routeName';

const WellnessMessage = ({ navigation }) => {
    const { t } = useTranslation();

    const { navigate, addListener } =
        useNavigation<NativeStackNavigationProp<any>>();

    const onNext = () => {
        navigate(WellnessRouteNames.WELLNESS_QUESTION);
    };

    return (
        <FirstMessage
            headingStyle={{ marginTop: 20 }}
            // headingStyle2={{ marginLeft: -10 }}
            heading={t('wellness:wellness')}
            image={require('src/assets/images/wellnessLandingPage.png')}
            message={t('wellness:firstMessage')}
            message2={t('wellness:firstMessage1')}
            onPress={onNext}
        />
    );
};

export default WellnessMessage;

const styles = StyleSheet.create({});
