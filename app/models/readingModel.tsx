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
    reading_topic: ReadingTopicModel;
    status: String;
    created_at: Date;
    updated_at: Date;

    constructor(data: { id: Number; name: String; summary: String; slug: String; image: String; status: String; created_at: Date; updated_at: Date; reading_topic: ReadingTopicModel }) {
        if (data === null) {
            return;
        }
        this.id = data?.id;
        this.title = data?.name;
        this.slug = data?.slug;
        this.image = data?.image;
        this.summary = data?.summary;
        this.status = data?.status;
        this.reading_topic = data?.reading_topic;
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
            reading_topic: this.reading_topic
        }
    }


}

export default ReadingModel