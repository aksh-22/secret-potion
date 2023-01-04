import React from 'react';
import { FlatList, View, ViewStyle } from 'react-native';
import { SCREEN_WIDTH } from 'src/constants/deviceInfo';
import Shimmer from './Shimmer';
interface ShimmerProps {
    count?: number;
    style?: ViewStyle;
}

const PostShimmer = ({ count, style }: ShimmerProps) => {
    const renderItem = ({ item, index }: any) => (
        <Shimmer
            key={index}
            style={[
                {
                    height: 200,
                    borderRadius: 10,
                    marginTop: 30,
                    width: SCREEN_WIDTH - 50,
                },
                style,
            ]}
        />
    );

    return (
        <FlatList
            showsVerticalScrollIndicator={false}
            style={{ flex: 1 }}
            contentContainerStyle={{
                flexGrow: 1,
                alignItems: 'center',
                paddingBottom: 100,
            }}
            data={[...Array(count).keys()]}
            renderItem={renderItem}
        />
    );
};

export default PostShimmer;
