import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, TouchableOpacity, View } from 'react-native';
import { EventRegister } from 'react-native-event-listeners';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import Info from 'src/assets/svg/info.svg';
import Container from 'src/components/container/Container';
import ContainerWIthShadow from 'src/components/container/ContainerWIthShadow';
import CustomModal from 'src/components/CustomModal';
import LoadingComponent from 'src/components/LoadingComponent';
import RangeSlider from 'src/components/RangeSlider';
import colors from 'src/constants/colors';
import { useAppSelector1 } from 'src/hooks/reducer';
import { dateFormatForServer } from 'src/utils/dateFormatter';
import { wellnessQuestionType } from 'typings/wellnessQuestion';
import styles from './Wellness.style';

type Props = {
    route?: any;
};

let ans = [];

const WellnessQuestionUpdate = ({ route }: Props) => {
    const id = route?.params?.id;
    const is_plan_created = route?.params?.is_plan_created;

    const { t } = useTranslation();
    const dispatch = useDispatch();

    const {
        userReducer: { user },
    } = useAppSelector1();

    const [isLoading, setIsLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [wellnessQuestionData, setWellnessQuestionData] =
        useState<wellnessQuestionType>({});

    const { navigate, goBack } =
        useNavigation<NativeStackNavigationProp<any>>();

    const onChange = useCallback((val, el, item) => {
        let temp = [...ans];

        const data = {
            option_id: el?.id,
            question_id: item?.id,
            value: val,
        };

        const index = temp.findIndex((el2) => {
            return el2?.option_id === data?.option_id;
        });
        if (index !== -1) {
            temp[index] = data;
        } else {
            temp.push(data);
        }
        // setAnswers([...temp]);
        ans = [...temp];
    }, []);

    const rightButtonPress = () => {
        if (is_plan_created) {
            goBack();
        } else {
            setIsLoading(true);
            dispatch({
                type: 'SUBMIT_WELLNESS',
                payload: {
                    data: {
                        date: dateFormatForServer(new Date()),
                        wellness_answers: [...ans],
                    },
                    callback: () => {
                        setIsLoading(false);
                        ans = [];
                        EventRegister.emit('WellnessReload');
                        // navigate(BottomRouteNames.WELNESSSTACK);
                        goBack();
                    },
                    errorCallback: () => {
                        goBack();
                    },
                },
            });
        }
    };

    useEffect(() => {
        setIsLoading(true);
        dispatch({
            type: 'GET_WELLNESS_QUESTIONS_DETAIL',
            payload: {
                id,
                callback: (wellness: wellnessQuestionType) => {
                    setWellnessQuestionData(wellness);
                    setIsLoading(false);
                    ans = [];
                },
                errorCallback: () => {
                    goBack();
                },
            },
        });
    }, []);

    return (
        <>
            {isLoading ? (
                <LoadingComponent />
            ) : (
                <Container>
                    <ContainerWIthShadow
                        // showShadow={currStep > 1}
                        mainContainerStyle2={{ paddingBottom: 100 }}
                        rightBtnTitle={
                            is_plan_created ? 'Back' : t('wellness:submit')
                        }
                        // rightBtnTitle={t('wellness:submit')}
                        rightButton
                        rightButtonPress={rightButtonPress}
                    >
                        <View
                            style={{
                                flex: 1,
                                backgroundColor: colors.defaultWhite,
                                paddingHorizontal: 20,
                                paddingBottom: 30,
                                borderRadius: 40,
                                marginTop: 20,
                            }}
                        >
                            <Text style={styles?.question}>
                                {wellnessQuestionData?.question}
                                <Pressable
                                    hitSlop={30}
                                    onPress={() => {
                                        setShow(true);
                                    }}
                                    style={{
                                        justifyContent: 'flex-end',
                                        alignItems: 'center',
                                        paddingLeft: 2,
                                        // height: 50,
                                    }}
                                >
                                    <Info height={18} width={18} />
                                </Pressable>
                            </Text>
                            {wellnessQuestionData?.type?.map((el, index) => (
                                <View
                                    key={index}
                                    style={{ marginVertical: 20 }}
                                >
                                    <Text style={styles?.questionText}>
                                        {el?.option}
                                    </Text>
                                    <RangeSlider
                                        disabled={is_plan_created}
                                        value={el?.value}
                                        onChange={(val) =>
                                            onChange(
                                                val,
                                                el,
                                                wellnessQuestionData
                                            )
                                        }
                                    />
                                </View>
                            ))}
                        </View>
                    </ContainerWIthShadow>
                </Container>
            )}
            <CustomModal
                childrenStyle={{ justifyContent: 'center' }}
                // childrenViewStyle={{ flex: 0.4 }}
                onClose={() => setShow(false)}
                isOpen={show}
            >
                <View
                    style={{
                        backgroundColor: colors.defaultWhite,
                        padding: 20,
                        borderRadius: 10,
                    }}
                >
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => setShow(false)}
                        style={styles.iconWrapper}
                    >
                        <Ionicons
                            name='close'
                            size={20}
                            color={colors.defaultWhite}
                        />
                    </TouchableOpacity>
                    <Text style={styles.heading}>
                        {wellnessQuestionData?.name}
                    </Text>
                    <Text style={[styles.description, { fontSize: 15 }]}>
                        {wellnessQuestionData?.content}
                    </Text>
                </View>
            </CustomModal>
        </>
    );
};

export default WellnessQuestionUpdate;
