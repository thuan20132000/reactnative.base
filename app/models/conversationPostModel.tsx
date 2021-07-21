import ConversationTopicModel from "./conversationTopicModel";
import ReadingTopicModel from "./readingTopicModel";


class ConversationPostModel {
    id: Number;
    title: String;
    slug: String;
    image: String;
    content: String;
    summary: String;
    practice_number: Number;
    audio: String;
    conversation_topic: ConversationTopicModel;
    status: String;
    created_at: Date;
    updated_at: Date;

    constructor(data: { id: Number; title: String; slug: String; image: String; summary: String; status: String; audio: String; content: String; conversation_topic: ConversationTopicModel; created_at: Date; updated_at: Date; }) {
        if (data === null) {
            return;
        }
        this.id = data?.id;
        this.title = data?.title;
        this.slug = data?.slug;
        this.image = data?.image;
        this.summary = data?.summary;
        this.status = data?.status;
        this.audio = data?.audio;
        this.content = data?.content;
        this.conversation_topic = data?.conversation_topic;
        this.created_at = data?.created_at;
        this.updated_at = data?.updated_at;

    }


    toString() {
        return {
            id: this.id,
            name: this.title,
            image: this.image,
            status: this.status,
            created_at: this.created_at,
            updated_at: this.updated_at,
            conversation_topic: this.conversation_topic
        }
    }


}

export default ConversationPostModel