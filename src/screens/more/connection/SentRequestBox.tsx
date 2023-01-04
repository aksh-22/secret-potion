import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import React, { useState } from 'react';
import styles from './Connection.style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { receiveItemType } from 'typings/requestType';
import colors from 'src/constants/colors';
import { useDispatch } from 'react-redux';
import { showMessage } from 'src/components/messageModal/MessageModal';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackName } from 'src/constants/routeName';

type Props = { item: receiveItemType; onCancel?: () => void };

const SentRequestBox = ({ item, onCancel }: Props) => {
  const [requestLoading, setRequestLoading] = useState(false);

  const { navigate } = useNavigation<NativeStackNavigationProp<any>>();

  const dispatch = useDispatch();

  const requestCancel = () => {
    setRequestLoading(true);
    dispatch({
      type: 'CANCEL_REQUEST',
      payload: {
        data: {
          id: item?.user_info?.id,
        },
        callback: () => {
          setRequestLoading(false);
          onCancel();
          showMessage({
            isVisible: true,
            message: 'Request cancelled successfully',
            type: 'Success',
          });
        },
        errorCallback: () => {
          setRequestLoading(false);
        },
      },
    });
  };

  return (
    <Pressable
      onPress={() => {
        navigate(RootStackName.OTHER_PROFILE, {
          id: item?.user_info?.id,
        });
      }}
      style={styles.container}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
        <Image
          style={{ width: 40, height: 40, borderRadius: 100 }}
          resizeMode='cover'
          source={{ uri: item?.user_info?.profile_image }}
        />
        <Text style={styles.text}>{item?.user_info?.name}</Text>
      </View>
      {requestLoading ? (
        <ActivityIndicator color={colors.regentBlue} size='large' />
      ) : (
        <TouchableOpacity
          onPress={requestCancel}
          style={[styles.iconCircle, { borderColor: colors.lightBlack2 }]}
          // onPress={() => RowMap}
        >
          <Ionicons name='close' color={colors.lightBlack2} size={20} />
        </TouchableOpacity>
      )}
    </Pressable>
  );
};

export default SentRequestBox;
