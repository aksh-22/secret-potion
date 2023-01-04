import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import colors from 'src/constants/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';
import { fonts } from 'src/constants/fonts';

type Props = {
  onChange?: (data: any) => void;
  errorMessage?: string;
  value?: string;
};

const GenderSelect = ({ onChange, errorMessage, value }: Props) => {
  const [selected, setSelected] = useState(value ?? '');

  useEffect(() => {
    onChange && onChange(selected);
  }, [selected]);

  const { t } = useTranslation();

  return (
    <>
      <View style={{ marginTop: 30 }}>
        <Text style={styles.text2}>{t('questions:gender')}</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            onPress={() => setSelected('male')}
            style={styles.element}
          >
            <LinearGradient
              colors={
                selected === 'male'
                  ? [colors.mintTulip, colors.downy]
                  : [colors.transparent, colors.transparent]
              }
              style={[
                styles.iconWrapper,
                { borderWidth: selected === 'male' ? 0 : 1 },
              ]}
            >
              <FontAwesome
                color={
                  selected === 'male' ? colors.defaultWhite : colors.lightBlack2
                }
                size={20}
                name='male'
              />
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelected('female')}
            style={styles.element}
          >
            <LinearGradient
              colors={
                selected === 'female'
                  ? [colors.mintTulip, colors.downy]
                  : [colors.transparent, colors.transparent]
              }
              style={[
                styles.iconWrapper,
                { borderWidth: selected === 'female' ? 0 : 1 },
              ]}
            >
              <FontAwesome
                color={
                  selected === 'female'
                    ? colors.defaultWhite
                    : colors.lightBlack2
                }
                size={20}
                name='female'
              />
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelected('not_defined')}
            style={styles.element}
          >
            <LinearGradient
              colors={
                selected === 'not_defined'
                  ? [colors.mintTulip, colors.downy]
                  : [colors.transparent, colors.transparent]
              }
              style={[
                styles.iconWrapper,
                { borderWidth: selected === 'not_defined' ? 0 : 1, width: 170 },
              ]}
            >
              <Text
                style={[
                  styles.text,
                  {
                    color:
                      selected === 'not_defined'
                        ? colors.defaultWhite
                        : colors.lightBlack2,
                  },
                ]}
              >
                {t('questions:doNot')}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
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
    </>
  );
};

export default GenderSelect;

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    lineHeight: 18,
    color: colors.lightBlack2,
    fontFamily: fonts.regular,
  },
  text2: {
    fontSize: 15,
    lineHeight: 18,
    color: colors.placeholderColor,
    paddingBottom: 10,
    fontFamily: fonts.regular,
  },
  iconWrapper: {
    borderWidth: 1,
    borderRadius: 10,
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.lightBlack2,
  },
  element: {
    marginRight: 5,
  },
});
