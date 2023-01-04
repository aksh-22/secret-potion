import React from 'react';
import { View, Text, ViewStyle, FlatList } from 'react-native';
import colors from 'src/constants/colors';
import { SCREEN_WIDTH } from 'src/constants/deviceInfo';
import Shimmer from './Shimmer';
interface ShimmerProps {
    count?: number;
    style?: ViewStyle;
    numColumns?: number;
}

const DiaryShimmer = ({ count, style, numColumns = 3 }: ShimmerProps) => {
    const renderItem = ({ item, index }: any) => (
        <Shimmer
            key={item}
            style={[
                {
                    width: SCREEN_WIDTH * 0.3,
                    height: 100,
                    margin: 5,
                },
                style,
            ]}
        />
    );

    return (
        <>
            <FlatList
                showsVerticalScrollIndicator={false}
                style={{ flex: 1 }}
                contentContainerStyle={{ flexGrow: 1 }}
                numColumns={numColumns}
                data={[...Array(count).keys()]}
                renderItem={renderItem}
            />
        </>
    );
};

export default DiaryShimmer;
