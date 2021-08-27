import UserModel from "./userModel";

class FriendShipModel {
    id: Number;
    request_recipient_id: String;
    status: String;
    created_at: Date;
    updated_at: Date;
    recipient: UserModel
    sender: UserModel

    constructor(data) {
        if (data === null) {
            return;
        }
        this.id = data?.id;
        this.request_recipient_id = data?.request_recipient_id;
        this.status = data?.status;
        this.created_at = data?.created_at;
        this.updated_at = data?.updated_at;

        if (data.sender != null && data.sender != undefined) {
            this.sender = new UserModel(data?.sender)
        }

        if (data.recipient != null && data.recipient != undefined) {
            this.recipient = new UserModel(data?.recipient)
        }
    }


    toString() {
        return {
            id: this.id,
            status: this.status,
            created_at: this.created_at,
            updated_at: this.updated_at,
            recipient: this.recipient,
            sender: this.sender
        }
    }

    toDictionary() {
        return {
            id: this.id,
            status: this.status,
            created_at: this.created_at,
            updated_at: this.updated_at,
            recipient: this.recipient,
            sender: this.sender
        }
    }


}

export default FriendShipModel