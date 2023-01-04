import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import ContainerTabWithoutScroll from 'src/components/container/ContainerTabWithoutScroll';
import { useAppSelector } from 'src/hooks/reducer';
import { fonts } from 'src/constants/fonts';
import colors from 'src/constants/colors';
import Toggle from 'src/components/Toggle';
import { notificationType } from 'typings/notificationType';
import { useDispatch } from 'react-redux';
import LoadingComponent from 'src/components/LoadingComponent';

type Props = {
    onChange?: () => void;
};

const NotificationSettings = ({}: Props) => {
    const [isLoading, setIsLoading] = useState(false);

    const notificationSetting = useAppSelector(
        (state) => state?.userReducer?.notificationSettings
    );

    const dispatch = useDispatch();

    const onUpdate = (id: number) => {
        setIsLoading(true);
        dispatch({
            type: 'UPDATE_NOTIFICATION_SETTINGS',
            payload: {
                id,
                callback: () => {
                    setIsLoading(false);
                },
                errorCallback: () => {
                    setIsLoading(false);
                },
            },
        });
    };

    const renderItem = ({
        item,
        index,
    }: {
        item: notificationType;
        index: number;
    }) => {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginVertical: 10,
                }}
            >
                <Text style={styles.text}>{item?.name}</Text>
                <Toggle
                    id={item?.id}
                    onValueChange={() => {
                        // onUpdate(item?.id);
                    }}
                    isOn={item?.is_on}
                />
            </View>
        );
    };

    return (
        <ContainerTabWithoutScroll isBack headerHeading='Notification Settings'>
            {isLoading ? (
                <LoadingComponent />
            ) : (
                <View
                    style={{
                        flex: 1,
                        padding: 20,
                        backgroundColor: colors.defaultWhite,
                    }}
                >
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={notificationSetting}
                        renderItem={renderItem}
                    />
                </View>
            )}
        </ContainerTabWithoutScroll>
    );
};

export default NotificationSettings;

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        fontFamily: fonts.regular,
        lineHeight: 19,
        fontWeight: '400',
        color: colors.defaultBlack,
        flex: 1,
        paddingRight: 10,
    },
});
