
import { api_v1_url, api_flashcard_v1, api_reading_v1, api_community_v1 } from '../../config/api_config.json';

const updateAvatar = async (uri,type,name,token) => {
    try {
        let image= {
            uri:uri,
            type:type,
            name:name
        }
        console.warn(image);
        let formData = new FormData();
        formData.append('image_file',image);
        // formData.append("image_file",)
        let url = `${api_community_v1}/update-profile`;
        let fetchData = await fetch(url, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
            },
            method:'PUT',
            body:formData
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


export {updateAvatar}