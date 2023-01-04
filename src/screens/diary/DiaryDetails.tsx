import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';
import React, { useEffect, useRef, useState } from 'react';
import { Keyboard, StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import ConfirmationModal from 'src/components/ConfirmationModal';
import ContainerTab from 'src/components/container/ContainerTab';
import colors from 'src/constants/colors';
import { SCREEN_HEIGHT } from 'src/constants/deviceInfo';
import { fonts } from 'src/constants/fonts';
import { useAppSelector } from 'src/hooks/reducer';
import { dateFormatter } from 'src/utils/dateFormatter';
import DiaryWrite from './DiaryWrite';

type Props = {
    route: any;
    navigation?: any;
};

const DiaryDetails = ({ route, navigation }: Props) => {
    const index: number = route?.params?.index;
    const diaryData = useAppSelector(
        (state) => state?.postReducer?.diaryData[index]
    );

    const [isEdit, setIsEdit] = useState(false);

    const [show, setShow] = useState(false);

    const [confirmDetails, setConfirmDetails] = useState<any>({});

    const [isLoading, setIsLoading] = useState(false);

    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    const [backLoading, setBackLoading] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true); // or some other action
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false); // or some other action
            }
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    const { goBack } = useNavigation();

    const dispatch = useDispatch();

    const onDiaryAdd = () => {
        setIsEdit(false);
        // setDiaryData(data);
    };

    const onBackPress = () => {
        setConfirmDetails({
            title: 'Do you want to discard?',
            button: 'Yes',
            type: 'discard',
        });
        setShow(true);
    };

    const onDelete = () => {
        setIsLoading(true);
        dispatch({
            type: 'DELETE_DIARY',
            payload: {
                diaryIndex: diaryData?.id,
                index,
                callback: () => {
                    setIsLoading(false);
                    setShow(false);
                    goBack();
                },
                errorCallback: () => {
                    setIsLoading(false);
                    setShow(false);
                },
            },
        });
    };

    const onConfirmationModalPress = () => {
        setBackLoading(true);
        if (confirmDetails?.type === 'discard') {
            // setShow(false);
            // goBack();
            navRef.current &&
                navigation.dispatch(navRef?.current?.data?.action);
            // setTimeout(() => {
            // }, 300);
        } else {
            onDelete();
        }
    };
    let navRef: any = useRef(null);
    useEffect(() => {
        const unsubscribe = navigation.addListener('beforeRemove', (e: any) => {
            if (isEdit) {
                e.preventDefault();
                navRef.current = e;
                onBackPress();
                // navRef.current = e;
                // setOpenConfirmationModal(true);
            }
        });
        return unsubscribe;
    }, [isEdit]);

    return (
        <>
            <ContainerTab
                // headingHeader={data?.title}
                isBack
                editIcon={!isEdit && dayjs().isSame(diaryData?.date, 'day')}
                deleteIcon={!isEdit}
                onEditIconPress={() => setIsEdit(true)}
                onDeleteIconPress={() => {
                    setConfirmDetails({
                        title: 'Are you sure you want to delete this note?',
                        button: 'delete',
                        type: 'delete',
                        // heading: 'Are you sure you want to delete this note?',
                    });
                    setShow(true);
                }}
                bell={isEdit}
                message={isEdit}
                style={{
                    backgroundColor: isEdit
                        ? colors.background
                        : colors.defaultWhite,
                }}
                contentContainerStyle={{
                    paddingTop: 0,
                    backgroundColor: isEdit
                        ? colors.background
                        : colors.defaultWhite,
                    paddingBottom: 0,
                }}
                contentContainerStyle2={{ paddingBottom: isEdit ? 0 : 100 }}
                // backBtnPress={isEdit ? onBackPress : undefined}
            >
                <View style={{ flex: 1 }}>
                    {isEdit ? (
                        <DiaryWrite
                            data={diaryData}
                            preData
                            // descriptionInputStyle={{ height: 350 }}
                            // style2={{ marginBottom: 100 }}
                            style={{ paddingHorizontal: 0, marginTop: 20 }}
                            showText={false}
                            onDiaryAdd={onDiaryAdd}
                            descriptionInputStyle={{
                                // height: SCREEN_HEIGHT * 0.4,
                                height: isKeyboardVisible
                                    ? SCREEN_HEIGHT * 0.4
                                    : SCREEN_HEIGHT * 0.4,
                            }}
                            index={index}
                        />
                    ) : (
                        <>
                            <Text
                                // numberOfLines={1}
                                style={{
                                    fontFamily: fonts.regular,
                                    fontWeight: '400',
                                    fontSize: 20,
                                    lineHeight: 24,
                                    color: colors.defaultBlack,
                                    // width: 120,
                                    // marginLeft: 10,
                                    marginVertical: 10,
                                }}
                            >
                                {diaryData?.title?.trim().length
                                    ? diaryData?.title
                                    : 'No title'}
                            </Text>
                            <Text style={styles.title}>
                                {dateFormatter(diaryData?.date)}
                            </Text>
                            <Text style={styles.description}>
                                {diaryData?.description ??
                                    'No description available'}
                            </Text>
                        </>
                    )}
                </View>
            </ContainerTab>
            <ConfirmationModal
                title={confirmDetails.title}
                heading={confirmDetails.heading}
                submitButtonText={confirmDetails.button}
                onClose={() => setShow(false)}
                onPress={onConfirmationModalPress}
                isOpen={show}
                isLoading={backLoading}
            />
        </>
    );
};

export default DiaryDetails;

const styles = StyleSheet.create({
    title: {
        fontFamily: fonts.regular,
        fontSize: 13,
        lineHeight: 15.6,
        color: colors.defaultBlack,
    },
    description: {
        fontFamily: fonts.regular,
        fontSize: 15,
        lineHeight: 22,
        color: colors.lightBlack,
        marginTop: 10,
        textAlign: 'justify',
    },
});
