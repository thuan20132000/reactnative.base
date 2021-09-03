

class UserModel {
    id: Number;
    username: String;
    profile_pic: String;
    status: Boolean;
    token: String;
    device_id: String;
    created_at: Date;
    updated_at: Date;
    access_token: String;
    descriptions: String;
    is_friendship: Boolean
    fullname: String

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
        this.fullname = data?.fullname
        if (data?.status == 1) {
            this.status = true
        } else {
            this.status = false
        }
    }


    setProfilePic(imageUrl: String) {
        this.profile_pic = imageUrl ?? null
    }

    toString() {
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