import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import CountryPicker, {
  Country,
  CountryCode,
} from 'react-native-country-picker-modal';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import colors from 'src/constants/colors';
import { SCREEN_WIDTH } from 'src/constants/deviceInfo';
import { fonts } from 'src/constants/fonts';

type Props = {
  onCountrySelect: (data: any) => void;
  errorMessage?: string;
  value?: Country;
};

const CustomCountryPicker = ({
  onCountrySelect,
  errorMessage,
  value,
}: Props) => {
  const [countryCode, setCountryCode] = useState<CountryCode | any>(
    value?.cca2
  );

  const onSelect = (country: Country) => {
    setCountryCode(country.cca2);
    onCountrySelect(country);
  };

  const [show, setShow] = useState(false);

  return (
    <>
      <View
        style={{
          borderBottomWidth: 1,
          marginTop: 30,
          flexDirection: 'row',
          paddingBottom: 10,
          alignItems: 'center',
          borderColor: colors.lightBlack2,
          justifyContent: 'space-between',
        }}
      >
        <CountryPicker
          withFilter
          containerButtonStyle={{
            width: SCREEN_WIDTH - 30,
            alignSelf: 'center',
            justifyContent: 'center',
            opacity: countryCode ? 1 : 0.5,
            paddingVertical: 5,
            // backgroundColor: 'red',
            zIndex: 100,
          }}
          {...{
            onSelect,
            placeholder: 'Country',
            countryCode,
          }}
          theme={{ fontFamily: fonts.regular }}
          visible={show}
          withModal
          withCountryNameButton
          onSelect={onSelect}
          onClose={() => setShow(false)}
          countryCode={countryCode}
        />
        <View
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            justifyContent: 'center',
            zIndex: -1,
          }}
        >
          <FontAwesome color={colors.lightBlack} size={20} name='angle-down' />
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

export default CustomCountryPicker;

const styles = StyleSheet.create({
  con: {
    // backgroundColor: 'red',
    margin: 10,
  },
  input: {
    width: SCREEN_WIDTH - 92,
  },
});
