import remoteConfig from '@react-native-firebase/remote-config';
import React, { useEffect } from 'react';
import { getVersion } from 'react-native-device-info';
import { useAppDispatch } from 'src/hooks/reducer';
import { setRemoteConfigData } from 'src/redux/reducer/appReducer';

const RemoteConfig = () => {
    useEffect(() => {
        // appDispatch(setRemoteConfigData({}));
        getData();
    }, []);

    const appDispatch = useAppDispatch();

    const getData = async () => {
        await remoteConfig().fetch(__DEV__ ? 0 : 0);
        await remoteConfig().fetchAndActivate();

        const configData = JSON.parse(
            remoteConfig().getValue('config_data').asString()
        );

        // AsyncStorage.setItem('base_url', baseUrl.asString());

        appDispatch(
            setRemoteConfigData({
                ...configData,
                currentAppVersion: getVersion(),
            })
        );
    };

    return <></>;
};

export default RemoteConfig;
