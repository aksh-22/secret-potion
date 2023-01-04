import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { reportUser } from 'src/api/profileService';
import Container from 'src/components/container/Container';
import CustomButton from 'src/components/customButton/CustomButton';
import CustomDropdown from 'src/components/CustomDropdown';
import CustomInput from 'src/components/customInput/CustomInput';
import { showMessage } from 'src/components/messageModal/MessageModal';
import colors from 'src/constants/colors';
import { fonts } from 'src/constants/fonts';
import LeftArrow from 'src/assets/svg/backIcon.svg';

type Props = {
    navigation: any;
    route: any;
};

const ReportUser = ({ navigation, route }: Props) => {
    const { id, userReported } = route?.params;

    const [value, setValue] = useState(null);

    const onChange = (idVal) => {
        setValue(idVal);
    };

    const [reason, setReason] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = () => {
        if (reason?.trim().length < 1) {
            showMessage({
                isVisible: true,
                message:
                    'Please explain your reasons to report this user in more detail.',
                type: 'Error',
            });
        } else {
            submitRequest();
        }
    };

    const submitRequest = async () => {
        setIsLoading(true);
        const dataToSent = {
            reported_user: id,
            reason,
            complaint_option_id: value !== 0 ? value : undefined,
        };
        await reportUser(dataToSent)
            .then((res) => {
                showMessage({
                    isVisible: true,
                    message: 'Thank you!',
                    message2: 'We will review your request.',
                    type: 'Success',
                });
                setReason('');
                userReported();
                navigation.goBack();
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <Container statusBarColor={colors.defaultWhite}>
            <Pressable
                hitSlop={10}
                style={{ marginLeft: 20, marginTop: 10 }}
                onPress={() => navigation.goBack()}
            >
                <LeftArrow fill={colors.defaultBlack} />
            </Pressable>
            <View style={styles.container}>
                <Text
                    style={{
                        fontFamily: fonts.regular,
                        fontSize: 25,
                        lineHeight: 35,
                        fontWeight: '300',
                        color: colors.defaultBlack,
                    }}
                >
                    To help us take an appropriate action, please select a
                    reason why you are reporting this user.
                </Text>
                <Text
                    style={{
                        fontFamily: fonts.regular,
                        fontSize: 15,
                        lineHeight: 18,
                        fontWeight: '300',
                        color: colors.lightBlack,
                        marginVertical: 20,
                    }}
                >
                    If someone is in immediate danger, please call the local
                    emergency services - don't wait to report to Secret Potion.
                </Text>
                <CustomDropdown onChange={onChange} value={value} />
                <View
                    style={{
                        backgroundColor: colors.background3,
                        borderRadius: 10,
                        padding: 10,
                    }}
                >
                    <CustomInput
                        multiline
                        showLabel={false}
                        value={reason}
                        borderColor={colors.transparent}
                        focusedBorderColor={colors.transparent}
                        // placeholder='Write you reason here...'
                        onChangeText={(text) => {
                            setReason(text);
                        }}
                        inputBoxStyle={{
                            marginTop: 0,
                            flex: 1,
                            justifyContent: 'flex-start',
                        }}
                        inputTextStyle={{
                            minHeight: 150,
                            marginTop: -20,
                            maxHeight: 200,
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
            </View>
        </Container>
    );
};

export default ReportUser;

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.defaultWhite,
        margin: 20,
    },
});
