import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import React from 'react';
import Shimmer from './Shimmer';
import { SCREEN_WIDTH } from 'src/constants/deviceInfo';

interface ShimmerProps {
    count?: number;
    style?: ViewStyle;
}

const RequestShimmer = ({ count = 1, style }: ShimmerProps) => {
    return (
        <View
            style={[{ justifyContent: 'center', alignItems: 'center' }, style]}
        >
            {[...Array(count).keys()].map((el, index) => (
                <Shimmer
                    key={index}
                    style={{
                        height: 40,
                        borderRadius: 10,
                        marginTop: 20,
                        width: SCREEN_WIDTH - 50,
                    }}
                />
            ))}
        </View>
    );
};

export default RequestShimmer;

const styles = StyleSheet.create({});
