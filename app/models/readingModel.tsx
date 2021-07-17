import ReadingTopicModel from "./readingTopicModel";


class ReadingModel {
    id: Number;
    title: String;
    slug: String;
    image: String;
    content: String;
    summary: String;
    practice_number: Number;
    practice_audio: String;
    reading_topic_id: Number;
    status: String;
    created_at: Date;
    updated_at: Date;

    constructor(data: { id: Number; title: String; slug: String;reading_audio:String ;image: String; content: String; summary: String; status: String; reading_topic_id: Number; created_at: Date; updated_at: Date; }) {
        if (data === null) {
            return;
        }
        this.id = data?.id;
        this.title = data?.title;
        this.slug = data?.slug;
        this.image = data?.image;
        this.summary = data?.summary;
        this.status = data?.status;
        this.practice_audio = data?.reading_audio;
        this.content = data?.content;
        this.reading_topic_id = data?.reading_topic_id;
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
            reading_topic_id: this.reading_topic_id
        }
    }


}

export default ReadingModel