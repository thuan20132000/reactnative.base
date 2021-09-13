import TopicModel from "./topicModel";
import VocabularyModel from "./vocabularyModel";



class PracticeVocabularyModel extends VocabularyModel {


    native_name: String
    image_url: String
    remind_time: Date

    constructor(data) {
        super(data)
        if (data === null) {
            return;
        }
        this.image_url = data?.image_url
        this.native_name = data?.native_name
        this.remind_time = data?.remind_time
    }


    toString() {
        return {
            id: this.id,
            name: this.name,
            word_type: this.word_type,
            phon_us: this.phon_us,
            phon_uk: this.phon_uk,
            sound_us: this.sound_us,
            sound_uk: this.sound_uk,
            definition: this.definition,
            meaning: this.meaning,
            example: this.example,
            status: this.status,
            created_at: this.created_at,
            updated_at: this.updated_at,
            topics: this.topics,
            native_name: this.native_name,
            image_url: this.image_url,
            remind_time: this.remind_time
        }
    }
}

export default PracticeVocabularyModel;