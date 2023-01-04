import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import colors from 'src/constants/colors';
import editStyle from './edit.style';

type Props = {
    onEditPress: () => void;
    onDeletePress: () => void;
};

const Menu = ({ onEditPress, onDeletePress }: Props) => {
    return (
        <View>
            <TouchableOpacity onPress={onEditPress}>
                <Text style={editStyle.text}>Edit Comment</Text>
            </TouchableOpacity>
            <View
                style={{
                    backgroundColor: '#EAEAEA',
                    height: 1,
                    marginVertical: 20,
                }}
            />
            <TouchableOpacity onPress={onDeletePress}>
                <Text style={[editStyle.text, { color: colors.red }]}>
                    Delete Comment
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default Menu;
