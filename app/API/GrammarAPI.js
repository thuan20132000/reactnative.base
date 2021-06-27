import { config } from "../constants/index";
import axios from 'axios'

class GrammarAPI {

    constructor() {
        this.api_url = config.api_url+'/grammar/v1'
        this.axios = axios
    }

    async getAllGrammar() {
        return this.axios.get(this.api_url + '/grammars/', {
            params: {}
        })
            .then(function (response) {
                return response.data
            })
            .catch(function (error) {
                throw error
            }
        )
    }

    async getGrammarDescription(grammar_id){
        return this.axios.get(this.api_url + `/grammar/${grammar_id}`, {
            params: {}
        })
            .then(function (response) {
                return response.data
            })
            .catch(function (error) {
                throw error
            }
        )
    }

    async getGrammarExcercise(grammar_id){
        return this.axios.get(this.api_url + `/grammar/${grammar_id}/excercises`, {
            params: {}
        })
            .then(function (response) {
                return response.data
            })
            .catch(function (error) {
                throw error
            }
        )
    }


}

export default new GrammarAPI();