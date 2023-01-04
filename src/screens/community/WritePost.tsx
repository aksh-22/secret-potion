import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import moment from 'moment';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Keyboard, Platform, Pressable, Text, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch } from 'react-redux';
import ContainerTab2 from 'src/components/container/ContainerTab2';
import CustomButton from 'src/components/customButton/CustomButton';
import { showMessage } from 'src/components/messageModal/MessageModal';
import colors from 'src/constants/colors';
import { SCREEN_HEIGHT } from 'src/constants/deviceInfo';
import { fonts } from 'src/constants/fonts';
import { useAppSelector } from 'src/hooks/reducer';
import { reflectionType } from 'typings/reflectionType';
import styles from './Community.style';

type Props = {
    route?: any;
};

const WritePost = ({ route }: Props) => {
    const id = route?.params?.id;
    const content = route?.params?.data;
    const post_id = route?.params?.post_id;
    const type = route?.params?.type;
    const index = route?.params?.index;
    const apiType = route?.params?.apiType;
    const placeholder = route?.params?.placeholder;
    const heading = route?.params?.heading;
    const heading2 = route?.params?.heading2;

    const reflection: reflectionType = useAppSelector(
        (state) => state?.postReducer?.reflection
    );

    const ref = useRef(null);

    // ! description states
    const [description, setDescription] = useState(content);
    // const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const { t } = useTranslation();

    const dispatch = useDispatch();

    const { goBack } = useNavigation<NativeStackNavigationProp<any>>();

    const addPost = () => {
        if (!description?.trim()?.length) {
            showMessage({
                isVisible: true,
                message: t('errorMessage:contentRequired'),
                type: 'Error',
            });
        } else {
            setIsLoading(true);
            let data;
            if (type !== 'edit') {
                if (apiType === 'reflection') {
                    data = {
                        reflection_id: id,
                        reflection_content: description,
                        date: reflection?.day_date,
                    };
                } else {
                    data = {
                        community_type_id: id,
                        post_content: description,
                    };
                }
            } else {
                if (apiType === 'reflection') {
                    data = {
                        reflection_post_id: post_id,
                        reflection_content: description,
                    };
                } else {
                    data = { post_content: description, post_id };
                }
            }
            dispatch({
                type:
                    type === 'edit'
                        ? apiType === 'reflection'
                            ? 'EDIT_REFLECTION'
                            : 'EDIT_POSTS'
                        : apiType === 'reflection'
                        ? 'ADD_REFLECTION'
                        : 'ADD_POSTS',
                payload: {
                    data,
                    index: index && index,
                    apiType,
                    callback: () => {
                        setIsLoading(false);
                        showMessage({
                            isVisible: true,
                            message:
                                type === 'edit'
                                    ? t('community:postUpdated')
                                    : t('community:postAdded'),
                            type: 'Success',
                        });

                        Keyboard.dismiss();
                        goBack();
                    },
                    errorCallback: () => {
                        Keyboard.dismiss();
                        setIsLoading(false);
                    },
                },
            });
        }
    };

    return (
        <ContainerTab2
            // contentContainerStyle2={{
            //     backgroundColor: colors.defaultWhite,
            // }}
            contentContainerStyle={{
                backgroundColor: colors.defaultWhite,
                paddingTop: 20,
            }}
            isBack
            bell={false}
            message={false}
        >
            <KeyboardAwareScrollView
                keyboardShouldPersistTaps='handled'
                contentContainerStyle={{
                    paddingHorizontal: 20,
                    paddingBottom: 100,
                }}
                style={{ backgroundColor: colors.defaultWhite, flex: 1 }}
            >
                <Text style={styles.writePageHeading}>
                    {heading ?? t('community:whatsOnMind')}
                </Text>
                <Text style={styles.writePageDescription}>
                    {t('community:feelFree')}
                </Text>
                <Pressable
                    onPress={() => {
                        ref.current.focus();
                    }}
                    style={{
                        backgroundColor: colors.background3,
                        borderRadius: 10,
                        padding: 10,
                        flex: 1,
                        marginTop: 20,
                        height: SCREEN_HEIGHT * 0.5,
                        paddingBottom: 30,
                    }}
                >
                    <TextInput
                        ref={ref}
                        onChangeText={(text) => {
                            setDescription(text);
                        }}
                        multiline
                        placeholder={placeholder}
                        value={description}
                        placeholderTextColor={colors.lightBlack}
                        textAlignVertical='top'
                        style={{
                            color: colors.defaultBlack,
                            paddingVertical: Platform.OS === 'ios' ? 10 : 5,
                            fontFamily: fonts.regular,
                            fontSize: 16,
                        }}
                    />
                </Pressable>
                <CustomButton
                    isLoading={isLoading}
                    title='Post'
                    onPress={addPost}
                    style={{
                        alignSelf: 'flex-end',
                        marginTop: -30,
                        marginRight: 20,
                    }}
                />
            </KeyboardAwareScrollView>
        </ContainerTab2>
    );
};

export default WritePost;
