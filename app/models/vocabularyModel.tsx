import TopicModel from "./topicModel";



class VocabularyModel {
    id:String;
    name:String;
    word_type:String;
    phon_us:String;
    phon_uk:String;
    sound_us:String;
    sound_uk:String;
    meaning:String;
    definition:String;
    example:String;
    status: String;
    created_at: Date;
    updated_at: Date;
    topics:Array<TopicModel>;


    constructor(data) {
        if (data === null) {
            return;
        }
        this.id = data?.ID ?? data?.id;
        this.name = data?.name;
        this.word_type = data?.word_type;
        this.phon_us = data?.phon_us;
        this.phon_uk = data?.phon_uk;
        this.sound_us = data?.sound_us;
        this.sound_uk = data?.sound_uk;
        this.definition = data?.definition;
        this.meaning = data?.meaning;
        this.example = data?.example;
        this.status = data?.status;
        this.created_at = data?.created_at;
        this.updated_at = data?.updated_at;
        this.topics = data?.topics
    }


    toString() {
        return {
            id: this.id,
            name: this.name,
        }
    }
}

export default VocabularyModel;