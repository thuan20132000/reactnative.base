import ConversationPostModel from "./conversationPostModel";
import UserModel from "./userModel";


class ConversationGroupModel {
    id: Number;
    name: String;
    slug:String;
    conversation: ConversationPostModel;
    status: String;
    created_at: Date;
    updated_at: Date;
    author:UserModel;

    constructor(data: { id: Number; name: String; slug: String; status: String; conversation: ConversationPostModel; created_at: Date; updated_at: Date; author: UserModel; }) {
        if (data === null) {
            return;
        }
        this.id = data?.id;
        this.name = data?.name;
        this.slug = data?.slug;
  
        this.status = data?.status;
        this.conversation = data?.conversation;
        this.created_at = data?.created_at;
        this.updated_at = data?.updated_at;
        this.author = data?.author;

    }


    toString() {
        return {
            id: this.id,
            name: this.name,
            status: this.status,
            created_at: this.created_at,
            updated_at: this.updated_at,
            conversation: this.conversation,
            author:this.author
        }
    }


}

export default ConversationGroupModel