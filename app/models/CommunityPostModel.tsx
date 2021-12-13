import ConversationTopicModel from "./conversationTopicModel";
import ReadingTopicModel from "./readingTopicModel";
import UserModel from "./userModel";


class CommunityPostModel {
    id: number;
    title: string;
    slug: string;
    image: string;
    content: string;
    summary: string;
    practice_number: number;
    record: string;
    status: string;
    created_at: Date;
    updated_at: Date;
    author: UserModel
    favorite_numbers: number
    comment_numbers: number
    is_user_favorite: boolean
    constructor(data: { id: number; author: UserModel; is_user_favorite: boolean; comment_numbers: number; favorite_numbers: number; title: string; slug: string; image: string; summary: string; status: string; record: string; content: string; conversation_topic: ConversationTopicModel; created_at: Date; updated_at: Date; }) {
        if (data === null) {
            return;
        }
        this.id = data?.id;
        this.title = data?.title;
        this.slug = data?.slug;
        this.image = data?.image;
        this.summary = data?.summary;
        this.status = data?.status;
        this.record = data?.record;
        this.content = data?.content;
        this.created_at = data?.created_at;
        this.updated_at = data?.updated_at;
        this.author = data?.author;
        this.favorite_numbers = data?.favorite_numbers;
        this.comment_numbers = data?.comment_numbers;
        this.is_user_favorite = data?.is_user_favorite;
    }





}

export default CommunityPostModel