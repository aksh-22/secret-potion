import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Chart from 'src/components/chart/Chart';
import colors from 'src/constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ChartComponentDouble = () => {
  return (
    <View
      style={{
        borderRadius: 10,
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        paddingTop: 20,
        backgroundColor: colors.defaultWhite,
      }}
    >
      <Chart />
      <View
        style={{
          backgroundColor: colors.background2,
          flexDirection: 'row',
          flex: 1,
          width: '100%',
          borderBottomEndRadius: 10,
          borderBottomStartRadius: 10,
          padding: 10,
        }}
      >
        <TouchableOpacity>
          <Ionicons
            style={{ paddingLeft: 10 }}
            name='chevron-back-sharp'
            size={22}
            color={colors.regentBlue}
          />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <MaterialCommunityIcons
            color={colors.regentBlue}
            name='calendar-month'
            size={20}
          />
          <Text style={{ color: colors.defaultBlack, marginLeft: 10 }}>
            Jan 2022
          </Text>
        </View>
        <TouchableOpacity>
          <Ionicons
            style={{ paddingLeft: 10 }}
            name='chevron-forward-sharp'
            size={22}
            color={colors.regentBlue}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChartComponentDouble;

const styles = StyleSheet.create({
  chart2: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'red',
    zIndex: 100,
  },
});
