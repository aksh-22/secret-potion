import React, { useEffect, useRef, useState } from 'react';
import {
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    View,
    ViewStyle,
} from 'react-native';
import Badge from 'src/assets/svg/bullet.svg';
import colors from 'src/constants/colors';
import { fonts } from 'src/constants/fonts';

type Props = {
    onChange?: (data: any) => void;
    tabs: { name: string }[];
    activeTab?: number;
    badges?: number[];
    tabStyle?: ViewStyle;
    containerStyle?: ViewStyle;
};

const TabSelector = ({
    onChange,
    tabs,
    activeTab,
    badges,
    tabStyle,
    containerStyle,
}: Props) => {
    const [selectedTab, setSelectedTab] = useState(activeTab ? activeTab : 0);

    useEffect(() => {
        setSelectedTab(activeTab ? activeTab : 0);
        setTimeout(() => {
            flatListRef?.current?.scrollToIndex({
                index: selectedTab,
                animated: true,
            });
        }, 200);
    }, [activeTab]);

    const flatListRef = useRef(null);

    const renderItem = ({ item, index }) => (
        <Pressable
            key={index}
            style={[
                selectedTab === index ? styles.activeTab : styles.inActiveTab,
                tabStyle,
                {
                    borderBottomColor:
                        selectedTab === index
                            ? item?.color ?? colors.regentBlue
                            : colors.transparent,
                    backgroundColor:
                        selectedTab === index
                            ? item?.backgroundColor ?? colors.transparent
                            : colors.transparent,
                },
            ]}
            onPress={() => {
                setSelectedTab(index);
                onChange && onChange(item);
                // flatListRef?.current?.scrollToIndex({
                //     index: index,
                //     animated: true,
                // });
            }}
        >
            <Text
                // onPress={() => {
                //     setSelectedTab(index);
                //     onChange && onChange(item);
                // }}
                style={[
                    selectedTab === index
                        ? styles.activeTabText
                        : styles.inActiveTabText,
                    {
                        color:
                            selectedTab === index
                                ? item?.color ?? colors.regentBlue
                                : item?.color ?? colors.lightBlack,
                    },
                ]}
                // allowFontScaling={false}
            >
                {item?.name}
            </Text>
            {badges?.length && (
                <View style={{ marginLeft: 10 }}>
                    <Badge height={20} />
                    <View
                        style={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Text
                            style={{
                                fontFamily: fonts.regular,
                                fontSize: 10,
                                lineHeight: 12,
                                color: colors.defaultWhite,
                            }}
                        >
                            {badges[index]}
                        </Text>
                    </View>
                </View>
            )}
        </Pressable>
    );

    return (
        <View style={[styles.container, containerStyle]}>
            {/* <ScrollView horizontal>
                {tabs.map((item, index) => renderItem({ item, index }))}
            </ScrollView> */}
            <FlatList
                ref={flatListRef}
                horizontal
                data={tabs}
                renderItem={renderItem}
                bounces={false}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1 }}
                onScrollToIndexFailed={(info) => {
                    const wait = new Promise((resolve) =>
                        setTimeout(resolve, 500)
                    );
                    wait.then(() => {
                        flatListRef.current?.scrollToIndex({
                            index: info.index,
                            animated: true,
                        });
                    });
                }}
            />
        </View>
    );
};

export default TabSelector;

const styles = StyleSheet.create({
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: colors.regentBlue,
        // flex: 1,
        textAlign: 'center',
        color: colors.defaultBlack,
        fontFamily: fonts.regular,
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 19,
        paddingBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        // width: SCREEN_WIDTH * 0.5,
        // minWidth: '40%',
    },
    activeTabText: {
        textAlign: 'center',
        color: colors.regentBlue,
        fontFamily: fonts.regular,
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 19,
    },
    inActiveTab: {
        paddingHorizontal: 20,
        paddingBottom: 10,
        borderBottomWidth: 2,
        borderBottomColor: colors.transparent,
        textAlign: 'center',
        color: colors.defaultBlack,
        fontFamily: fonts.regular,
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 19,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.5,
    },
    inActiveTabText: {
        textAlign: 'center',
        color: colors.lightBlack,
        fontFamily: fonts.regular,
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 19,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.defaultWhite,
    },
});
