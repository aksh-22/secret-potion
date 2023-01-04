import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import ContainerTabWithoutScroll from 'src/components/container/ContainerTabWithoutScroll';
import colors from 'src/constants/colors';
import { SCREEN_WIDTH } from 'src/constants/deviceInfo';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';
import { fonts } from 'src/constants/fonts';
import CustomInput from 'src/components/customInput/CustomInput';
import CustomButton from 'src/components/customButton/CustomButton';
import { useDispatch } from 'react-redux';
import { showMessage } from 'src/components/messageModal/MessageModal';
import Container from 'src/components/container/Container';
import ContainerTab from 'src/components/container/ContainerTab';
import { navigate } from 'src/utils/navigationRef';
import { RootStackName } from 'src/constants/routeName';

type Props = {};

const HelpAndSupport = ({}: Props) => {
    // !--- subject state
    const [subject, setSubject] = useState('');
    const [subjectError, setSubjectError] = useState('');
    // !--- description state
    const [description, setDescription] = useState('');
    const [descriptionError, setDescriptionError] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const { t } = useTranslation();

    const dispatch = useDispatch();

    const btnPress = () => {
        if (!subject) {
            setSubjectError(t('errorMessage:subjectRequired'));
        } else if (!description) {
            setDescriptionError(t('errorMessage:descriptionRequired'));
        } else {
            onSubmit();
        }
    };

    const onSubmit = () => {
        setIsLoading(true);
        dispatch({
            type: 'HELP_AND_SUPPORT',
            payload: {
                data: { subject, description },
                callback: () => {
                    setIsLoading(false);
                    setSuccess(true);
                },
                errorCallback: () => {
                    setIsLoading(false);
                },
            },
        });
    };

    return (
        <ContainerTab
            headingHeader={t('settings:helpAndSupport')}
            contentContainerStyle={{
                backgroundColor: colors.defaultWhite,
                paddingTop: 10,
            }}
            style={{ backgroundColor: colors.defaultWhite, flex: 1 }}
            isBack
        >
            <View style={{ flex: 1 }}>
                <Image
                    style={{
                        width: SCREEN_WIDTH - 120,
                        height: 180,
                        alignSelf: 'center',
                    }}
                    resizeMode='contain'
                    source={
                        success
                            ? require('src/assets/images/helpAndSupport2.png')
                            : require('src/assets/images/helpAndSupport.png')
                    }
                />
                {success ? (
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Text style={styles.text}>
                            {t('settings:successMessage')}
                        </Text>
                    </View>
                ) : (
                    <View>
                        <Text style={styles.text}>
                            {t('settings:message1')}
                            <Text
                                onPress={() => navigate(RootStackName.FAQ)}
                                style={{ color: colors.regentBlue }}
                            >
                                FAQs
                            </Text>
                            {t('settings:message2')}
                        </Text>
                        <View style={{ marginTop: -10 }}>
                            <CustomInput
                                placeholder={t('settings:enterSubject')}
                                borderColor={colors.lightBlack}
                                value={subject}
                                errorMessage={subjectError}
                                onChangeText={(text) => {
                                    subjectError && setSubjectError('');
                                    setSubject(text);
                                }}
                                maxLength={40}
                            />
                            <View
                            // style={{
                            //   borderRadius: 10,
                            //   backgroundColor: colors.background2,
                            //   overflow: 'hidden',
                            //   paddingHorizontal: 5,
                            //   marginTop: 20,
                            // }}
                            >
                                <CustomInput
                                    borderColor={colors.transparent}
                                    placeholder={t('settings:writeHere')}
                                    placeholderTextColor={colors.borderColor}
                                    multiline
                                    showLabel={false}
                                    inputTextStyle={{
                                        minHeight: 120,
                                        backgroundColor: colors.background3,
                                        borderRadius: 10,
                                        padding: 10,
                                        paddingTop: 10,
                                        marginTop: -30,
                                    }}
                                    value={description}
                                    errorMessage={descriptionError}
                                    onChangeText={(text) => {
                                        descriptionError &&
                                            setDescriptionError('');
                                        setDescription(text);
                                    }}
                                />
                            </View>
                        </View>
                        <CustomButton
                            isLoading={isLoading}
                            style={{
                                width: 150,
                                marginTop: 10,
                                alignSelf: 'center',
                            }}
                            title={t('settings:send')}
                            onPress={btnPress}
                        />
                    </View>
                )}
            </View>
        </ContainerTab>
    );
};

export default HelpAndSupport;

const styles = StyleSheet.create({
    text: {
        color: colors.defaultBlack,
        fontFamily: fonts.regular,
        fontSize: 16,
        lineHeight: 24,
        textAlign: 'center',
        marginTop: 20,
    },
});
