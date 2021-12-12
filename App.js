/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import ReduxThunk from 'redux-thunk';

import flashcard_list_reducer from './store/reducer/flashCardReducer';
import notification_reducer from './store/reducer/notificationReducer';
import reading_list_reducer from './store/reducer/readingReducer';
import authentication_reducer from './store/reducer/authenticationReducer';

import { Provider } from 'react-native-paper';

import RootNavigation from './app/Router/RootNavigation';


const rootReducer = combineReducers({
  flashcard: flashcard_list_reducer,
  notification: notification_reducer,
  reading: reading_list_reducer,
  authentication: authentication_reducer
});
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));



import KeyboardManager from 'react-native-keyboard-manager';
import { Platform } from 'react-native';

const App = () => {



  if (Platform.OS === 'ios') {
    KeyboardManager.setEnable(true);
    KeyboardManager.setEnableDebugging(false);
    KeyboardManager.setKeyboardDistanceFromTextField(10);
    KeyboardManager.setEnableAutoToolbar(false);
    KeyboardManager.setToolbarPreviousNextButtonEnable(false);
    KeyboardManager.setShouldToolbarUsesTextFieldTintColor(false);
    KeyboardManager.setShouldShowToolbarPlaceholder(true);
    KeyboardManager.setOverrideKeyboardAppearance(false);
    // KeyboardManager.setShouldResignOnTouchOutside(true);
    KeyboardManager.resignFirstResponder();
  }




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


export default App;
