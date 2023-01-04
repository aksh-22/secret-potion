import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useDispatch } from 'react-redux';
import ContainerTab2 from 'src/components/container/ContainerTab2';
import CustomButton from 'src/components/customButton/CustomButton';
import CustomInput from 'src/components/customInput/CustomInput';
import { showMessage } from 'src/components/messageModal/MessageModal';
import colors from 'src/constants/colors';
import { fonts } from 'src/constants/fonts';
import styles from './Reflection.style';

type Props = {
    route?: any;
};

const ReflectionReport = ({ route }: Props) => {
    const post_id = route?.params?.post_id;
    const index = route?.params?.index;

    // ! description states
    const [description, setDescription] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [list, setList] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    const [listLoading, setListLoading] = useState(false);

    const [value, setValue] = useState(null);

    const { t } = useTranslation();

    const dispatch = useDispatch();

    const { goBack } = useNavigation<NativeStackNavigationProp<any>>();

    useEffect(() => {
        getData();
    }, []);

    const onSubmit = () => {
        if (value === null) {
            showMessage({
                isVisible: true,
                message: 'Select a reason to report',
                type: 'Error',
            });
        } else if (description.trim().length === 0) {
            showMessage({
                isVisible: true,
                message:
                    'To help us understand better, please explain why you want to report this post',
                type: 'Error',
            });
        } else {
            setIsLoading(true);
            dispatch({
                type: 'REPORT_REFLECTION',
                payload: {
                    data: {
                        reflection_post_id: post_id,
                        complaint_option_id: value !== 0 ? value : undefined,
                        other_option: description,
                    },
                    index,
                    callback: () => {
                        setIsLoading(false);
                        goBack();
                        showMessage({
                            isVisible: true,
                            message:
                                'We have received your feedback. Our team will look into this at the earliest.',
                            type: 'Success',
                        });
                    },
                    errorCallback: () => {
                        setIsLoading(false);
                    },
                },
            });
        }
    };

    const getData = () => {
        setListLoading(true);
        dispatch({
            type: 'REPORT_OPTIONS',
            payload: {
                callback: (data) => {
                    console.log('data', data);
                    setList([
                        ...data,
                        {
                            id: 0,
                            option: 'Other',
                        },
                    ]);
                    setListLoading(false);
                },
                errorCallback: () => {
                    setListLoading(false);
                },
            },
        });
    };

    return (
        <ContainerTab2
            contentContainerStyle={{
                backgroundColor: colors.defaultWhite,
                paddingTop: 20,
            }}
            isBack
            bell={false}
            message={false}
        >
            <ScrollView
                keyboardShouldPersistTaps='handled'
                contentContainerStyle={{
                    paddingHorizontal: 20,
                    paddingBottom: 100,
                }}
                style={{ backgroundColor: colors.defaultWhite, flex: 1 }}
            >
                <Text style={styles.writePageHeading}>
                    {t('community:reportAbuse')}
                </Text>
                <Text style={styles.writePageDescription}>
                    {t('community:tellUs')}
                </Text>

                <View
                    style={{
                        borderBottomWidth: 1,
                        borderBottomColor: colors.borderColor,
                        paddingLeft: 10,
                        marginBottom: 10,
                        marginTop: 40,
                    }}
                >
                    {listLoading ? (
                        <View
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: colors.blackOpacity,
                                zIndex: 10,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 10,
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: fonts.regular,
                                    color: colors.defaultWhite,
                                }}
                            >
                                Fetching list...
                            </Text>
                        </View>
                    ) : null}
                    <Dropdown
                        placeholderStyle={{
                            color: colors.placeholderColor,
                            fontFamily: fonts.regular,
                            fontSize: 15,
                            lineHeight: 18,
                        }}
                        containerStyle={{
                            borderBottomWidth: 1,
                            borderBottomColor: colors.borderColor,
                        }}
                        fontFamily={fonts.regular}
                        // selectedTextStyle={styles.selectedTextStyle}
                        data={list}
                        maxHeight={200}
                        labelField='option'
                        valueField='id'
                        placeholder='Select Reason'
                        value={value}
                        onChange={(item) => {
                            setValue(item.id);
                        }}
                    />
                </View>
                <>
                    <View
                        style={{
                            backgroundColor: colors.background3,
                            borderRadius: 10,
                            padding: 10,
                            marginTop: 30,
                        }}
                    >
                        <CustomInput
                            multiline
                            showLabel={false}
                            value={description}
                            borderColor={colors.transparent}
                            focusedBorderColor={colors.transparent}
                            placeholder={t('settings:writeHere')}
                            errorMessage={descriptionError}
                            onChangeText={(text) => {
                                setDescriptionError('');
                                setDescription(text);
                            }}
                            inputBoxStyle={{
                                marginTop: 0,
                                flex: 1,
                                justifyContent: 'flex-start',
                            }}
                            inputTextStyle={{
                                minHeight: 250,
                                marginTop: -20,
                            }}
                        />
                    </View>
                    <CustomButton
                        onPress={onSubmit}
                        isLoading={isLoading}
                        title='Report'
                        style2={{
                            alignSelf: 'flex-end',
                            marginTop: -30,
                            marginRight: 20,
                        }}
                    />
                </>
            </ScrollView>
        </ContainerTab2>
    );
};

export default ReflectionReport;
