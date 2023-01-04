import Clipboard from '@react-native-community/clipboard';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
    Alert,
    Image,
    ScrollView,
    Share,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { useDispatch } from 'react-redux';
import ContainerTabWithoutScroll from 'src/components/container/ContainerTabWithoutScroll';
import CustomButton from 'src/components/customButton/CustomButton';
import { showMessage } from 'src/components/messageModal/MessageModal';
import colors from 'src/constants/colors';
import { SCREEN_WIDTH } from 'src/constants/deviceInfo';
import { fonts } from 'src/constants/fonts';
import { useAppSelector } from 'src/hooks/reducer';

type Props = {};

const Invite = ({}: Props) => {
    const inviteLink = useAppSelector(
        (state) => state?.userReducer?.user?.invite_link
    );

    const copyToClipboard = () => {
        if (!inviteLink) {
            showMessage({
                isVisible: true,
                message: 'Coming Soon',
                type: 'Info',
            });
        } else {
            Clipboard.setString(inviteLink);
            showMessage({
                isVisible: true,
                message: 'Code copied successfully!',
                type: 'Success',
            });
        }
    };

    const { t } = useTranslation();

    const dispatch = useDispatch();

    const onShare = async () => {
        if (!inviteLink) {
            showMessage({
                isVisible: true,
                message: 'Coming Soon',
                type: 'Info',
            });
        } else {
            try {
                const result = await Share.share({
                    title: 'App link',
                    message: `Hello, I have invited you to Secret Potion. Please download the app from the following link: \n${inviteLink}`,
                    url: inviteLink,
                });
                if (result.action === Share.sharedAction) {
                    if (result.activityType) {
                        // shared with activity type of result.activityType
                    } else {
                        // shared
                    }
                } else if (result.action === Share.dismissedAction) {
                    // dismissed
                }
            } catch (error) {
                Alert.alert(error.message);
            }
        }
    };

    const btnPress = () => {};

    return (
        <ContainerTabWithoutScroll
            headerHeading={t('settings:inviteText')}
            style={{ backgroundColor: colors.defaultWhite, flex: 1 }}
            isBack
        >
            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{
                    flexGrow: 1,
                    paddingHorizontal: 20,
                    paddingBottom: 140,
                }}
            >
                <Image
                    style={{
                        width: SCREEN_WIDTH - 100,
                        height: 220,
                        alignSelf: 'center',
                    }}
                    resizeMode='contain'
                    source={require('src/assets/images/invite.png')}
                />
                <Text style={styles.text}>{inviteLink}</Text>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '80%',
                        alignSelf: 'center',
                    }}
                >
                    <CustomButton
                        style={{
                            width: 100,
                            marginTop: 30,
                            alignSelf: 'center',
                        }}
                        title={t('settings:copyCode')}
                        onPress={copyToClipboard}
                    />
                    <CustomButton
                        style={{
                            width: 100,
                            marginTop: 30,
                            alignSelf: 'center',
                        }}
                        title={t('settings:send')}
                        onPress={onShare}
                    />
                </View>
            </ScrollView>
        </ContainerTabWithoutScroll>
    );
};

export default Invite;

const styles = StyleSheet.create({
    text: {
        color: colors.defaultBlack,
        fontFamily: fonts.regular,
        fontSize: 20,
        lineHeight: 24,
        textAlign: 'center',
        marginTop: 20,
    },
});
