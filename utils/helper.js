
import { Alert } from 'react-native';
import Sound from 'react-native-sound';
import {file_url} from '../config/api_config.json';

export const _onPlaySound = async (sound_name) => {
    if(!sound_name){
        return;
    }
    let sound_url = `${file_url}/${sound_name}`;
    const sound = new Sound(sound_url, null, (error) => {
        if (error) {
            Alert.alert("Thông báo","Vui lòng kiểm tra kết nối mạng.")
        }
        // play when loaded
        sound.play();
    });

}