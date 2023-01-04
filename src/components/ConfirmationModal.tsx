import React from 'react';
import { Text, TextStyle, View } from 'react-native';
import Modal from 'react-native-modal';
import colors from 'src/constants/colors';
import { fonts } from 'src/constants/fonts';
import { globalStyle } from 'src/constants/global.style';
import CustomButton from './customButton/CustomButton';

type TConfirmationModal = {
    isOpen: boolean;
    onClose?: () => void;
    heading?: string;
    title: string;
    submitButtonText: string;
    onPress?: () => void;
    submitButtonIcon?: React.ReactElement;
    isLoading?: boolean;
    headingStyle?: TextStyle;
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
    headingStyle,
}: TConfirmationModal) => {
    return (
        <Modal
            hasBackdrop
            isVisible={isOpen}
            swipeDirection={['down']}
            onSwipeComplete={onClose}
            onBackButtonPress={onClose}
            onBackdropPress={onClose}
            // useNativeDriver={true}
            // style={{ justifyContent: "center" }}
        >
            <View
                style={{
                    marginHorizontal: 10,
                    minHeight: 170,
                    maxHeight: 400,
                    padding: 20,
                    backgroundColor: colors.defaultWhite,
                    borderRadius: 13,
                }}
            >
                {heading ? (
                    <View style={[globalStyle.center]}>
                        <Text style={[globalStyle.heading, headingStyle]}>
                            {heading}
                        </Text>
                    </View>
                ) : null}
                <Text
                    style={{
                        fontFamily: fonts.regular,
                        fontSize: 17,
                        paddingTop: 15,
                        textAlign: 'center',
                        color: colors.defaultBlack,
                    }}
                >
                    {title}
                </Text>

                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: 20,
                    }}
                >
                    <CustomButton
                        onPress={onClose}
                        title='Cancel'
                        // style={{ height: 50, marginTop: 20, width: 130 }}
                    />
                    <CustomButton
                        btnType='delete'
                        onPress={() => {
                            onPress
                                ? onPress()
                                : console.debug('onPress undefined');
                        }}
                        isLoading={isLoading}
                        title={submitButtonText}
                        // style={{ height: 50, marginTop: 20, width: 130 }}
                    />
                </View>
            </View>
        </Modal>
    );
};

export default ConfirmationModal;
