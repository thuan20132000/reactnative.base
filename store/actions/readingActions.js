export const ADD_READING_VOCABULARY_TO_LEARN = 'ADD_VOCABULARY_TO_LEARN'
export const SET_READING_VOCABULARY_LIST = 'SET_VOCABULARY_LIST'
export const RESET_READING_LEARN_VOCABULARY_LIST = 'RESET_LEARN_VOCABULARY_LIST'
export const SKIP_READING_VOCABULARY_TO_LEARN = 'SKIP_VOCABULARY_TO_LEARN'
export const ADD_READING_LEARNT_VOCABULARY = 'ADD_LEARNT_VOCABULARY'
export const REFRESH_READING_PRACTICE_VOCABULARY = 'REFRESH_PRACTICE_VOCABULARY'

export const RESET_READING_LEARNT_VOCABULARY_LIST = 'RESET_READING_LEARNT_VOCABULARY_LIST'



export const setReadingVocabularyList = (reading_vocabulary_list, sample_vocabulary_list) => {
    return async (dispatch) => {
        // let vocabulary_list = await fetch(``)
        // console.warn('list: ',vocabulary_list);
        dispatch({
            sample_vocabulary_list: sample_vocabulary_list,
            reading_vocabulary_list: reading_vocabulary_list,
            type: SET_READING_VOCABULARY_LIST
        })
    }
}


export const addLearntVocabulary = (vocabulary) => {
    return {
        vocabulary: vocabulary,
        type: ADD_READING_LEARNT_VOCABULARY

    }
}


export const refreshPracticeVocabulary = () => {
    return {
        type: REFRESH_READING_PRACTICE_VOCABULARY
    }
}


export const resetLearnVocabularyList = () => {
    return {
        type: RESET_READING_LEARN_VOCABULARY_LIST
    }
}


export const resetReadingLearntVocabularyList = () => {
    return {
        type: RESET_READING_LEARNT_VOCABULARY_LIST
    }
}