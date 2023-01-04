import React, { useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import NoInternetConnectivityStyle from './NoInternetConnectivity.Style';
import LOGO from 'src/assets/svg/noConnectivity.svg';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from 'src/constants/deviceInfo';
// import CustomButton from 'src/components/customButton/CustomButton';
import { checkNetworkService } from 'src/api/networkCheck';
// import colors from 'src/constants/colors';
import { isNetworkConnected } from 'src/redux/reducer/networkReducer';
import { useAppDispatch } from 'src/hooks/reducer';
const NoInternetConnectivity = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const manualRetryConnection = async () => {
    try {
      setIsLoading(true);

      await checkNetworkService();
      dispatch(isNetworkConnected(true));
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <View style={NoInternetConnectivityStyle.container}>
      <LOGO height={SCREEN_HEIGHT * 0.5} width={SCREEN_WIDTH * 0.7} />
      <View style={NoInternetConnectivityStyle.textContainer}>
        <Text style={NoInternetConnectivityStyle.headingText}>
          Network Error!!
        </Text>
        <Text style={NoInternetConnectivityStyle.textStyle}>
          The app could not connect to the server. Please make sure you are
          connected with a good network.
        </Text>

        <Button title='Refresh' onPress={manualRetryConnection}>
          <Text>{isLoading ? 'Loading' : 'Refresh'}</Text>
        </Button>

        {/* <CustomButton
          title="Retry"
          mode="pinkMode"
          isLoading={isLoading}
          onPress={manualRetryConnection}
          icon={
            <Icon
              name="wifi-outline"
              style={{
                fontSize: 22,
                color: colors.defaultWhite,
              }}
            />
          }
          style={{
            width: SCREEN_WIDTH * 0.5,
          }}
        /> */}
      </View>
    </View>
  );
};

export default NoInternetConnectivity;
