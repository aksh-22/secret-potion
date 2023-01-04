import React from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    Text,
    TextInput,
    View,
} from 'react-native';
import { InputToolbar } from 'react-native-gifted-chat';
import colors from 'src/constants/colors';
import { fonts } from 'src/constants/fonts';

type Props = {
    props?: any;
    currUserInfo?: any;
    renderSend?: any;
    input?: any;
    isChatDisabled?: boolean;
    isUserDeleted?: boolean;
    onChangeText?: any;
};

const ChatInputToolbar = ({
    props,
    isChatDisabled,
    currUserInfo,
    renderSend,
    input,
    onChangeText,
    isUserDeleted,
}: Props) => {
    return isChatDisabled || isUserDeleted ? (
        <View
            style={{
                backgroundColor: colors.defaultWhite,
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Text
                style={{
                    fontFamily: fonts.regular,
                    color: colors.lightBlack3,
                    fontSize: 20,
                    paddingBottom: 20,
                    textAlign: 'center',
                }}
            >
                {currUserInfo?.is_deleted
                    ? 'You can not send message to this conversation'
                    : ' You are no longer connected with this user.'}
            </Text>
        </View>
    ) : (
        <InputToolbar
            {...props}
            //  renderActions={renderActions}
            renderSend={renderSend}
            primaryStyle={{
                // minHeight: 114,
                // maxHeight: 114,
                // alignItems: 'center',
                paddingHorizontal: 20,
                // paddingVertical: 25,
                paddingTop: 10,
                paddingBottom: Platform.OS === 'ios' ? 30 : 30,
                // flex: 1,
                borderWidth: 0,
                borderTopColor: colors.defaultWhite,
            }}
            renderComposer={() => (
                <View
                    // onLayout={(e) => {
                    //   setInputHeight(e?.nativeEvent?.layout?.height + 40);
                    // }}
                    style={{
                        borderRadius: 10,
                        flex: 1,
                        alignSelf: 'flex-start',
                        justifyContent: 'center',
                        backgroundColor: colors.background3,
                        // marginTop: 10,
                        borderWidth: 0,
                        // maxHeight: 150,
                    }}
                >
                    <KeyboardAvoidingView
                        enabled={Platform.OS === 'ios'}
                        style={{
                            height: Platform.OS === 'ios' ? 90 : 70,
                            paddingVertical: Platform.OS === 'ios' ? 10 : 0,
                        }}
                    >
                        <TextInput
                            style={{
                                // minHeight: 60,
                                // maxHeight: 130,
                                // padding: 16,
                                // paddingRight: 50,
                                // paddingTop: 18,
                                color: colors.defaultBlack,
                                fontFamily: fonts.regular,
                                fontSize: 18,
                                // minHeight: 65,
                                // maxHeight: 150,
                                padding: 10,
                                paddingRight: 50,
                                flex: 1,
                            }}
                            value={input}
                            multiline
                            onChangeText={onChangeText}
                            placeholder='Type something...'
                            placeholderTextColor={colors.placeholderColor}
                        />
                    </KeyboardAvoidingView>
                </View>
            )}
            containerStyle={{
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 0,
                borderTopColor: colors.defaultWhite,
                // backgroundColor: 'red',
            }}
        />
    );
};

export default ChatInputToolbar;
