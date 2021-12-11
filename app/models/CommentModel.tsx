import ConversationPostModel from "./conversationPostModel";
import UserModel from "./userModel";


class CommentModel {
    id: Number;
    body: String;
    user: UserModel;
    post: ConversationPostModel
    status: String;
    created_at: Date;
    updated_at: Date;

    constructor(data: { id: Number; body: String; status: String; post: ConversationPostModel; created_at: Date; updated_at: Date; user: UserModel; }) {
        if (data === null) {
            return;
        }
        this.id = data?.id;
        this.body = data?.body;

        this.status = data?.status;
        this.post = data?.post;
        this.created_at = data?.created_at;
        this.updated_at = data?.updated_at;
        this.user = data?.user;

    }


    toString() {
        return {
            id: this.id,
            body: this.body,
            status: this.status,
            created_at: this.created_at,
            updated_at: this.updated_at,
            post: this.post,
            user: this.user
        }
    }


}

export default CommentModel