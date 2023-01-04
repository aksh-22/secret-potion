import React, { ReactNode } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import Modal from 'react-native-modal';
import colors from 'src/constants/colors';
import { SCREEN_HEIGHT } from 'src/constants/deviceInfo';

type TConfirmationModal = {
  isOpen: boolean;
  onClose?: () => void;
  children?: ReactNode;
  childrenStyle?: ViewStyle;
  childrenViewStyle?: ViewStyle;
  iconViewStyle?: ViewStyle;
  icon?: ReactNode;
};

const CustomModal = ({
  isOpen,
  onClose,
  children,
  childrenStyle,
  childrenViewStyle,
  icon,
  iconViewStyle,
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
      style={[{ justifyContent: 'flex-end' }, childrenStyle]}
    >
      <View
        style={[
          {
            backgroundColor: colors.defaultWhite,
            borderRadius: 10,
          },
          childrenViewStyle,
        ]}
      >
        {icon && (
          <View
            style={[
              {
                backgroundColor: colors.defaultWhite,
                padding: 10,
                borderRadius: 100,
                marginTop: -10,
                alignSelf: 'center',
              },
              iconViewStyle,
            ]}
          >
            {icon}
          </View>
        )}
        {children}
      </View>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  centerModal: {
    marginBottom: (SCREEN_HEIGHT * 40) / 100,
    borderRadius: 10,
    marginHorizontal: 20,
  },
  bottomSheet: {},
});
