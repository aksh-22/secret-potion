import { View, Text } from 'react-native';
import React from 'react';
import editStyle from './edit.style';
import { globalStyle } from 'src/constants/global.style';
import CustomButton from 'src/components/customButton/CustomButton';

type Props = {
    onCancel?: () => void;
    heading?: string;
    title: string;
    submitButtonText: string;
    onPress?: () => void;
    submitButtonIcon?: React.ReactElement;
    isLoading?: boolean;
};

const Delete = ({
    heading,
    title,
    onCancel,
    submitButtonText,
    onPress,
    isLoading,
}: Props) => {
    return (
        <>
            <View style={[globalStyle.center]}>
                {heading ? (
                    <Text
                        style={[globalStyle.heading, { textAlign: 'center' }]}
                    >
                        {heading}
                    </Text>
                ) : null}
            </View>
            <Text style={[editStyle.text, { textAlign: 'center' }]}>
                {title}
            </Text>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <CustomButton
                    title='Cancel'
                    onPress={onCancel}
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
        </>
    );
};

export default Delete;
