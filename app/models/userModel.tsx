import CommonImages from "../../utils/CommonImages";


class UserModel {
    id: Number;
    username: string;
    profile_pic: string;
    status: Boolean;
    token: string;
    device_id: string;
    created_at: Date;
    updated_at: Date;
    access_token: string;
    descriptions: string;
    is_friendship: Boolean
    fullname: string

    constructor(data) {
        if (data === null) {
            return;
        }
        this.id = data?.id;
        this.username = data?.username ?? data?.name;
        this.profile_pic = data?.profile_pic;
        this.status = data?.status;
        this.created_at = data?.created_at;
        this.updated_at = data?.updated_at;
        this.token = data?.access_token;
        this.device_id = data?.device_id;
        this.descriptions = data?.descriptions;
        this.is_friendship = data?.is_friendship;
        this.fullname = data?.fullname ?? data?.username
        if (data?.status == 1) {
            this.status = true
        } else {
            this.status = false
        }
        if (data?.profile_pic && data?.profile_pic != 'undefined') {
            this.profile_pic = data?.profile_pic
        } else {
            this.profile_pic = null
        }
    }

    // getAvatar() {
    //     if (this.profile_pic && this.profile_pic != null && this.profile_pic != 'undefined') {
    //         return this.profile_pic
    //     } else {
    //         return undefined
    //     }
    // }

    setProfilePic(imageUrl: string) {
        this.profile_pic = imageUrl ?? null
    }

    tostring() {
        return {
            id: this.id,
            username: this.username,
            profile_pic: this.profile_pic,
            token: this.token,
            status: this.status,
            device_id: this.device_id,
            descriptions: this.descriptions,
            created_at: this.created_at,
            updated_at: this.updated_at,
            access_token: this.access_token,
            is_friendship: this.is_friendship,
            fullname: this.fullname
        }
    }


}

export default UserModel