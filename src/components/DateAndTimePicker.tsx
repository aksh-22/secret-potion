import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from 'src/constants/colors';
import { fonts } from 'src/constants/fonts';
import { dateFormatter2 } from 'src/utils/dateFormatter';

type Props = {
  defaultDate?: any;
  onDateChange?: (date: any) => void;
  onPress?: () => void;
  borderColor?: string;
  showLabel?: boolean;
  showIcon?: boolean;
  style?: ViewStyle;
  date?: string | any;
  errorMessage?: string;
  placeholder?: string;
  disabled?: boolean;
};

const DateAndTimePicker = ({
  borderColor,
  defaultDate,
  onDateChange,
  showLabel = true,
  style,
  onPress,
  date,
  errorMessage,
  placeholder,
  showIcon,
  disabled = false,
}: Props) => {
  const { t } = useTranslation();
  return (
    <View>
      <View style={[{ marginTop: 10 }, style]}>
        {date && showLabel ? (
          <Text style={styles.text2}>{placeholder ?? t('questions:dob')}</Text>
        ) : null}
        <TouchableOpacity
          disabled={disabled}
          onPress={onPress}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomWidth: 1,
            borderBottomColor: date
              ? borderColor ?? colors.regentBlue
              : borderColor ?? colors.defaultBlack,
            justifyContent: 'space-between',
            paddingLeft: 5,
          }}
        >
          <Text
            style={[
              styles.text,
              { color: date ? colors.defaultBlack : colors.lightBlack },
            ]}
          >
            {date ? dateFormatter2(date) : placeholder ?? t('questions:dob')}
          </Text>
          {showIcon ? (
            <MaterialCommunityIcons
              color={colors.lightBlack}
              name='calendar'
              size={20}
            />
          ) : null}
        </TouchableOpacity>
      </View>
      {errorMessage ? (
        <Text
          style={{
            color: colors.red,
            fontFamily: fonts.regular,
            marginVertical: 3,
          }}
        >
          {errorMessage}
        </Text>
      ) : (
        <View />
      )}
    </View>
  );
};

export default memo(DateAndTimePicker);

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    lineHeight: 18,
    color: colors.defaultBlack,
    paddingBottom: 10,
    backgroundColor: colors.transparent,
    flex: 1,
    paddingVertical: Platform.OS === 'ios' ? 10 : 5,
    fontFamily: fonts.regular,
  },
  text2: {
    fontSize: 15,
    lineHeight: 18,
    color: colors.lightBlack,
    paddingBottom: 10,
    fontFamily: fonts.regular,
  },
});
