import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import FirstMessage from 'src/components/FirstMessage';
import colors from 'src/constants/colors';
import { fonts } from 'src/constants/fonts';
import { DiaryRouteNames } from 'src/constants/routeName';

const FirstDiaryPage = () => {
    const { t } = useTranslation();

    const { replace } = useNavigation<NativeStackNavigationProp<any>>();

    const onNext = () => {
        replace(DiaryRouteNames.DIARYTAB);
    };

    return (
        <FirstMessage
            heading={t('diary:diary')}
            image={require('src/assets/images/diary.png')}
            message={t('diary:diaryFirstPageInfo')}
            onPress={onNext}
        />
    );
};

export default FirstDiaryPage;

const styles = StyleSheet.create({
    description: {
        color: colors.defaultBlack,
        fontFamily: fonts.regular,
        fontSize: 15,
        lineHeight: 21,
    },
});
