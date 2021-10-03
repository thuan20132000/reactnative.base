/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Router from './Router';

import { Provider as StoreProvider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import ReduxThunk from 'redux-thunk';

import flashcard_list_reducer from './store/reducer/flashCardReducer';
import notification_reducer from './store/reducer/notificationReducer';
import reading_list_reducer from './store/reducer/readingReducer';
import authentication_reducer from './store/reducer/authenticationReducer';

import { Provider } from 'react-native-paper';
import admob, { MaxAdContentRating } from '@react-native-firebase/admob';
import { config } from './app/constants';
import OneSignal from 'react-native-onesignal';
import RootNavigation from './app/Router/RootNavigation';
import codePush from "react-native-code-push";


const rootReducer = combineReducers({
  flashcard: flashcard_list_reducer,
  notification: notification_reducer,
  reading: reading_list_reducer,
  authentication: authentication_reducer
});
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));



let codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_RESUME };

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };



  React.useEffect(() => {
    admob()
      .setRequestConfiguration({
        // Update all future requests suitable for parental guidance
        maxAdContentRating: MaxAdContentRating.PG,

        // Indicates that you want your content treated as child-directed for purposes of COPPA.
        tagForChildDirectedTreatment: true,

        // Indicates that you want the ad request to be handled in a
        // manner suitable for users under the age of consent.
        tagForUnderAgeOfConsent: true,
      })
      .then(() => {
        // Request config successfully set!
        console.log('admod config successfully')
      });

    //OneSignal Init Code
    OneSignal.setLogLevel(6, 0);
    OneSignal.setAppId("11adcd6a-04d0-4080-853c-9ba3780fe5c2");
    OneSignal.setRequiresUserPrivacyConsent(false)

    //END OneSignal Init Code







  }, []);



  return (
    <StoreProvider
      store={store}
    >
      <Provider>
        <RootNavigation />
      </Provider>

    </StoreProvider>
  );
};


export default codePush(codePushOptions)(App);
