import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, View } from 'react-native';
import { Country } from 'react-native-country-picker-modal';
import {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import Carousel from 'react-native-snap-carousel';
import { useDispatch } from 'react-redux';
import Container from 'src/components/container/Container';
import ContainerWIthShadow from 'src/components/container/ContainerWIthShadow';
import { showMessage } from 'src/components/messageModal/MessageModal';
import ProgressBar from 'src/components/ProgressBar';
import colors from 'src/constants/colors';
import { SCREEN_WIDTH } from 'src/constants/deviceInfo';
import { dateFormatForServer } from 'src/utils/dateFormatter';
import { optionsItemType, questionType } from 'typings/question';
import styles from './Question.style';
import QuestionEl from './QuestionEl';
import QuestionEl2 from './QuestionEl2';

const Questions = ({}) => {
    // const { navigate } = useNavigation<any>();
    const [currStep, setCurrStep] = useState(0);
    const [totalSteps, setTotalSteps] = useState(5);

    const [selectedQuestion, setSelectedQuestion] = useState<
        Array<optionsItemType>
    >([]);

    const [currentQuestion, setCurrentQuestion] = useState<Array<questionType>>(
        []
    );

    const [isLoading, setIsLoading] = useState(false);

    // !------------------------------------------!
    // ! DOB states
    const [DOB, setDOB] = useState<any | number | undefined>(
        currentQuestion[currStep - 1]?.selectedQuestion?.option
            ? new Date()
            : ''
    );
    const [DOBError, setDOBError] = useState('');

    // ! gender states
    const [gender, setGender] = useState(false);
    const [genderError, setGenderError] = useState('');

    // ! country states
    const [country, setCountry] = useState<Country>();
    const [countryError, setCountryError] = useState('');

    // ! diagnosis states
    const [diagnosis, setDiagnosis] = useState('');
    const [diagnosisError, setDiagnosisError] = useState('');
    // !------------------------------------------!

    const dispatch = useDispatch();

    const { t } = useTranslation();

    const submitQuestion = () => {
        if (currentQuestion[currStep - 1]?.type === 'option') {
            if (!currentQuestion[currStep - 1]?.selectedQuestion?.option_id) {
                showMessage({
                    isVisible: true,
                    message: 'Please select an option',
                    type: 'Error',
                });
            } else {
                if (currStep < totalSteps + 1) {
                    const data = {
                        option_id:
                            currentQuestion[currStep - 1]?.selectedQuestion
                                ?.option_id,
                        ques_id: currentQuestion[currStep - 1]?.question_id,
                        type: currentQuestion[currStep - 1]?.type,
                    };
                    getQuestions(data);
                }
            }
        } else {
            if (!DOB) {
                setDOBError(t('errorMessage:DOBRequired'));
            } else if (!gender) {
                setGenderError(t('errorMessage:genderRequired'));
            } else if (!country) {
                setCountryError(t('errorMessage:countryRequired'));
            } else if (currentQuestion[currStep - 1]?.diagnoses && !diagnosis) {
                setDiagnosisError(t('errorMessage:diagnosisRequired'));
            } else {
                const data = {
                    ques_id: currentQuestion[currStep - 1]?.question_id,
                    type: currentQuestion[currStep - 1]?.type,
                    dob: dateFormatForServer(DOB),
                    gender,
                    country: country?.name,
                    diagnosis:
                        currentQuestion[currStep - 1]?.diagnoses && diagnosis
                            ? diagnosis
                            : undefined,
                    // option_id: currentQuestion[currStep - 2]?.selectedQuestion?.option_id,
                };
                // setDOB('');
                // setCountry({});
                // setGender('');
                // setDiagnosis('');
                getQuestions(data);
                onChangeProfile();
            }
            // showMessage({
            //   isVisible: true,
            //   message: 'Please select an option',
            //   type: 'Error',
            // });
        }
    };

    const onBack = () => {
        if (currStep > 1) {
            boxPosition.value = 500;

            const temp = [...currentQuestion];
            temp.pop();
            if (temp[currStep - 2]?.selectedQuestion) {
                temp[currStep - 2]?.selectedQuestion?.reduce_steps &&
                    setTotalSteps((prev) => prev + 1);
            }
            boxPosition.value = withTiming(0, { duration: 1000 });

            setTimeout(() => {
                setCurrStep((prev) => prev - 1);
                // setCurrentQuestion(temp);
            });
            // carouselRef?.current?.snapToPrev();
        }
        carouselRef?.current?.snapToPrev();
    };

    useEffect(() => {
        getQuestions();
    }, []);

    const getQuestions = (data1?: any) => {
        setIsLoading(true);
        dispatch({
            type: 'QUESTIONS',
            payload: {
                data: data1 && data1,
                callback: (data: any) => {
                    const temp = [...currentQuestion];
                    temp.push(data);
                    setCurrentQuestion(temp);
                    setIsLoading(false);
                    setTimeout(() => {
                        setCurrStep((prev) => prev + 1);
                    });

                    currentQuestion[currStep - 1]?.selectedQuestion
                        ?.reduce_steps && setTotalSteps((prev) => prev - 1);
                    carouselRef?.current?.snapToNext();
                    // if (data1?.type) {
                    //   boxPosition.value = withTiming(500, { duration: 1000 }, () => {
                    //     boxPosition.value = 0;
                    //   });
                    // }
                },
                errorCallback: () => {
                    setIsLoading(false);
                },
            },
        });
    };

    const onChangeOption = (data: any) => {
        const temp = [...currentQuestion];
        const index = temp.findIndex(
            (el) => el?.question_id === data?.question_id
        );
        const a = { ...temp[index], selectedQuestion: { ...data } };

        if (index !== -1) {
            temp[index] = a;
        } else {
            temp.push(a);
        }
        setCurrentQuestion(temp);
    };

    const onChangeProfile = () => {
        const temp: any = [...currentQuestion];
        const data = {
            question_id: temp[currStep - 1]?.question_id,
            dob: DOB,
            gender,
            country: country?.name,
            diagnosis: diagnosis && diagnosis,
        };
        const index = temp.findIndex(
            (el: any) => el?.question_id === data?.question_id
        );
        const a = { ...temp[index], selectedQuestion: { ...data } };

        if (index !== -1) {
            temp[index] = a;
        } else {
            temp.push(a);
        }
        setCurrentQuestion(temp);
    };
    const boxPosition = useSharedValue(0);
    const headerStyle = useAnimatedStyle(() => {
        return {
            flex: 1,
            paddingVertical: 0,
            position: 'absolute',
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
            // marginLeft: boxPosition.value,
            backgroundColor: colors.defaultWhite,
            zIndex: 1000,
            borderRadius: 40,
            padding: 20,
            paddingBottom: 90,
            transform: [{ translateX: boxPosition.value }],
        };
    });

    // useEffect(() => {
    //   onChangeProfile();
    // }, []);

    const renderItem = ({ item, index }: { item: any; index: any }) => {
        return item ? (
            item?.type === 'option' ? (
                <QuestionEl onChange={onChangeOption} question={item} />
            ) : (
                <QuestionEl2
                    DOB={DOB}
                    DOBError={DOBError}
                    country={country}
                    countryError={countryError}
                    diagnosis={diagnosis}
                    diagnosisError={diagnosisError}
                    gender={gender}
                    genderError={genderError}
                    setCountry={setCountry}
                    setCountryError={setCountryError}
                    setDOB={setDOB}
                    setDOBError={setDOBError}
                    setDiagnosis={setDiagnosis}
                    setDiagnosisError={setDiagnosisError}
                    setGender={setGender}
                    setGenderError={setGenderError}
                    question={item}
                />
            )
        ) : (
            <View />
        );
    };

    let carouselRef: any = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <>
            {isLoading ? (
                <View style={styles.loadingContainer}>
                    <View style={styles.loadingWrapper}>
                        <ActivityIndicator
                            size={'large'}
                            color={colors.regentBlue}
                        />
                    </View>
                </View>
            ) : (
                <Container
                    style={{
                        backgroundColor: colors.background,
                        paddingTop: 20,
                    }}
                >
                    <ProgressBar
                        currentStep={currStep}
                        totalTotalSteps={totalSteps}
                    />
                    <ContainerWIthShadow
                        showShadow={currStep > 1}
                        leftButton={true}
                        rightButton
                        rightButtonPress={submitQuestion}
                        leftButtonPress={onBack}
                    >
                        {/* <Animated.View style={headerStyle}>
              {currentQuestion[currStep - 1]?.type === 'option' ? (
                <QuestionEl
                  onChange={onChangeOption}
                  question={currentQuestion[currStep - 1]}
                />
              ) : (
                <QuestionEl2
                  DOB={DOB}
                  DOBError={DOBError}
                  country={country}
                  countryError={countryError}
                  diagnosis={diagnosis}
                  diagnosisError={diagnosisError}
                  gender={gender}
                  genderError={genderError}
                  setCountry={setCountry}
                  setCountryError={setCountryError}
                  setDOB={setDOB}
                  setDOBError={setDOBError}
                  setDiagnosis={setDiagnosis}
                  setDiagnosisError={setDiagnosisError}
                  setGender={setGender}
                  setGenderError={setGenderError}
                  question={currentQuestion[currStep - 1]}
                />
              )}
            </Animated.View> */}
                        <View
                            style={{
                                backgroundColor: colors.defaultWhite,
                                flex: 1,
                                borderRadius: 40,
                                padding: 20,
                                paddingBottom: 90,
                            }}
                        >
                            <Carousel
                                ref={carouselRef}
                                data={currentQuestion}
                                renderItem={renderItem}
                                sliderWidth={SCREEN_WIDTH}
                                itemWidth={SCREEN_WIDTH - 40}
                                inactiveSlideScale={0.8}
                                inactiveSlideOpacity={0.4}
                                enableSnap
                                onSnapToItem={(v) => {
                                    setActiveIndex(v);
                                }}
                            />
                        </View>
                    </ContainerWIthShadow>
                </Container>
            )}
        </>
    );
};

export default Questions;
