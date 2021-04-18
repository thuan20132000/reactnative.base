import {
    ADD_READING_VOCABULARY_TO_LEARN,
    SET_READING_VOCABULARY_LIST,
    RESET_LEARN_VOCABULARY_LIST,
    SKIP_VOCABULARY_TO_LEARN,
    ADD_READING_LEARNT_VOCABULARY,
    REFRESH_PRACTICE_VOCABULARY,
} from '../actions/readingActions'



const initialState = {
    reading_vocabulary_list: [],
    learnt_vocabulary_list: [],
    sample_vocabulary_list: [],
    practice_vocabulary_list: [],
}



export default (state = initialState, action) => {
    switch (action.type) {
      
        case SET_READING_VOCABULARY_LIST:
            // var current_vocabulary_list = state.vocabulary_list;
            // var new_vocabulary_list = [...state.vocabulary_list,]
            // console.warn('reucer: ',state.vocabulary_list);
            return {
                ...state,
                reading_vocabulary_list: action.reading_vocabulary_list,
                sample_vocabulary_list: action.sample_vocabulary_list,
                practice_vocabulary_list: action.reading_vocabulary_list
            }

        case ADD_READING_LEARNT_VOCABULARY:
            
            var vocabulary = action.vocabulary;
            var new_learnt_vocabulary_list = [...state.learnt_vocabulary_list, vocabulary];
            var new_practice_vocabulary_list = state.practice_vocabulary_list.filter((e) => e.ID != vocabulary.ID);
            
            return {
                ...state,
                learnt_vocabulary_list: new_learnt_vocabulary_list,
                practice_vocabulary_list: new_practice_vocabulary_list
            }

        default:
            break;
    }

    return state
}