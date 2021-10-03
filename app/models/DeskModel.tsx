

class DeskModel {
    id: String;
    name: String;
    created_at: Date;
    updated_at: Date;
    vocabulary_number:Number

    constructor(data) {
        if (data === null) {
            return;
        }
        this.id = data?.id;
        this.name = data?.name;
        this.vocabulary_number = data?.vocabulary_number;
        this.created_at = data?.created_at;
        this.updated_at = data?.updated_at;
    }


    toString() {
        return {
            id:this.id,
            name:this.name,
            vocabulary_number:this.vocabulary_number,
            created_at:this.created_at,
            updated_at:this.updated_at
        }
    }


}

export default DeskModel