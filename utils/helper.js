
import { Alert } from 'react-native';
import Sound from 'react-native-sound';
import { file_url, url_absolute } from '../config/api_config.json';

export const _onPlaySound = async (sound_name) => {
    if (!sound_name) {
        return;
    }
    let sound_url = `${file_url}/${sound_name}`;
    const sound = new Sound(sound_url, null, (error) => {
        if (error) {
            return false
        }
        // play when loaded
        sound.play();
        return true;
    });

}



export const _onPlayFlashCardSound = async (sound_name) => {

    try {

        if (!sound_name) {
            return false;
        }
        let sound_url = `${url_absolute}/${sound_name}`;
        const sound = new Sound(sound_url, null, (error) => {
            if (error) {
                return false
            }
            // play when loaded
            sound.play();

        });
        return true;
    } catch (error) {
        return false
    }

}




export const _onPlaySoundLocal = async (sound_path) => {
    try {

        if (!sound_name) {
            return false;
        }
      
        const sound = new Sound(sound_path, null, (error) => {
            if (error) {
                return false
            }
            // play when loaded
            sound.play();

        });
        return true;
    } catch (error) {
        return false
    }
}





export const _onRandomIndexValue = (number = 3, except = []) => {

    let random;
    if (except.length > 0) {
        while (true) {
            random = Math.floor(Math.random() * number);
            let count = 0;
            except.forEach(element => {
                if (element == random) {
                    count += 1;
                    return;
                }
            });
            if (count == 0) {
                break;
            }
        }

    } else {
        random = Math.floor(Math.random() * number);
    }
    return random;
}



export const _onCheckItemExistInArray = (item, array = []) => {

    let isExists = false;
    for (let i = 0; i < array.length; i++) {
        if (item.id == array[i].id) {
            isExists = true;
            break;
        }
    }
    return isExists;

}




export const _onCheckNumberEven = (number) => {
    if (number % 2 != 0) {
        return true
    }
    return false
}



export const _onSwapRandomArrayElement = (array = []) => {

    let new_array = [];
    let count = 0;

    while (true) {

        if (count >= 20) {
            return new_array;
        }
        array.forEach(element => {

            let checkExists = _onCheckItemExistInArray(element, new_array);
            if (!checkExists) {

                let random_value = Math.floor(Math.random() * 10);
                let checkEven = _onCheckNumberEven(random_value);
                if (checkEven) {
                    new_array.push(element)
                }

            }


        });
        if (new_array.length >= 3) {
            return new_array
        }
        count += 1;
    }


}