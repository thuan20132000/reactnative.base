
import { config } from "../constants/index";
import axios from 'axios'

class ReadingAPI {

    constructor() {
        this.api_url = config.api_url
        this.axios = axios
    }

    async getAllReadingPost(topic_id=null) {
        let path = `/reading/v1/readingposts/`;
        path = topic_id == null?path:`${path}?topic=${topic_id}`
        return this.axios.get(this.api_url + path, {
            params: {}
        })
            .then(function (response) {
                return response.data
            })
            .catch(function (error) {
                throw error
            })
    }

    async getReadingTopicList(topic_id=null) {
        let path = `/reading/v1/readingtopics/`;
        return this.axios.get(this.api_url + path, {
            params: {}
        })
            .then(function (response) {
                return response.data
            })
            .catch(function(error){
                throw error
            })
    }

    async getReadingPostDetail(reading_id){
        let path = `/reading/v1/readingpost/${reading_id}`;
        return this.axios.get(this.api_url + path, {
            params: {}
        })
            .then(function (response) {
                return response.data
            })
            .catch(function (error) {
                throw error
            })
    }


}

export default new ReadingAPI();