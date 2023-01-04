import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import colors from 'src/constants/colors';
import { SCREEN_HEIGHT } from 'src/constants/deviceInfo';
import { fonts } from 'src/constants/fonts';
import { useKeyboard } from 'src/hooks/useKeyboard';
import CustomButton from './customButton/CustomButton';
import CustomDropdown from './CustomDropdown';
import CustomInput from './customInput/CustomInput';
import { showMessage } from './messageModal/MessageModal';

type MProps = {
    show: boolean;
    onClose: () => void;
    id: any;
    onSuccess: () => void;
};

const BlockUserModal = ({ show, onClose, id, onSuccess }: MProps) => {
    const modalizeRef = useRef<Modalize>(null);
    const [value, setValue] = useState(null);

    const onChange = (id) => {
        setValue(id);
    };

    const { open } = useKeyboard();

    const { t } = useTranslation();

    const [reason, setReason] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = () => {
        if (reason?.trim().length < 1) {
            showMessage({
                isVisible: true,
                message: 'Please provide a reason to report this user',
                type: 'Error',
            });
        } else {
            submitRequest();
        }
    };

    const submitRequest = async () => {
        Alert.alert('aa');
        // setIsLoading(true);
        // const dataToSent = {
        //     reported_user: id,
        //     reason,
        //     complaint_option_id: value !== 0 ? value : undefined,
        // };
        // await reportUser(dataToSent)
        //     .then((res) => {
        //         showMessage({
        //             isVisible: true,
        //             message: 'Thank you!',
        //             message2: 'We will review your request.',
        //             type: 'Success',
        //         });
        //         setReason('');
        //         onSuccess();
        //     })
        //     .finally(() => {
        //         setIsLoading(false);
        //         onClose();
        //     });
    };

    useEffect(() => {
        show ? modalizeRef.current?.open() : modalizeRef.current?.close();
    }, [show]);

    return (
        <Modalize
            onClosed={onClose}
            ref={modalizeRef}
            handlePosition='inside'
            onClose={onClose}
            onOverlayPress={onClose}
            closeOnOverlayTap={!open}
            modalHeight={SCREEN_HEIGHT}
            rootStyle={{ borderRadius: 0 }}
            handleStyle={{ backgroundColor: colors.background }}
        >
            <View style={[styles.container]}>
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
        </Modalize>
    );
};

export default BlockUserModal;

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.defaultWhite,
        padding: 10,
        margin: 20,
    },
});
