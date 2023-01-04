import React from 'react';
import { I18nManager, StyleProp, View, ViewStyle } from 'react-native';

import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import colors from 'src/constants/colors';
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

type IProps = {
    style?: StyleProp<ViewStyle>;
};

const Shimmer = ({ style }: IProps) => {
    return (
        <ShimmerPlaceholder
            visible={false}
            isReversed={I18nManager.isRTL ? true : false}
            shimmerColors={[
                colors.background2,
                colors.background,
                colors.background2,
            ]}
            shimmerStyle={[
                {
                    backgroundColor: colors.whiteOpacity,
                    height: '100%',
                    width: 40,
                },
                style,
            ]}
        ></ShimmerPlaceholder>
    );
};

export default Shimmer;
