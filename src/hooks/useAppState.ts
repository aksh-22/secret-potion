import { useEffect, useState } from 'react';
import { AppState } from 'react-native';

const useAppState = () => {
    const [appState, setAppState] = useState('active');

    useEffect(() => {
        const subscription = AppState.addEventListener(
            'change',
            (nextAppState) => {
                console.log('nextAppState', nextAppState);
                if (nextAppState === 'active') {
                    setAppState(nextAppState);
                } else {
                    setAppState('inActive');
                }
            }
        );

        return () => {
            subscription.remove();
        };
    }, []);
    return { appState };
};

export default useAppState;
