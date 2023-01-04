/**
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import { AppRegistry, LogBox } from 'react-native';
import { Provider } from 'react-redux';
import persistStore from 'redux-persist/es/persistStore';
import { PersistGate } from 'redux-persist/integration/react';
import rootSaga from 'src/redux/saga/rootSaga';
import store, { sagaMiddleware } from 'src/redux/store';
import App from './App';
import { name as appName } from './app.json';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import './src/locale/i18n.config';
import { db } from 'src/firebase';
db.setPersistenceEnabled(true);
export const persister = persistStore(store);
sagaMiddleware.run(rootSaga);
LogBox.ignoreLogs([
    'Warning: componentWillReceiveProps has been renamed',
    'Animated: `useNativeDriver` was not specified.',
    'Animated.event now requires a second argument for options',
    'EventEmitter.removeListener',
    '[react-native-gesture-handler]',
    'onAnimatedValueUpdate',
    'Non-serializable values were found in the navigation state',
]);
const RootApp = () => (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persister}>
            <App />
        </PersistGate>
    </Provider>
);

AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(RootApp));
