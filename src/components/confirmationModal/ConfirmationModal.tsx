import React from 'react';
import { Text, View } from 'react-native';
import Modal from 'react-native-modal';
import { globalStyle } from 'src/constants/global.style';
import CustomButton from '../customButton/CustomButton';
import styles from './Modal.style';

type TConfirmationModal = {
    isOpen: boolean;
    onClose?: () => void;
    heading?: string;
    title: string;
    submitButtonText: string;
    onPress?: () => void;
    submitButtonIcon?: React.ReactElement;
    isLoading?: boolean;
};

const ConfirmationModal = ({
    isOpen,
    onClose,
    heading,
    title,
    submitButtonText,
    onPress,
    submitButtonIcon,
    isLoading,
}: TConfirmationModal) => {
    return (
        <Modal
            hasBackdrop
            isVisible={isOpen}
            swipeDirection={['down']}
            onSwipeComplete={onClose}
            onBackButtonPress={onClose}
            onBackdropPress={onClose}
        >
            <View style={styles.container}>
                <View style={[globalStyle.center]}>
                    {heading ? (
                        <Text style={[globalStyle.heading]}>{heading}</Text>
                    ) : null}
                </View>
                <Text style={styles.text}>{title}</Text>

                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <CustomButton
                        title='Cancel'
                        onPress={onClose}
                        btnType='delete'
                        style={{ height: 50, marginTop: 20, width: 120 }}
                    />
                    <CustomButton
                        title={submitButtonText}
                        onPress={() => {
                            onPress
                                ? onPress()
                                : console.debug('onPress undefined');
                        }}
                        isLoading={isLoading}
                        style={{ height: 50, marginTop: 20, width: 120 }}
                    />
                </View>
            </View>
        </Modal>
    );
};

export default ConfirmationModal;
