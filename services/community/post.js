
import { api_v1_url, api_flashcard_v1, api_reading_v1, api_community_v1 } from '../../config/api_config.json';

const getUserPosts = async (token) => {
    try {
        let url = `${api_community_v1}/posts?is_user_post`;
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



const deletePost = async (post_id,token) => {
    try {
        let url = `${api_community_v1}/post/${post_id}/delete`;
        let fetchData = await fetch(url, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            method:'DELETE'
        });

        if (!fetchData.ok) {
            return {
                status: false,
                message: fetchData,
                data: [],
            }
        }

        let dataRes = await fetchData.json();
        return dataRes

    } catch (error) {
        return {
            status: false,
            message: "fetch failed " + error,
            data: [],
        }
    }
}

export { getUserPosts ,deletePost}