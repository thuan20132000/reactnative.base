export const ADD_VOCABULARY_TO_LEARN = 'ADD_VOCABULARY_TO_LEARN'
export const SET_VOCABULARY_LIST = 'SET_VOCABULARY_LIST'
export const RESET_LEARN_VOCABULARY_LIST = 'RESET_LEARN_VOCABULARY_LIST'
export const SKIP_VOCABULARY_TO_LEARN = 'SKIP_VOCABULARY_TO_LEARN'
export const ADD_LEARNT_VOCABULARY = 'ADD_LEARNT_VOCABULARY'
export const REFRESH_PRACTICE_VOCABULARY = 'REFRESH_PRACTICE_VOCABULARY'



export const addVocabulary = (vocabulary) => {
    return {
        vocabulary: vocabulary,
        type: ADD_VOCABULARY_TO_LEARN
    }
}




export const skipVocabulary = (vocabulary) => {
    return {
        vocabulary: vocabulary,
        type: SKIP_VOCABULARY_TO_LEARN
    }
}



export const setTopicVocabularyList = (vocabulary_list,vocabulary_stack,topic_slug) => {
    return async (dispatch) => {
        // let vocabulary_list = await fetch(``)
        // console.warn('list: ',vocabulary_list);
        let temp_vocal = vocabulary_list
        dispatch({
            data: temp_vocal,
            vocabulary_stack:vocabulary_stack,
            topic:topic_slug,
            type: SET_VOCABULARY_LIST
        })
    }
}





export const addLearntVocabulary = (vocabulary) => {
    return {
        vocabulary: vocabulary,
        type: ADD_LEARNT_VOCABULARY

    }
}




export const refreshPracticeVocabulary = () => {
    return {
        type: REFRESH_PRACTICE_VOCABULARY
    }
}



export const resetLearnVocabularyList = () => {
    return {
        type: RESET_LEARN_VOCABULARY_LIST
    }
}



