import { API_URL_DEV, API_URL_LIVE_NEW } from '@env';
import axios from 'axios';
import { Platform } from 'react-native';
import { getModel, getVersion } from 'react-native-device-info';
import { getTimeZone } from 'react-native-localize';
import store from 'src/redux/store';
import { axiosError } from './axiosError';

const axiosInstance = axios.create({
    timeout: 30000,
    timeoutErrorMessage:
        'Network request timed out. The app could not connect to the server. Please make sure you are connected with a good network.',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'App-Version': getVersion(),
        Timezone: getTimeZone(),
        'Device-Model': getModel(),
        Platform: Platform.OS,
    },
});
axiosInstance.interceptors.request.use(
    (request) => {
        let reduxStore = store.getState();
        let token = reduxStore?.userReducer?.token;
        let resetToken = reduxStore?.userReducer?.resetToken;

        let devUrl =
            reduxStore?.appReducer?.remoteConfigData?.app_url_dev ??
            API_URL_DEV;
        let liveUrl =
            reduxStore?.appReducer?.remoteConfigData?.app_url_live ??
            API_URL_LIVE_NEW;

        request.baseURL = __DEV__ ? `${devUrl}` : `${liveUrl}`;

        if (request.headers) {
            if (token) {
                request.headers.Authorization = `Bearer ${token}`;
            } else if (resetToken) {
                request.headers.Authorization = `Bearer ${resetToken}`;
            }
        }
        return request;
    },
    (error) => {
        throw error;
    }
);
// Add a response interceptor
axiosInstance.interceptors.response.use(
    (res) => {
        if (res.status === 200) {
            // showMessage({ isVisible: true, message: res.data.message });
            return res;
        }
    },
    (err) => axiosError(err)
);
export { axiosInstance };
