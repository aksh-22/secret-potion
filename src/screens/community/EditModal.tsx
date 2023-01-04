import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Modal from 'react-native-modal';
import { useDispatch } from 'react-redux';
import { useAppDispatch } from 'src/hooks/reducer';
import {
    deleteCommunityPostComment,
    deleteReflectionPostComment,
    reduceCommunityPostsCommentCount,
    reduceReflectionPostsCommentCount,
} from 'src/redux/reducer/postReducer';
import { commentType } from 'typings/commentType';
import Delete from './editModal/Delete';
import Edit from './editModal/Edit';
import editStyle from './editModal/edit.style';
import Menu from './editModal/Menu';

type TEditModal = {
    isOpen: boolean;
    onClose: () => void;
    selectedData: commentType;
    onDeletePress: (count?: number) => void;
    onUpdatePress: (data: any) => void;
    apiType: string;
    commentId: number;
    postId: number;
    index: number;
};

const EditModal = ({
    isOpen,
    onClose,
    selectedData,
    onDeletePress,
    onUpdatePress,
    apiType,
    commentId,
    postId,
    index,
}: TEditModal) => {
    const [text, setText] = useState('');

    const [updateLoading, setUpdateLoading] = useState(false);

    const [deleteLoading, setDeleteLoading] = useState(false);

    const [showModal, setShowModal] = useState('menu');

    const dispatch = useDispatch();

    const appDispatch = useAppDispatch();

    useEffect(() => {
        setText(selectedData?.comment);
        setShowModal('menu');
    }, [selectedData]);

    const updateComment = () => {
        const data = {
            comment_id: commentId,
            post_id: postId,
            comment: text,
        };

        setUpdateLoading(true);

        dispatch({
            type:
                apiType === 'reflection'
                    ? 'UPDATE_REFLECTION_COMMENT'
                    : 'UPDATE_COMMUNITY_COMMENT',
            payload: {
                data,
                callback: () => {
                    onUpdatePress(text);
                },
                finallyCallback: () => {
                    setUpdateLoading(false);
                    onClose();
                },
            },
        });
    };

    const deleteButtonPress = () => {
        setShowModal('delete');
    };

    const editButtonPress = () => {
        setShowModal('edit');
    };

    const deleteComment = () => {
        const data = {
            comment_id: commentId,
            post_id: postId,
        };

        setDeleteLoading(true);

        dispatch({
            type:
                apiType === 'reflection'
                    ? 'DELETE_REFLECTION_COMMENT'
                    : 'DELETE_COMMUNITY_COMMENT',
            payload: {
                data,
                callback: (data) => {
                    onDeletePress(data?.count);
                    if (apiType === 'reflection') {
                        appDispatch(
                            reduceReflectionPostsCommentCount({
                                index,
                                count: data?.count,
                            })
                        );
                        appDispatch(
                            deleteReflectionPostComment({
                                index,
                                count: data?.count,
                            })
                        );
                    } else {
                        appDispatch(
                            reduceCommunityPostsCommentCount({
                                index,
                                count: data?.count,
                            })
                        );
                        appDispatch(
                            deleteCommunityPostComment({
                                index,
                                count: data?.count,
                            })
                        );
                    }
                },
                finallyCallback: () => {
                    setDeleteLoading(false);
                    onClose();
                    setShowModal('');
                },
            },
        });
    };

    const renderItem = () => {
        switch (showModal) {
            case 'menu':
                return (
                    <Menu
                        onEditPress={editButtonPress}
                        onDeletePress={deleteButtonPress}
                    />
                );
            case 'edit':
                return (
                    <Edit
                        selectedData={selectedData}
                        updateComment={updateComment}
                        updateLoading={updateLoading}
                        onClose={onClose}
                        onChangeText={(txt) => setText(txt)}
                    />
                );
            case 'delete':
                return (
                    <Delete
                        title='Are you sure you want to delete?'
                        submitButtonText='Delete'
                        onPress={deleteComment}
                        isLoading={deleteLoading}
                        onCancel={() => setShowModal('menu')}
                    />
                );

            default:
                break;
        }
    };

    return (
        <Modal
            hasBackdrop
            isVisible={isOpen}
            swipeDirection={['down']}
            onSwipeComplete={onClose}
            onBackButtonPress={onClose}
            onBackdropPress={onClose}
            style={{
                justifyContent: showModal === 'menu' ? 'flex-end' : 'center',
            }}
        >
            <View style={editStyle.container}>{renderItem()}</View>
        </Modal>
    );
};

export default EditModal;
