import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import colors from 'src/constants/colors';
import { fonts } from 'src/constants/fonts';
import { SCREEN_WIDTH } from 'src/constants/deviceInfo';

type Props = {
    onChange?: (data: any) => void;
    tabs: { name: string }[];
    activeTab?: number;
    badges?: number[];
    tabStyle?: ViewStyle;
};

const BreadCrumbTab = ({
    tabs,
    activeTab,
    badges,
    onChange,
    tabStyle,
}: Props) => {
    const [selectedTab, setSelectedTab] = useState(
        activeTab ? activeTab - 1 : 0
    );

    useEffect(() => {
        setSelectedTab(activeTab ? activeTab - 1 : 0);
    }, [activeTab]);

    const flatListRef = useRef(null);

    const renderItem = ({ item, index }) => (
        <TouchableOpacity
            onPress={() => {
                setSelectedTab(index);
                onChange && onChange(item);
            }}
            style={[
                styles.tabWrapper,
                {
                    borderRightWidth: tabs.length === index + 1 ? 0 : 1,
                    // backgroundColor:
                    //   index === 0
                    //     ? colors.red
                    //     : index === 1
                    //     ? colors.green
                    //     : colors.yellowSea,
                },
            ]}
        >
            <Text
                style={[
                    styles.tabText,
                    {
                        color:
                            selectedTab === index
                                ? colors.defaultBlack
                                : colors.lightBlack,
                    },
                ]}
            >
                {item?.name}
            </Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                contentContainerStyle={{
                    flexGrow: 1,
                    justifyContent: 'space-between',
                }}
                showsVerticalScrollIndicator={false}
                ref={flatListRef}
                horizontal
                data={tabs}
                renderItem={renderItem}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
};

export default BreadCrumbTab;

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.defaultWhite,
        borderRadius: 10,
        paddingVertical: 10,
    },
    tabWrapper: {
        borderColor: colors.borderColor,
        // paddingHorizontal: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: SCREEN_WIDTH * 0.26,
        paddingVertical: 5,
        // height: 20,
    },
    tabText: {
        fontFamily: fonts.regular,
        fontSize: 16,
        lineHeight: 19,
        textAlign: 'center',
        fontWeight: '400',
    },
});
