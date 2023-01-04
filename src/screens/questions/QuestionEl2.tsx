import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import CustomCountryPicker from 'src/components/CustomCountryPicker';
import CustomInput from 'src/components/customInput/CustomInput';
import DateAndTimePicker from 'src/components/DateAndTimePicker';
import GenderSelect from 'src/components/GenderSelect';
import colors from 'src/constants/colors';
import { fonts } from 'src/constants/fonts';
import { questionType } from 'typings/question';

type Props = {
    question: questionType;
    onChange?: (data: any) => void;
    DOB: any;
    setDOB: any;
    DOBError: any;
    setDOBError: any;
    gender: any;
    setGender: any;
    genderError: any;
    setGenderError: any;
    country: any;
    setCountry: any;
    countryError: any;
    setCountryError: any;
    diagnosis: any;
    setDiagnosis: any;
    diagnosisError: any;
    setDiagnosisError: any;
    setShow: any;
};

const QuestionEl2 = ({
    question,
    onChange,
    DOB,
    DOBError,
    country,
    countryError,
    diagnosis,
    diagnosisError,
    gender,
    genderError,
    setCountry,
    setCountryError,
    setDiagnosis,
    setDiagnosisError,
    setGender,
    setGenderError,
    setShow,
}: Props) => {
    const { t } = useTranslation();

    return (
        <>
            <View style={{ paddingBottom: question?.diagnoses ? 10 : 50 }}>
                <Text style={styles.question}>{question?.question}</Text>
                <View style={{ marginTop: 30 }}>
                    <DateAndTimePicker
                        // showLabel={false}
                        borderColor={colors.lightBlack2}
                        style={{ marginTop: 20 }}
                        // onDateChange={(date) => setDOB(date)}
                        onPress={() => setShow(true)}
                        date={DOB}
                        errorMessage={DOBError}
                    />
                    <GenderSelect
                        value={gender}
                        errorMessage={genderError}
                        onChange={(gen) => {
                            if (gen) {
                                setGender(gen);
                                setGenderError('');
                            }
                        }}
                    />
                    <CustomCountryPicker
                        value={country}
                        errorMessage={countryError}
                        onCountrySelect={(countryData) => {
                            setCountryError('');
                            setCountry(countryData);
                        }}
                    />
                    {question?.diagnoses ? (
                        <View style={{ marginTop: 30 }}>
                            <Text
                                style={[
                                    styles.text2,
                                    { paddingBottom: 0, marginBottom: -10 },
                                ]}
                            >
                                {t('questions:diagnosis')}
                            </Text>
                            <CustomInput
                                onChangeText={(text) => {
                                    setDiagnosisError('');
                                    setDiagnosis(text);
                                }}
                                showLabel={false}
                                inputBoxStyle={{ marginTop: 0, paddingTop: 0 }}
                                inputTextStyle={{ marginTop: 0, paddingTop: 0 }}
                                value={diagnosis}
                                errorMessage={diagnosisError}
                                placeholder={t('questions:writeHere')}
                            />
                        </View>
                    ) : null}
                </View>
            </View>
        </>
    );
};

export default QuestionEl2;

const styles = StyleSheet.create({
    question: {
        color: colors.defaultBlack,
        fontWeight: '400',
        lineHeight: 29,
        fontSize: 24,
        marginTop: 30,
        fontFamily: fonts.regular,
    },
    text2: {
        fontSize: 15,
        lineHeight: 18,
        color: colors.placeholderColor,
        paddingBottom: 10,
        fontFamily: fonts.regular,
    },
});
