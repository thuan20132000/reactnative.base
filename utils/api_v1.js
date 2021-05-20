
import { api_v1_url, api_flashcard_v1, api_reading_v1, api_community_v1 } from '../config/api_config.json';

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


export const sigin = async (phonenumner, password) => {
    try {
        let url = `${api_community_v1}/signin`;

        let formdata = new FormData();
        formdata.append('phonenumber', phonenumner);
        formdata.append('password', password);
        let fetchData = await fetch(url, {
            method: 'POST',
            body: formdata
        });

        if (!fetchData.ok) {
            return {
                status: false,
                message: fetchData,
                data: [],
            }
        }

        let dataRes = await fetchData.json();
        if (!dataRes.status) {
            return {
                status: false,
                message: dataRes,
                data: [],
            }
        }

        return {
            status: true,
            message: "fetch success",
            data: dataRes
        }

    } catch (error) {
        return {
            status: false,
            message: "fetch failed " + error,
            data: [],
        }
    }
}


export const getCommunityPosts = async (token) => {
    try {
        let url = `${api_community_v1}/posts`;
        let fetchData = await fetch(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!fetchData.ok) {
            return {
                status: false,
                message: fetchData,
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
            data: dataRes
        }

    } catch (error) {
        return {
            status: false,
            message: "fetch failed " + error,
            data: [],
        }
    }
}

export const getPostDetail = async (post_id, token) => {
    try {
        let url = `${api_community_v1}/post/${post_id}`;
        let fetchData = await fetch(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!fetchData.ok) {
            return {
                status: false,
                message: fetchData,
                data: null,
            }
        }

        let dataRes = await fetchData.json();

        if (!dataRes.status) {
            return {
                status: false,
                message: "fetch failed ",
                data: null,
            }
        }

        return {
            status: true,
            message: "fetch success",
            data: dataRes
        }

    } catch (error) {
        return {
            status: false,
            message: "fetch failed " + error,
            data: null,
        }
    }
}



export const getPostComments = async (post_id, token) => {
    try {
        let url = `${api_community_v1}/post/${post_id}/comments?limit=16`;
        let fetchData = await fetch(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!fetchData.ok) {
            return {
                status: false,
                message: fetchData,
                data: null,
            }
        }

        let dataRes = await fetchData.json();

        if (!dataRes.status) {
            return {
                status: false,
                message: "fetch failed ",
                data: null,
            }
        }

        return {
            status: true,
            message: "fetch success",
            data: dataRes
        }

    } catch (error) {
        return {
            status: false,
            message: "fetch failed " + error,
            data: null,
        }
    }
}


export const createPostComment = async (author_id,text,type='text',audio='',post_id,token) => {
    try {
        let formdata = new FormData();
        formdata.append('author_id',author_id);
        formdata.append('text',text);
        formdata.append('type',type);
        formdata.append('audio',audio);

        let url = `${api_community_v1}/post/${post_id}/comment`;
        let fetchData = await fetch(url, {
            method:'POST',
            body:formdata,
            headers: {
                Authorization: `Bearer ${token}`
            },
           
        });

        if (!fetchData.ok) {
            return {
                status: false,
                message: fetchData,
                data: null,
            }
        }

        let dataRes = await fetchData.json();

        if (!dataRes.status) {
            return {
                status: false,
                message:dataRes,
                data: null,
            }
        }

        return {
            status: true,
            message: "fetch success",
            data: dataRes
        }

    } catch (error) {
        return {
            status: false,
            message: "fetch failed " + error,
            data: null,
        }
    }
}



export const handleFavorite = async (post_id,author_id,token) => {
    try {


        let url = `${api_community_v1}/post/${post_id}/favorite/${author_id}`;
        let fetchData = await fetch(url, {
            method:'POST',
            headers: {
                Authorization: `Bearer ${token}`
            },
           
        });

        if (!fetchData.ok) {
            return {
                status: false,
                message: fetchData,
                data: null,
            }
        }

        let dataRes = await fetchData.json();

        if (!dataRes.status) {
            return {
                status: false,
                message:dataRes,
                data: null,
            }
        }

        return {
            status: true,
            message: "fetch success",
            data: dataRes
        }

    } catch (error) {
        return {
            status: false,
            message: "fetch failed " + error,
            data: null,
        }
    }
}