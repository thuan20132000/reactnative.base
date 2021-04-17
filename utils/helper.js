
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




export const _onGetRandomInt = (max) => {

    let random_number = Math.floor(Math.random() * max);

    return random_number;


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






export const saveLearntVocabularyByTopic = async (topic_slug, values) => {

    try {

        let vocabulary_list = await getLearntVocabularyByTopic(topic_slug);
        let new_learnt_vocabulary_list = [];
        if (vocabulary_list == null) {
            vocabulary_list = [];
        }
        if (values && values.length > 0) {
            new_learnt_vocabulary_list = vocabulary_list.concat(values);
        }

        const jsonValue = JSON.stringify(new_learnt_vocabulary_list);
        await AsyncStorage.setItem(`@learnt_${topic_slug}_vocabulary`, jsonValue);

        return true;
    } catch (e) {
        // saving error
        console.warn('error: ', e);
        return false
    }

}


export const getSearchedvocabularyList = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem(`@searched_vocabulary_list`);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        // error reading value
        console.log('error: ', e);
        return false;
    }
}

export const saveSearchedVocabulary = async (vocabulary) => {
    try {

        let vocabulary_list = await getSearchedvocabularyList();

        let new_favorite_vocabulary_list = [];
        if (vocabulary_list === false) {
            return false;
        }
        if (vocabulary_list === null) {
            new_favorite_vocabulary_list.push(vocabulary)
        } else {
            let isExists = _onCheckItemExistInArray(vocabulary, vocabulary_list);

            if (isExists) {
                new_favorite_vocabulary_list = vocabulary_list.filter(e => e.ID != vocabulary.ID);
            } else {
                // new_favorite_vocabulary_list.push(vocabulary);
                new_favorite_vocabulary_list = [...vocabulary_list, vocabulary]
            }
        }



        const jsonValue = JSON.stringify(new_favorite_vocabulary_list);
        await AsyncStorage.setItem(`@searched_vocabulary_list`, jsonValue);

        return true;
    } catch (e) {
        // saving error
        console.warn('error: ', e);
        return false
    }
}




export const saveNearestSearchVocabulary = async (vocabulary) => {
    try {
        const jsonValue = JSON.stringify(vocabulary);
        await AsyncStorage.setItem(`@nearest_search_vocabulary`, jsonValue);
        return true;
    } catch (error) {
        return false;
    }
}



export const getNearestSearchVocabulary = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem(`@nearest_search_vocabulary`);
        return jsonValue != null ? JSON.parse(jsonValue) : false;
    } catch (e) {
        // error reading value
        return false;
    }

}




export const getLearntVocabularyByTopic = async (topic_slug) => {

    try {
        const jsonValue = await AsyncStorage.getItem(`@learnt_${topic_slug}_vocabulary`);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        // error reading value
        return false;
    }

}




export const resetLearntVocabularyByTopic = async (topic_slug) => {
    try {



        const jsonValue = JSON.stringify([]);
        await AsyncStorage.setItem(`@learnt_${topic_slug}_vocabulary`, jsonValue);

        return true;
    } catch (e) {
        // saving error
        console.warn('error: ', e);
        return false
    }
}






export const getLastActiveDate = async () => {
    try {
        let today = new Date();

        const jsonValue = await AsyncStorage.getItem(`@lastaction_datetime`);
        return jsonValue != null ? JSON.parse(jsonValue) : today;
    } catch (error) {
        console.log('error: ', error);
        return false;
    }
}



export const getActionDays = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem(`@action_days`);
        return jsonValue != null ? JSON.parse(jsonValue) : 1;
    } catch (error) {
        console.log('error: ', error);
        return false;
    }
}



export const saveDateActions = async () => {
    try {
        let today = new Date();

        let lastdate_active = await getLastActiveDate();
        if (lastdate_active) {
            let lastdate = new Date(lastdate_active);
            let daytime = 60 * 60 * 24 * 1000;
            if ((today - lastdate) > daytime) {
                const jsonValue = JSON.stringify(0);
                await AsyncStorage.setItem(`@action_days`, jsonValue);
            } else {
                let action_days = await getActionDays();
                await AsyncStorage.setItem(`action_days`, action_days + 1);
            }

        }
        await AsyncStorage.setItem(`lastaction_datetime`, today);
        return true;

    } catch (error) {
        console.log('error: ', error);
        return false;
    }
}




export const filterDuplicate = async (values = []) => {
    try {
        let newValues = [];
        let mapValue = new Map();

        for (let item of values) {
            if (!mapValue.has(item.ID)) {
                mapValue.set(item.ID, item);
                newValues.push(item);
            }
        }
        return newValues
    } catch (error) {
        console.warn(error)
        return false;
    }
}




export const removeDuplicateTwoArray = async (arr1 = [], arr2 = []) => {
    return;
}




export const _onSaveRemindSetting = async (remind_type, value) => {
    try {

        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(`@remind_${remind_type}`, jsonValue);

        return true;
    } catch (e) {
        // saving error
        console.warn('error: ', e);
        return false
    }

}


export const _onGetRemindSetting = async (remind_type) => {
    try {
        const jsonValue = await AsyncStorage.getItem(`@remind_${remind_type}`);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        // error reading value
        return false;
    }
}


export const millisToMinutesAndSeconds = (millis) => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

