// import { RootStackName, AuthRouteNames } from 'src/constants/routeName';
import { AxiosError } from 'axios';

import { showMessage } from 'src/components/messageModal/MessageModal';
import { START_NETWORKING_POLLING } from 'src/redux/action/networkAction';
import { isNetworkConnected } from 'src/redux/reducer/networkReducer';
import { updateCheckToken } from 'src/redux/reducer/userReducer';
import store from 'src/redux/store';

export const axiosError = async (err: AxiosError) => {
    if (err.response) {
        if (err.response.data.message) {
            if (err.response.status !== 309) {
                if (err?.response?.data?.message) {
                    if (err.response.status !== 421) {
                        showMessage({
                            isVisible: true,
                            message: err?.response?.data?.message,
                        });
                    }
                }
            }
            console.log(
                'axiosError response mesage',
                JSON.stringify(err?.response, null, 2)
            );
        }
        if (err.response.status === 401) {
            showMessage({
                isVisible: true,
                message:
                    'You have been logged out please login again, and if you still face this issue then restart your app and then login again',
            });
            store.dispatch(updateCheckToken(true));
            // state.userReducer.checkToken = true;
        }
        if (err.response.status === 404) {
            console.log(
                'axiosError response mesage',
                JSON.stringify(err?.response, null, 2)
            );
            showMessage({
                isVisible: true,
                message: err?.response?.data?.message,
            });
        }
        throw err;
    } else {
        if (err.message === 'Network Error') {
            store.dispatch(START_NETWORKING_POLLING());
            store.dispatch(isNetworkConnected(false));
            showMessage({
                isVisible: true,
                message:
                    'The app could not connect to the server. Please make sure you are connected with a good network. Try switching the WiFi or try to connect via other network. This could also be a hardware failure.',
            });
        } else {
            if (err.message) {
                showMessage({
                    isVisible: true,
                    message: err?.message,
                });
            }
        }
        console.error('err', err.message);
        console.log('response err', err);
        // errorToast(err.message);
        throw err;
    }
};
