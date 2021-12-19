import ConversationPostModel from "./conversationPostModel";
import UserModel from "./userModel";


class CommentModel {
    id: number;
    body: string;
    record: string;
    user: UserModel;
    post: ConversationPostModel
    status: string;
    created_at: Date;
    updated_at: Date;
    favorite_numbers: number

    constructor(data: { id: number; body: string; record: string; favorite_numbers: number, content: string; author: UserModel; status: string; post: ConversationPostModel; created_at: Date; updated_at: Date; user: UserModel; }) {
        if (data === null) {
            return;
        }
        this.id = data?.id;
        this.body = data?.body ?? data?.content;
        this.record = data?.record;
        this.status = data?.status;
        this.post = data?.post;
        this.created_at = data?.created_at;
        this.updated_at = data?.updated_at;
        this.user = data?.user ?? data?.author;
        this.favorite_numbers = data?.favorite_numbers

    }



}

export default CommentModel