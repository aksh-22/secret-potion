import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import ContainerTab from 'src/components/container/ContainerTab';
import { useTranslation } from 'react-i18next';
import ContainerWIthShadow from 'src/components/container/ContainerWIthShadow';
import colors from 'src/constants/colors';
import styles from './Community.style';

import Kind from 'src/assets/svg/kind.svg';
import Spam from 'src/assets/svg/spam.svg';
import Info from 'src/assets/svg/information.svg';
import Abusive from 'src/assets/svg/abusive.svg';
import Support from 'src/assets/svg/support.svg';
import Mindful from 'src/assets/svg/mindful.svg';
import Checkbox from 'src/components/Checkbox';
import CustomButton from 'src/components/customButton/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CommunityRouteNames } from 'src/constants/routeName';
import PressableText from 'src/components/PressableText';
import { useDispatch } from 'react-redux';

type Props = {};

const CommunityMessage = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [accepted, setAccepted] = useState(false);

  const { replace } = useNavigation<NativeStackNavigationProp<any>>();

  const { t } = useTranslation();

  const dispatch = useDispatch();

  const updateGuideline = () => {
    setIsLoading(true);
    dispatch({
      type: 'GUIDELINE_UPDATE',
      payload: {
        callback: () => {
          setIsLoading(true);
          replace(CommunityRouteNames.COMMUNITY);
        },
      },
    });
  };

  const data = [
    {
      id: 1,
      heading: t('community:kind1'),
      description: t('community:kind2'),
      icon: <Kind />,
    },
    {
      id: 2,
      heading: t('community:spam1'),
      description: t('community:spam2'),
      icon: <Spam />,
    },
    {
      id: 3,
      heading: t('community:info1'),
      description: t('community:info2'),
      icon: <Info />,
    },
    {
      id: 4,
      heading: t('community:abusive1'),
      description: t('community:abusive2'),
      icon: <Abusive />,
    },
    {
      id: 5,
      heading: t('community:support1'),
      description: t('community:support2'),
      icon: <Support />,
    },
    {
      id: 6,
      heading: t('community:mindful1'),
      description: t('community:mindful2'),
      icon: <Mindful />,
    },
  ];

  return (
    <ContainerTab
      contentContainerStyle={{ paddingBottom: 60 }}
      heading={t('community:secretCommunity')}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: colors.defaultWhite,
          padding: 10,
          paddingTop: 20,
          borderRadius: 10,
        }}
      >
        <Text style={styles.initialText}>{t('community:initialMessage1')}</Text>
        <Text style={styles.initialText}>{t('community:initialMessage2')}</Text>
        <Text style={styles.initialText}>{t('community:initialMessage3')}</Text>
        <Text style={[styles.initialText, { color: colors.defaultBlack }]}>
          {t('community:beforeYouEnter')}
        </Text>
        <View style={{ padding: 10 }}>
          {data.map((el, index) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 10,
                flex: 1,
              }}
            >
              <View
                style={{
                  width: 60,
                  height: 60,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 20,
                }}
              >
                {el.icon}
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.beforeText, { marginBottom: 5 }]}>
                  {el.heading}
                </Text>
                <Text style={styles.description}>{el.description}</Text>
              </View>
            </View>
          ))}
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 30,
            paddingBottom: 20,
            paddingHorizontal: 10,
          }}
        >
          <Checkbox isChecked={accepted} onPress={(val) => setAccepted(val)} />
          <PressableText
            onTextPress={() => setAccepted((prev) => !prev)}
            wrapperStyle={{ marginLeft: 10, flex: 1, justifyContent: 'center' }}
            textStyle={{
              ...styles.description,
              color: colors.checkBox,
              fontWeight: '400',
            }}
          >
            {t('community:iUnderstand')}
          </PressableText>
        </View>
        <CustomButton
          isLoading={isLoading}
          disabled={!accepted}
          onPress={updateGuideline}
          arrow
          style={{ alignSelf: 'flex-end', marginBottom: -30 }}
        />
      </View>
    </ContainerTab>
  );
};

export default CommunityMessage;
