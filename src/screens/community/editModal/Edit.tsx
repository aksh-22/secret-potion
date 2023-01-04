import { View, Text, TextInput } from 'react-native';
import React from 'react';
import colors from 'src/constants/colors';
import { fonts } from 'src/constants/fonts';
import editStyle from './edit.style';
import CustomButton from 'src/components/customButton/CustomButton';
import { commentType } from 'typings/commentType';

type Props = {
    selectedData: commentType;
    updateLoading: boolean;
    onChangeText: (txt: string) => void;
    updateComment: () => void;
    onClose: () => void;
};

const Edit = ({
    selectedData,
    updateLoading,
    updateComment,
    onClose,
    onChangeText,
}: Props) => {
    return (
        <>
            <View style={editStyle.inputWrapper}>
                <TextInput
                    textAlignVertical='top'
                    placeholderTextColor={colors.placeholderColor}
                    defaultValue={selectedData?.comment}
                    multiline
                    // onChangeText={(txt) => setText(txt)}
                    onChangeText={onChangeText}
                    style={{
                        flex: 1,
                        color: colors.defaultBlack,
                        fontFamily: fonts.regular,
                        maxHeight: 150,
                    }}
                />
            </View>
            <View style={editStyle.buttonWrapper}>
                <CustomButton
                    isLoading={updateLoading}
                    style2={editStyle.button}
                    style={editStyle.button2}
                    title='Update'
                    btnType='normal'
                    onPress={updateComment}
                />
                <CustomButton
                    style2={editStyle.button}
                    style={editStyle.button2}
                    onPress={onClose}
                    title='Cancel'
                    btnType='cancel'
                />
            </View>
        </>
    );
};

export default Edit;
