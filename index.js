/**
 * @format
 */

import { AppRegistry, Platform } from 'react-native';
import App from './App';
import { name as appNameIOS } from './app.json';
import { name as appNameANDROID } from './app.android.json';



if (Platform.OS === 'android') {
    AppRegistry.registerComponent(appNameANDROID, () => App);
} else {
    AppRegistry.registerComponent(appNameIOS, () => App);

}
// AppRegistry.registerComponent(appNameANDROID, () => App);