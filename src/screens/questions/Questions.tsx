import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { Country } from 'react-native-country-picker-modal';
import { useDispatch } from 'react-redux';
import Container from 'src/components/container/Container';
import ContainerWIthShadow from 'src/components/container/ContainerWIthShadow';
import LoadingComponent from 'src/components/LoadingComponent';
import { showMessage } from 'src/components/messageModal/MessageModal';
import ProgressBar from 'src/components/ProgressBar';
import colors from 'src/constants/colors';
import { dateFormatForServer } from 'src/utils/dateFormatter';
import { optionsItemType, questionType } from 'typings/question';
import QuestionEl from './QuestionEl';
import QuestionEl2 from './QuestionEl2';

import dayjs from 'dayjs';
import DateAndTimePicker1 from 'src/components/dateAndTimePicker/DateAndTimePicker';
import { SCREEN_HEIGHT } from 'src/constants/deviceInfo';
import { globalStyle } from 'src/constants/global.style';

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
    const [show, setShow] = useState(false);

    // !------------------------------------------!

    const dispatch = useDispatch();

    const { t } = useTranslation();

    const onDateChange = (val) => {
        setDOB(val);
        setDOBError('');
        // if (event?.type === 'set') {
        // }
        // setShow(false);
    };

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
            }
            if (!gender) {
                setGenderError(t('errorMessage:genderRequired'));
            }
            if (!country) {
                setCountryError(t('errorMessage:countryRequired'));
            }
            if (DOB && gender && country) {
                const data = {
                    ques_id: currentQuestion[currStep - 1]?.question_id,
                    type: currentQuestion[currStep - 1]?.type,
                    dob: dateFormatForServer(DOB),
                    gender,
                    country: country?.name,
                    country_code: country?.cca2,
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
            const temp = [...currentQuestion];
            temp.pop();
            if (temp[currStep - 2]?.selectedQuestion) {
                temp[currStep - 2]?.selectedQuestion?.reduce_steps &&
                    setTotalSteps((prev) => prev + 1);
            }

            setTimeout(() => {
                setCurrStep((prev) => prev - 1);
                setCurrentQuestion(temp);
            });
        }
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

    // useEffect(() => {
    //   onChangeProfile();
    // }, []);

    return (
        <>
            {isLoading && <LoadingComponent />}
            <Container
                statusBarColor={colors.background}
                style={{ backgroundColor: colors.background, paddingTop: 20 }}
            >
                <ProgressBar
                    currentStep={currStep}
                    totalTotalSteps={totalSteps}
                />
                <ContainerWIthShadow
                    showShadow
                    leftButton={currStep > 1}
                    rightButton
                    rightButtonPress={submitQuestion}
                    leftButtonPress={onBack}
                    containerStyle={globalStyle.shadow}
                    mainContainerStyle2={{ paddingBottom: 100 }}
                >
                    <View
                        style={{
                            backgroundColor: colors.defaultWhite,
                            // flex: 1,
                            borderRadius: 40,
                            padding: 20,
                            minHeight: SCREEN_HEIGHT * 0.65,
                        }}
                    >
                        {currentQuestion[currStep - 1] ? (
                            currentQuestion[currStep - 1]?.type === 'option' ? (
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
                                    setShow={setShow}
                                />
                            )
                        ) : (
                            <View />
                        )}
                    </View>
                </ContainerWIthShadow>
            </Container>
            <DateAndTimePicker1
                maxDate={dayjs(new Date()).subtract(18, 'year').toDate()}
                show={show}
                value={
                    DOB ? DOB : dayjs(new Date()).subtract(18, 'year').toDate()
                }
                onChange={onDateChange}
                onClose={setShow}
                mode='date'
                // mode=''
            />
        </>
    );
};

export default Questions;
