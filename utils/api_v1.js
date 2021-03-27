
import { api_v1_url, api_flashcard_v1 } from '../config/api_config.json';

export const searchVocabulary = async (vocabulary) => {

    try {

        let url = `${api_v1_url}/search?qquery=${vocabulary}`;

        let fetchData = await fetch(url);

        if (!fetchData.ok) {
            return {
                status: false,
                message: "fetch failed",
                data: [],
            }
        }

        let dataRes = await fetchData.json();

        return {
            status: true,
            message: "fetch success",
            data: dataRes.data
        }

    } catch (error) {
        return {
            status: false,
            message: "fetch failed " + error,
            data: [],
        }
    }

}




export const getVocabularyDefinition = async (vocabulary_id) => {
    try {

        let url = `${api_v1_url}/vocabulary/${vocabulary_id}`;

        let fetchData = await fetch(url);

        if (!fetchData.ok) {
            return {
                status: false,
                message: "fetch failed",
                data: [],
            }
        }

        let dataRes = await fetchData.json();

        return {
            status: true,
            message: "fetch success",
            data: dataRes.data
        }

    } catch (error) {
        return {
            status: false,
            message: "fetch failed " + error,
            data: [],
        }
    }
}




export const getTopicList = async () => {
    try {
        let url = `${api_flashcard_v1}/topic`
        let fetchData = await fetch(url);

        if (!fetchData.ok) {
            return {
                status: false,
                message: "fetch failed",
                data: [],
            }
        }

        let dataRes = await fetchData.json();

        if (!dataRes.status) {
            return {
                status: false,
                message: "fetch failed ",
                data: [],
            }
        }

        return {
            status: true,
            message: "fetch success",
            data: dataRes.data
        }

    } catch (error) {
        return {
            status: false,
            message: "fetch failed " + error,
            data: [],
        }
    }
}





export const getTopicVocabulary = async (topic_id) => {
    try {
        let url = `${api_flashcard_v1}/topic/${topic_id}/vocabulary`
        let fetchData = await fetch(url);

        if (!fetchData.ok) {
            return {
                status: false,
                message: "fetch failed",
                data: [],
            }
        }

        let dataRes = await fetchData.json();

        if (!dataRes.status) {
            return {
                status: false,
                message: "fetch failed ",
                data: [],
            }
        }

        return {
            status: true,
            message: "fetch success",
            data: dataRes.data
        }

    } catch (error) {
        return {
            status: false,
            message: "fetch failed " + error,
            data: [],
        }
    }
}