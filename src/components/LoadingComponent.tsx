import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import colors from 'src/constants/colors';
import { globalStyle } from 'src/constants/global.style';

type Props = {};

const LoadingComponent = (props: Props) => {
    return (
        <View style={styles.loadingContainer}>
            <View style={styles.loadingWrapper}>
                <ActivityIndicator size={'large'} color={colors.profile1} />
            </View>
        </View>
    );
};

export default LoadingComponent;

const styles = StyleSheet.create({
    loadingContainer: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        position: 'absolute',
        backgroundColor: colors.blackOpacity2,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    loadingWrapper: {
        padding: 20,
        borderRadius: 10,
        backgroundColor: colors.regentBlueOpacity,
        ...globalStyle.shadow3,
    },
});
