import { View, Text, TextInput, ViewStyle } from 'react-native';
import React, { useState } from 'react';
import CommentComponent from './CommentComponent';
import colors from 'src/constants/colors';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';

const reply = [
    {
        id: 31,
        comment: 'This is an array of reply 11111',
        is_like: false,
        total_like: 0,
        total_reply: 0,
        user: {
            id: 5,
            name: "Test Ma'am",
            user_name: 'akash22khandelwal',
            email: 'ak22@secret.com',
            dob: '1998-08-01',
            gender: 'male',
            country: 'india',
            bio: 'dfs dvjsdh vsd vosdhv sovh so vs vi ji ndf f hsdjghuieh gds djkb sdfjk vsdf dfjv eug eu ghdjfg ghdu guibnjkd igh ue hj ghurthg b  guitrn  uigherg  ekjg erj gheh gieuf gefui herui gdui geg ge',
            firebase_id: 'oQpA2XMXtUghimS2ZvXZVP2FYEF3',
            profile_image:
                'http://secret-potion.pzdev.tk/assets/images/placeholder.png',
        },
        is_save: false,
        is_support: false,
        is_friend: false,
        send_req: false,
        receive_req: false,
        is_report: false,
        is_self: true,
    },
    {
        id: 30,
        comment: 'This is an array of reply 2222',
        is_like: false,
        total_like: 0,
        total_reply: 0,
        user: {
            id: 5,
            name: "Test Ma'am",
            user_name: 'akash22khandelwal',
            email: 'ak22@secret.com',
            dob: '1998-08-01',
            gender: 'male',
            country: 'india',
            bio: 'dfs dvjsdh vsd vosdhv sovh so vs vi ji ndf f hsdjghuieh gds djkb sdfjk vsdf dfjv eug eu ghdjfg ghdu guibnjkd igh ue hj ghurthg b  guitrn  uigherg  ekjg erj gheh gieuf gefui herui gdui geg ge',
            firebase_id: 'oQpA2XMXtUghimS2ZvXZVP2FYEF3',
            profile_image:
                'http://secret-potion.pzdev.tk/assets/images/placeholder.png',
        },
        is_save: false,
        is_support: false,
        is_friend: false,
        send_req: false,
        receive_req: false,
        is_report: false,
        is_self: true,
    },
];

type Props = {
    el?: any;
    index?: any;
    replyList?: any;
    apiType?: any;
    onReplyPress?: (data: any, isKeyboard?: boolean) => void;
    item?: any;
    inputBoxStyle?: ViewStyle;
};

const CommentRender = ({
    el,
    index,
    apiType,
    item,
    onReplyPress,
    replyList,
    inputBoxStyle,
}: Props) => {
    const [showReplies, setShowReplies] = useState(false);

    const renderItem = ({ item: el2, index }) => (
        <CommentComponent
            key={index}
            item={el2}
            showLeftLine
            // mainStyle={{ marginLeft: 10 }}
            leftLineStyle={{
                backgroundColor: colors.transparent,
            }}
            numberOfLines={2}
            imageSize={35}
            borderRadius={10}
            showBottomLine={replyList?.length !== index + 1}
            onReplyPress={(id, isKeyboard) => {
                onReplyPress(
                    {
                        main_comment_id: item?.id,
                        parent_id: id,
                    },
                    isKeyboard
                );
            }}
            apiType={apiType}
            showRepliesBtn={el2?.total_reply > 1}
            inputBoxStyle={inputBoxStyle}
        />
    );

    return (
        <>
            <CommentComponent
                item={el}
                showLeftLine
                key={index}
                numberOfLines={2}
                imageSize={35}
                borderRadius={10}
                showBottomLine={replyList?.length !== index + 1}
                onReplyPress={(id, isKeyboard) => {
                    onReplyPress(
                        {
                            main_comment_id: item?.id,
                            parent_id: id,
                        },
                        isKeyboard
                    );
                }}
                apiType={apiType}
                onShowMorePress={() => setShowReplies((prev) => !prev)}
                showReplies={showReplies}
                inputBoxStyle={inputBoxStyle}
            />

            {
                // el?.total_reply > 1
                showReplies && (
                    <KeyboardAwareFlatList
                        data={reply}
                        renderItem={renderItem}
                    />
                )
            }
        </>
    );
};

export default CommentRender;
