import {
    ADD_VOCABULARY_TO_LEARN,
    SET_VOCABULARY_LIST,
    RESET_LEARN_VOCABULARY_LIST,
    SKIP_VOCABULARY_TO_LEARN,
    ADD_LEARNT_VOCABULARY,
    REFRESH_PRACTICE_VOCABULARY,
} from '../actions/flashcardActions'


const initialState = {
    topic_vocabulary_list: [],
    vocabulary_stack: [],
    learn_vocabulary_list: [],
    skip_vocabulary_list: [],
    practice_vocabulary_list: [],
    learnt_vocabulary_list: [],
    topic:''
}



export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_VOCABULARY_TO_LEARN:
            // var current_flashcard_list = state.flashcard_list;
            var vocabulary = action.vocabulary;
            var new_vocabulary_stack = state.vocabulary_stack.filter(e => e.id != vocabulary.id);
            var new_practice_vocabulary_list = [...state.practice_vocabulary_list, vocabulary];

            return {
                ...state,
                practice_vocabulary_list: new_practice_vocabulary_list,
                vocabulary_stack: new_vocabulary_stack

            }


        case ADD_LEARNT_VOCABULARY:



            var vocabulary = action.vocabulary;
            var new_learnt_vocabulary_list = [...state.learnt_vocabulary_list,vocabulary];

            var temp_practice_vocabulary_list = state.practice_vocabulary_list;

            var new_practice_vocabulary_list = temp_practice_vocabulary_list.filter(e => e.id != vocabulary.id);

            return {
                ...state,
                learnt_vocabulary_list: new_learnt_vocabulary_list,
                practice_vocabulary_list:new_practice_vocabulary_list
            }

        case SKIP_VOCABULARY_TO_LEARN:
            var vocabulary = action.vocabulary;
            var new_vocabulary_stack = state.vocabulary_stack.filter(e => e.id != vocabulary.id);
            var new_skip_vocabulary_list = [...state.skip_vocabulary_list, vocabulary];

            return {
                ...state,
                vocabulary_stack: new_vocabulary_stack,
                skip_vocabulary_list: new_skip_vocabulary_list,
            }


        case REFRESH_PRACTICE_VOCABULARY:
            var new_practice_vocabulary_list = state.practice_vocabulary_list.sort((a,b) => b.name - a.name).reverse()

            return {
                ...state,
                practice_vocabulary_list:new_practice_vocabulary_list
            }

        case SET_VOCABULARY_LIST:
            // var current_vocabulary_list = state.vocabulary_list;
            // var new_vocabulary_list = [...state.vocabulary_list,]
            // console.warn('reucer: ',state.vocabulary_list);
            return {
                ...state,
                topic_vocabulary_list: action.data,
                vocabulary_stack: action.vocabulary_stack,
                topic:action.topic
            }


        case RESET_LEARN_VOCABULARY_LIST:

            return {
                ...state,
                learn_vocabulary_list: [],
                skip_vocabulary_list: [],
                topic_vocabulary_list: [],
                practice_vocabulary_list: [],
                learnt_vocabulary_list:[],
            }


        default:
            break;
    }

    return state;
}