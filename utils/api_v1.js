
import { api_v1_url, api_flashcard_v1, api_reading_v1 } from '../config/api_config.json';

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
        let fetchData = await fetch(url, {
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!fetchData.ok) {
            return {
                status: false,
                message: "fetch failed",
                data: [],
            }
        }

        let dataRes = await fetchData.json();
        console.log(dataRes);
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



export const getFieldsList = async () => {
    try {
        let url = `${api_flashcard_v1}/fields`
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



export const getFieldTopic = async (field_id) => {
    try {
        let url = `${api_flashcard_v1}/field/${field_id}`;
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




export const getReadingTopicsList = async () => {
    try {
        let url = `${api_reading_v1}/readingtopics`;
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

export const getReadingPostList = async (topic_id = null) => {
    try {
        let url = `${api_reading_v1}/readingposts`;
        if (topic_id) {
            url = `${api_reading_v1}/readingposts?topic=${topic_id}`;
        }
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
            data: dataRes.data,
            next: dataRes.next
        }

    } catch (error) {
        return {
            status: false,
            message: "fetch failed " + error,
            data: [],
        }
    }
}




export const getReadingPostDetail = async (readingpost_id) => {
    try {
        let url = `${api_reading_v1}/readingpost/${readingpost_id}`;
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