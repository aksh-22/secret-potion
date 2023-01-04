import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    KeyboardAvoidingView,
    ScrollView,
    Text,
    TextStyle,
    View,
    ViewStyle,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch } from 'react-redux';
import CustomButton from 'src/components/customButton/CustomButton';
import CustomInput from 'src/components/customInput/CustomInput';
import DateAndTimePicker from 'src/components/DateAndTimePicker';
import { showMessage } from 'src/components/messageModal/MessageModal';
import colors from 'src/constants/colors';
import { fonts } from 'src/constants/fonts';
import { useAppSelector } from 'src/hooks/reducer';
import { updateDiaryMessage } from 'src/redux/reducer/userReducer';
import { dateFormatForServer } from 'src/utils/dateFormatter';
import { diaryDetailType } from 'typings/diaryDetail';
import styles from './Diary.style';

type Props = {
    showText?: boolean;
    style?: ViewStyle;
    style2?: ViewStyle;
    descriptionInputStyle?: TextStyle;
    onDiaryAdd?: () => void;
    data?: diaryDetailType;
    preData?: boolean;
    index?: number;
};

const DiaryWrite = ({
    showText = true,
    style,
    style2,
    descriptionInputStyle,
    onDiaryAdd,
    data,
    preData,
    index,
}: Props) => {
    const d: any = data?.date;

    // ! Title states
    const [title, setTitle] = useState<any>(preData ? data?.title : '');
    const [titleError, setTitleError] = useState('');

    // ! DOB states
    const [DOB, setDOB] = useState<any | number | undefined>(
        preData ? new Date(d) : new Date()
    );
    const [DOBError, setDOBError] = useState('');
    // const [show, setShow] = useState(false);

    // ! description states
    const [description, setDescription] = useState(
        preData ? data?.description : ''
    );
    const [descriptionError, setDescriptionError] = useState('');

    // ! loading state
    const [isLoading, setIsLoading] = useState(false);

    const { t } = useTranslation();

    const dispatch = useDispatch();

    const diaryMessage = useAppSelector(
        (state) => state?.userReducer?.diaryMessage
    );

    const onAddDIary = () => {
        if (title.trim().length < 1 && description.trim().length < 1) {
            showMessage({
                isVisible: true,
                message: 'Either title or description is required*',
                type: 'Error',
            });
        } else {
            setIsLoading(true);
            const data1 = {
                title: title,
                description: description,
                date: dateFormatForServer(DOB),
            };
            dispatch({
                type: preData ? 'UPDATE_DIARY' : 'ADD_DIARY',
                payload: {
                    data: data1,
                    diaryIndex: preData && data?.id,
                    index: preData && index,
                    callback: (data: any) => {
                        onDiaryAdd && onDiaryAdd();
                        setIsLoading(false);
                        setTitle('');
                        setDescription('');
                        if (diaryMessage) {
                            dispatch(updateDiaryMessage(false));
                        }
                        showMessage({
                            isVisible: true,
                            message: preData
                                ? t('diary:diaryUpdateSuccess')
                                : t('diary:diaryCreateSuccess'),
                            type: 'Success',
                        });
                    },
                    errorCallback: () => {
                        setIsLoading(false);
                    },
                    finallyCallback: () => {
                        setIsLoading(false);
                    },
                },
            });
        }
        // if (title.trim().length < 1) {
        //   setTitleError(t('errorMessage:titleRequired'));
        // } else if (!DOB) {
        //   setDOBError(t('errorMessage:DOBRequired'));
        // } else if (!description) {
        //   setDescriptionError(t('errorMessage:descriptionRequired'));
        // } else {
        //   setIsLoading(true);
        //   const data1 = {
        //     title,
        //     description,
        //     date: dateFormatForServer(DOB),
        //   };
        //   dispatch({
        //     type: preData ? 'UPDATE_DIARY' : 'ADD_DIARY',
        //     payload: {
        //       data: data1,
        //       index: preData && data?.id,
        //       callback: (data: any) => {
        //         onDiaryAdd && onDiaryAdd(data?.data?.diary);
        //         setIsLoading(false);
        //         setTitle('');
        //         setDescription('');
        //         if (diaryMessage) {
        //           dispatch(updateDiaryMessage(false));
        //         }
        //         showMessage({
        //           isVisible: true,
        //           message: preData
        //             ? t('diary:diaryUpdateSuccess')
        //             : t('diary:diaryCreateSuccess'),
        //           type: 'Success',
        //         });
        //       },
        //       errorCallback: () => {
        //         setIsLoading(false);
        //       },
        //     },
        //   });
        // }
    };

    // const onDateChange = (event: any, selectedDate: any) => {
    //   if (event?.type === 'set') {
    //     setDOB(selectedDate);
    //     setDOBError('');
    //   }
    //   setShow(false);
    // };

    return preData ? (
        <>
            <KeyboardAvoidingView style={{ flex: 1 }}>
                <ScrollView
                    keyboardShouldPersistTaps='handled'
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                    style={{ flex: 1 }}
                    contentContainerStyle={[
                        { flexGrow: 1, paddingBottom: 120 },
                        style2,
                    ]}
                >
                    <View
                        style={[
                            {
                                paddingHorizontal: 20,
                            },
                            style,
                        ]}
                    >
                        {showText ? (
                            <Text style={styles.writeText}>
                                {t('diary:writeText')}
                            </Text>
                        ) : null}
                        <View style={styles.inputContainer}>
                            <CustomInput
                                borderColor={colors.lightBlack2}
                                marginTop={20}
                                placeholder={t('questions:title')}
                                value={title}
                                maxLength={30}
                                errorMessage={titleError}
                                onChangeText={(text) => {
                                    setTitleError('');
                                    setTitle(text);
                                }}
                            />
                            <DateAndTimePicker
                                disabled
                                showIcon={false}
                                showLabel={false}
                                borderColor={colors.lightBlack2}
                                style={{ marginTop: 5 }}
                                // onDateChange={(date) => setDOB(date)}
                                // onPress={() => setShow(true)}
                                date={DOB}
                                errorMessage={DOBError}
                            />
                            <CustomInput
                                multiline
                                showLabel={false}
                                value={description}
                                borderColor={colors.transparent}
                                focusedBorderColor={colors.transparent}
                                placeholder={t('questions:writeHere')}
                                errorMessage={descriptionError}
                                onChangeText={(text) => {
                                    setDescriptionError('');
                                    setDescription(text);
                                }}
                                inputTextStyle={descriptionInputStyle}
                                inputBoxStyle={{ marginTop: -10 }}
                            />
                        </View>
                        <CustomButton
                            isLoading={isLoading}
                            onPress={onAddDIary}
                            style={styles.button}
                        >
                            <Text
                                style={{
                                    color: colors.defaultWhite,
                                    fontFamily: fonts.book,
                                }}
                            >
                                Save
                            </Text>
                        </CustomButton>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
            {/* {show && (
        <DateTimePicker
          minimumDate={new Date()}
          testID='dateTimePicker'
          value={DOB ? DOB : new Date()}
          mode='date'
          is24Hour={true}
          onChange={onDateChange}
          display='calendar'
          style={{ flex: 1, backgroundColor: 'red' }}
        />
      )} */}
        </>
    ) : (
        <>
            <KeyboardAwareScrollView
                keyboardShouldPersistTaps='handled'
                showsVerticalScrollIndicator={false}
                bounces={false}
                style={{ flex: 1 }}
                contentContainerStyle={[
                    { flexGrow: 1, paddingBottom: 120 },
                    style2,
                ]}
            >
                <KeyboardAvoidingView style={{ flex: 1 }}>
                    <View
                        style={[
                            {
                                paddingHorizontal: 20,
                            },
                            style,
                        ]}
                    >
                        {showText ? (
                            <Text style={styles.writeText}>
                                {t('diary:writeText')}
                            </Text>
                        ) : null}
                        <View style={styles.inputContainer}>
                            <CustomInput
                                maxLength={30}
                                borderColor={colors.lightBlack2}
                                marginTop={20}
                                placeholder={t('questions:title')}
                                value={title}
                                errorMessage={titleError}
                                onChangeText={(text) => {
                                    setTitleError('');
                                    setTitle(text);
                                }}
                            />
                            <DateAndTimePicker
                                disabled
                                showIcon={false}
                                showLabel={false}
                                borderColor={colors.lightBlack2}
                                style={{ marginTop: 5 }}
                                // onDateChange={(date) => setDOB(date)}
                                // onPress={() => setShow(true)}
                                date={DOB}
                                errorMessage={DOBError}
                            />
                            <CustomInput
                                multiline
                                showLabel={false}
                                value={description}
                                borderColor={colors.transparent}
                                focusedBorderColor={colors.transparent}
                                placeholder={t('questions:writeHere')}
                                errorMessage={descriptionError}
                                onChangeText={(text) => {
                                    setDescriptionError('');
                                    setDescription(text);
                                }}
                                inputTextStyle={descriptionInputStyle}
                            />
                        </View>
                        <CustomButton
                            isLoading={isLoading}
                            onPress={onAddDIary}
                            style={styles.button}
                        >
                            <Text
                                style={{
                                    color: colors.defaultWhite,
                                    fontFamily: fonts.book,
                                }}
                            >
                                Save
                            </Text>
                        </CustomButton>
                    </View>
                </KeyboardAvoidingView>
            </KeyboardAwareScrollView>
            {/* {show && (
        <DateTimePicker
          minimumDate={new Date()}
          testID='dateTimePicker'
          value={DOB ? DOB : new Date()}
          mode='date'
          is24Hour={true}
          onChange={onDateChange}
          display='calendar'
          style={{ flex: 1, backgroundColor: 'red' }}
        />
      )} */}
        </>
    );
};

export default DiaryWrite;
