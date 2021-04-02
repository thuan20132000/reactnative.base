
import { Alert } from 'react-native';
import Sound from 'react-native-sound';
import { file_url, url_absolute } from '../config/api_config.json';
import AsyncStorage from '@react-native-async-storage/async-storage';






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
        sound.play(() => {
            sound.release()
        });


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
        if (item.ID == array[i].ID) {
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






export const saveLearntVocabularyByTopic = async (topic, values) => {

    try {

        let vocabulary_list = await getLearntVocabularyByTopic(topic);
        let new_learnt_vocabulary_list = [];
        if (values && values.length > 0) {
            new_learnt_vocabulary_list = vocabulary_list.concat(values);
        }

        const jsonValue = JSON.stringify(new_learnt_vocabulary_list);
        await AsyncStorage.setItem(`@learnt_${topic}_vocabulary`, jsonValue);

        return true;
    } catch (e) {
        // saving error
        return false
    }

}




export const getLearntVocabularyByTopic = async (topic) => {

    try {
        const jsonValue = await AsyncStorage.getItem(`@learnt_${topic}_vocabulary`);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        // error reading value
        return false;
    }

}




export const filterDuplicate = async (values = []) => {
    try {
        let newValues = [];
        let mapValue = new Map();

        for (let item of values) {
            if (!mapValue.has(item.id)) {
                mapValue.set(item.id, item);
                newValues.push(item);
            }
        }
        return newValues
    } catch (error) {
        console.warn(error)
        return false;
    }
}




export const removeDuplicateTwoArray = async (arr1 = [],arr2 = []) => {
    return;
}