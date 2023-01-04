import React, { useEffect, useRef, useState } from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';
import { Modalize } from 'react-native-modalize';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import ConfirmationModal from 'src/components/confirmationModal/ConfirmationModal';
import colors from 'src/constants/colors';
import { fonts } from 'src/constants/fonts';

type Props = {
    onClose?: () => void;
    show?: boolean;
    onEditPress?: () => void;
    onDeletePress?: () => void;
    isLoading?: boolean;
    style?: ViewStyle;
    date?: any;
    edit?: boolean;
    editText?: string;
    deleteText?: string;
};

const BottomModal = ({
    onClose,
    show,
    onDeletePress,
    onEditPress,
    isLoading,
    style,
    date,
    edit,
    deleteText = 'Delete Post',
    editText = 'Edit post',
}: Props) => {
    const modalizeRef = useRef<Modalize>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [openConfirmationModal, setOpenConfirmationModal] = useState(false);

    useEffect(() => {
        show && modalizeRef.current?.open();
        isModalOpen && !show && modalizeRef.current?.close();
    }, [show]);

    return (
        <Modalize
            onOpened={() => setIsModalOpen(true)}
            onClosed={() => setIsModalOpen(false)}
            ref={modalizeRef}
            handlePosition='inside'
            adjustToContentHeight
            onClose={onClose}
            useNativeDriver={true}
            rootStyle={{
                shadowColor: colors.blackOpacity,
                shadowOffset: {
                    width: 0,
                    height: 4,
                },
                shadowOpacity: 0.82,
                shadowRadius: 2.65,
                elevation: 2,
            }}
            avoidKeyboardLikeIOS
            handleStyle={{ backgroundColor: colors.defaultBlack2 }}
        >
            <View
                style={[
                    {
                        backgroundColor: colors.defaultWhite,
                        flex: 1,
                        paddingBottom: 120,
                        borderRadius: 20,
                        justifyContent: 'center',
                        padding: 30,
                    },
                    style,
                ]}
            >
                {!edit ? (
                    <>
                        <TouchableOpacity
                            style={{ paddingBottom: 20 }}
                            onPress={onEditPress}
                        >
                            <Text style={styles.text}>{editText}</Text>
                        </TouchableOpacity>
                        <View
                            style={{
                                backgroundColor: '#EAEAEA',
                                height: 1,
                                // marginVertical: 20,
                            }}
                        />
                    </>
                ) : null}

                {isLoading ? (
                    <View
                        style={{
                            marginTop: 20,
                            alignSelf: 'flex-start',
                            marginLeft: 20,
                            // justifyContent: 'center',
                            // alignItems: 'center',
                        }}
                    >
                        <ActivityIndicator color={colors.red} />
                    </View>
                ) : (
                    <TouchableOpacity
                        style={{ paddingTop: 20 }}
                        onPress={() => {
                            // onDeletePress();
                            setOpenConfirmationModal(true);
                            // onClose();
                        }}
                    >
                        <Text style={[styles.text, { color: colors.red }]}>
                            {deleteText}
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
            <ConfirmationModal
                isOpen={openConfirmationModal}
                onClose={() => setOpenConfirmationModal(false)}
                title='Are you sure you want to delete?'
                submitButtonText='Yes'
                submitButtonIcon={
                    <IoniconsIcon
                        name='ios-settings'
                        color={colors.defaultWhite}
                    />
                }
                onPress={onDeletePress}
                isLoading={isLoading}
                // Linking.openSettings().then((res) => setOpenConfirmationModal(false))
            />
        </Modalize>
    );
};

export default BottomModal;

const styles = StyleSheet.create({
    text: {
        fontFamily: fonts.regular,
        fontWeight: '300',
        fontSize: 16,
        lineHeight: 19,
    },
});
