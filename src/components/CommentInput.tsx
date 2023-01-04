import {
    ActivityIndicator,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import colors from 'src/constants/colors';
import LinearGradient from 'react-native-linear-gradient';
import Send from 'src/assets/svg/send.svg';
import { fonts } from 'src/constants/fonts';
import { useDispatch } from 'react-redux';
import { showMessage } from './messageModal/MessageModal';
import Ionicons from 'react-native-vector-icons/Ionicons';

type IProps = {
    post_id?: number;
    parent_id?: number;
    main_comment_id?: number;
};

type Props = {
    ids: IProps;
    onKeyboardClose?: () => void;
    onSubmit?: (data: any) => void;
    index?: number;
    apiType?: string;
    paddingBottom?: boolean;
    user?: any;
    onRemove?: () => void;
};

const CommentInput = ({
    ids,
    onKeyboardClose,
    onSubmit,
    index,
    apiType,
    paddingBottom = true,
    user,
    onRemove,
}: Props) => {
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    const [comment, setComment] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [init, setInit] = useState(true);

    const newRef = useRef<TextInput>(null);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true); // or some other action
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false); // or some other action
                onKeyboardClose && onKeyboardClose();
            }
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    useEffect(() => {
        if (!init && ids?.parent_id) newRef.current.focus();
        setInit(false);
    }, [ids]);

    const dispatch = useDispatch();

    const postComment = () => {
        const a = { ...ids, comment };
        setIsLoading(true);
        const data: any = { ...ids, comment };
        // if (ids?.parent_id) {
        //     data.tag_friends = [user?.id];
        // }
        dispatch({
            type:
                apiType === 'reflection'
                    ? 'COMMENT_REFLECTION'
                    : 'COMMENT_POSTS',
            payload: {
                data,
                index,
                callback: (res) => {
                    setIsLoading(false);
                    setComment('');
                    Keyboard.dismiss();
                    onSubmit(res);
                    onRemove();
                },
                errorCallback: () => {
                    setIsLoading(false);
                },
            },
        });
    };

    return (
        <KeyboardAvoidingView
            enabled={Platform.OS === 'ios'}
            behavior='position'
            style={{
                backgroundColor: colors.defaultWhite,
                position: 'absolute',
                bottom: -20,
                left: 0,
                right: 0,
            }}
        >
            <View
                style={{
                    padding: 20,
                    paddingBottom:
                        Platform.OS === 'ios'
                            ? 100
                            : isKeyboardVisible
                            ? 50
                            : 130,
                    backgroundColor: colors.defaultWhite,
                }}
            >
                {ids?.parent_id && (
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginTop: -10,
                            paddingBottom: 10,
                        }}
                    >
                        <Text
                            style={{
                                fontFamily: fonts.regular,
                                color: colors.defaultBlack2,
                            }}
                        >
                            Replying to @{user?.name}
                        </Text>
                        <TouchableOpacity onPress={onRemove}>
                            <Ionicons
                                size={20}
                                name='close'
                                color={colors.borderColor}
                            />
                        </TouchableOpacity>
                    </View>
                )}
                <View
                    style={{
                        backgroundColor: colors.background3,
                        borderRadius: 10,
                        flexDirection: 'row',
                        padding: 10,
                        alignItems: 'center',
                    }}
                >
                    <TextInput
                        ref={newRef}
                        placeholderTextColor={colors.placeholderColor}
                        placeholder='Add a comment...'
                        textAlignVertical='top'
                        value={comment}
                        onChangeText={(text) => {
                            setComment(text);
                        }}
                        multiline
                        style={{
                            flex: 1,
                            color: colors.defaultBlack,
                            fontFamily: fonts.regular,
                            maxHeight: 100,
                        }}
                    />

                    {isLoading ? (
                        <ActivityIndicator
                            color={colors.regentBlue}
                            size='large'
                        />
                    ) : (
                        <TouchableOpacity
                            onPress={postComment}
                            disabled={!comment.trim().length}
                        >
                            <LinearGradient
                                style={{
                                    borderRadius: 100,
                                    height: 40,
                                    width: 40,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    paddingTop: 10,
                                }}
                                colors={
                                    comment.trim().length
                                        ? [colors.mintTulip, colors.downy]
                                        : [
                                              colors.borderColor,
                                              colors.borderColor,
                                          ]
                                }
                            >
                                <Send />
                            </LinearGradient>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

export default CommentInput;

const styles = StyleSheet.create({});
