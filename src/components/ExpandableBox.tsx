import React, { ReactElement, useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import colors from 'src/constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { globalStyle } from 'src/constants/global.style';

type Props = {
    parent: ReactElement;
    children: ReactElement | any;
    style?: ViewStyle;
};

const ExpandableBox = ({ parent, children, style }: Props) => {
    const [expand, setExpand] = useState(false);

    useEffect(() => {
        setExpand(false);
    }, [parent, children]);

    const rotate = useSharedValue<any>('180deg');

    useEffect(() => {
        if (!expand) {
            rotate.value = withTiming('0deg');
        } else {
            rotate.value = withTiming('90deg');
        }
    }, [expand]);

    const iconStyles = useAnimatedStyle(() => {
        return {
            transform: [{ rotate: rotate.value }],
        };
    });

    return (
        <View
            style={[
                {
                    backgroundColor: colors.defaultWhite,

                    marginBottom: 20,
                    // ...globalStyle.shadow,
                },
                style,
            ]}
        >
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                    setExpand((prev) => !prev);
                }}
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 20,
                    borderRadius: 10,
                    backgroundColor: colors.defaultWhite,
                    ...globalStyle.shadow,
                }}
            >
                <Text style={{ flex: 1 }}>{parent}</Text>
                <Animated.View style={[iconStyles]}>
                    <Ionicons
                        size={20}
                        name='chevron-forward-outline'
                        color={colors.lightBlack}
                    />
                </Animated.View>
            </TouchableOpacity>
            <Collapsible collapsed={!expand}>{children}</Collapsible>
        </View>
    );
};

export default ExpandableBox;

const styles = StyleSheet.create({});
