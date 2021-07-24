

class UserModel {
    id: Number;
    name: String;
    image_path: String;
    status: String;
    token:String;
    device_id:String;
    created_at: Date;
    updated_at: Date;
    access_token:String;

    constructor(data: { id: Number;device_id:String; name: String; picture: { data: { url: String; }; }; status: String; created_at: Date; updated_at: Date; access_token: String; }) {
        if (data === null) {
            return;
        }
        this.id = data?.id;
        this.name = data?.name;
        this.image_path = data?.picture?.data?.url;
        this.status = data?.status;
        this.created_at = data?.created_at;
        this.updated_at = data?.updated_at;
        this.token = data?.access_token
        this.device_id = data?.device_id
    }


    toString() {
        return {
            id:this.id,
            name:this.name,
            image_path:this.image_path,
            token:this.token,
            status:this.status,
            device_id:this.device_id,
            created_at:this.created_at,
            updated_at:this.updated_at,
            access_token:this.access_token
            
        }
    }


}

export default UserModel