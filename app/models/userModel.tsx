

class UserModel {
    id: Number;
    name: String;
    profile_pic: String;
    status: String;
    token: String;
    device_id: String;
    created_at: Date;
    updated_at: Date;
    access_token: String;
    descriptions :String;

    constructor(data: { id: Number; name: String; picture: { data: { url: String; }; }; status: String; created_at: Date; updated_at: Date; access_token: String; device_id: String; descriptions: String; }) {
        if (data === null) {
            return;
        }
        this.id = data?.id;
        this.name = data?.name;
        this.profile_pic = data?.picture?.data?.url;
        this.status = data?.status;
        this.created_at = data?.created_at;
        this.updated_at = data?.updated_at;
        this.token = data?.access_token;
        this.device_id = data?.device_id;
        this.descriptions = data?.descriptions;
    }


    toString() {
        return {
            id: this.id,
            name: this.name,
            profile_pic: this.profile_pic,
            token: this.token,
            status: this.status,
            device_id: this.device_id,
            descriptions:this.descriptions,
            created_at: this.created_at,
            updated_at: this.updated_at,
            access_token: this.access_token

        }
    }


}

export default UserModel