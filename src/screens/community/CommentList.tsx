import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
import { useDispatch } from 'react-redux';
import PressableText from 'src/components/PressableText';
import colors from 'src/constants/colors';
import { commentType } from 'typings/commentType';
import CommentComponent from './CommentComponent';
import styles from './Community.style';
import EditModal from './EditModal';

type Props = {
    item: commentType;
    onReplyPress?: (
        data: IProps,
        user?: any,
        offset?: number,
        index?: number
    ) => void;
    apiType?: string;
    onDelete: (
        parentComment: boolean,
        index: number,
        count: number,
        mainCommentIndex?: number,
        subCommentIndex?: number
    ) => void;
    onUpdate: (index: number, data: any) => void;
    index: number;
    postId: number;
    myIndex: number;
};

type IProps = {
    post_id?: number;
    parent_id?: number;
    main_comment_id?: number;
};

const CommentList = ({
    item,
    onReplyPress,
    apiType,
    onDelete,
    index,
    onUpdate,
    postId,
    myIndex,
}: Props) => {
    const [replyList, setReplyList] = useState([]);
    const [loadMore, setLoadMore] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedData, setSelectedData] = useState<commentType>({});
    const [page, setPage] = useState(1);

    const ref = useRef();

    const onDeletePress = (count: number) => {
        onDelete(
            selectedData?.parentComment,
            index,
            count,
            myIndex,
            selectedData?.index
        );
        const temp = [...replyList];
        temp.splice(selectedData?.index, 1);
        setReplyList(temp);
        if (temp.length < 5) {
            setLoadMore(false);
        }
    };

    const onUpdatePress = (text) => {
        if (selectedData?.parentComment) {
            onUpdate(myIndex, text);
        } else {
            setReplyList((prev) => {
                const temp = [...prev];
                temp[selectedData?.index] = {
                    ...temp[selectedData?.index],
                    comment: text,
                };
                return temp;
            });
        }
    };

    useEffect(() => {
        if (item?.replies) {
            const a = [...item?.replies];
            setReplyList([...a]);
            setLoadMore(item?.is_show_more);
            setPage(1);
        }
    }, [item, item.replies.length]);

    const dispatch = useDispatch();

    const onCommentPress = (id: number) => {
        setIsLoading(true);
        dispatch({
            type:
                apiType === 'reflection'
                    ? 'GET_REPLIES_REFLECTION'
                    : 'GET_REPLIES',
            payload: {
                data: {
                    comment_id: id,
                },
                page,
                callback: (data, next) => {
                    setIsLoading(false);
                },
                errorCallback: () => {
                    setIsLoading(false);
                },
            },
        });
    };

    const getReplies = (page) => {
        setIsLoading(true);
        dispatch({
            type:
                apiType === 'reflection'
                    ? 'GET_REPLIES_REFLECTION'
                    : 'GET_REPLIES',
            payload: {
                data: {
                    comment_id: item?.id,
                },
                page,
                callback: (data, next) => {
                    setIsLoading(false);
                    if (page === 1) {
                        setReplyList(data);
                    } else {
                        setReplyList((prev) => [...prev, ...data]);
                    }
                    !next && setLoadMore(false);
                },
                errorCallback: () => {
                    setIsLoading(false);
                },
            },
        });
    };

    const renderItem = ({ item: el, index }) => (
        <CommentComponent
            item={el}
            showLeftLine
            key={index}
            numberOfLines={2}
            imageSize={35}
            borderRadius={10}
            showBottomLine={replyList?.length !== index + 1}
            onLongPress={() => {
                setShowEditModal(true);
                setSelectedData({ ...el, index });
            }}
            onReplyPress={(id, user, offset) =>
                onReplyPress(
                    {
                        main_comment_id: item?.id,
                        parent_id: id,
                    },
                    user,
                    offset,
                    index
                )
            }
            apiType={apiType}
            onCommentPress={onCommentPress}
        />
    );

    return (
        <>
            <EditModal
                index={index}
                commentId={selectedData?.id}
                postId={postId}
                apiType={apiType}
                selectedData={selectedData}
                isOpen={showEditModal}
                onClose={() => {
                    setShowEditModal(false);
                    setSelectedData(null);
                }}
                onDeletePress={onDeletePress}
                onUpdatePress={onUpdatePress}
            />
            <View style={{ flex: 1 }}>
                <View>
                    {replyList?.length ? <View style={styles.line} /> : null}
                    <CommentComponent
                        onLongPress={() => {
                            setShowEditModal(true);
                            setSelectedData({
                                ...item,
                                parentComment: true,
                            });
                        }}
                        onReplyPress={(id, user, offset) =>
                            onReplyPress(
                                {
                                    main_comment_id: item?.id,
                                    parent_id: id,
                                },
                                user,
                                offset
                            )
                        }
                        item={item}
                        apiType={apiType}
                    />
                </View>
                <View style={{ paddingLeft: 30 }}>
                    {replyList?.length ? (
                        <FlatList
                            ref={ref}
                            data={replyList}
                            renderItem={renderItem}
                        />
                    ) : null}
                    {isLoading ? (
                        <View style={{ marginTop: 10, alignSelf: 'center' }}>
                            <ActivityIndicator color={colors.regentBlue} />
                        </View>
                    ) : loadMore ? (
                        <PressableText
                            wrapperStyle={{
                                marginTop: 20,
                                alignSelf: 'center',
                            }}
                            textStyle={{
                                color: colors.green,
                                // fontSize: 18,
                                fontWeight: '600',
                            }}
                            onTextPress={() => {
                                getReplies(page);
                                setPage((prev) => prev + 1);
                            }}
                        >
                            Show more replies...
                        </PressableText>
                    ) : null}
                </View>
            </View>
        </>
    );
};

export default CommentList;
