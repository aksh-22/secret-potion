import React from 'react';
import {
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

import colors from 'src/constants/colors';
import { fonts } from 'src/constants/fonts';

type Props = {
    onClosePress?: () => void;
    onChangeText?: (text: string) => void;
};

const SearchModal = ({ onClosePress, onChangeText }: Props) => {
    const insets = useSafeAreaInsets();
    return (
        <View style={{ ...styles.container, top: insets.top }}>
            <TextInput
                onChangeText={onChangeText}
                autoFocus
                placeholder='Search'
                placeholderTextColor={colors.placeholderColor}
                style={styles.input}
            />
            <TouchableOpacity onPress={onClosePress}>
                <Ionicons name='close' size={25} color={colors.regentBlue} />
            </TouchableOpacity>
        </View>
    );
};

export default SearchModal;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: StatusBar.currentHeight,
        left: 0,
        right: 0,
        height: 50,
        backgroundColor: colors.defaultWhite,
        borderRadius: 10,
        zIndex: 1000,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderColor: colors.borderColor,
    },
    input: {
        flex: 1,
        height: '100%',
        color: colors.defaultBlack,
        fontFamily: fonts.regular,
        fontSize: 16,
    },
});
