
import { config } from "../constants/index";
import axios from 'axios'

class QuizAPI {

    constructor() {
        this.api_url = config.api_url
        this.axios = axios
    }

    async getAllField() {
        return this.axios.get(this.api_url + 'quiz/v1/fields/', {
            params: {}
        })
            .then(function (response) {
                return response.data
            })
            .catch(function (error) {
                throw error
            })
    }

    async getAllTopicByField(field_id) {
        return this.axios.get(this.api_url + `quiz/v1/field/${field_id}`, {
            params: {}
        })
            .then(function (response) {
                return response.data
            })
            .catch(function(error){
                throw error
            })
    }

}

export default new QuizAPI();