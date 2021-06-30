import GrammarModel from "./grammarModel";


class GrammarExcerciseModel {
    id: Number;
    question: String;
    option_a: String;
    option_b:String;
    option_c:String;
    option_d:String;
    answer:String;
    correct_answser:String;
    answer_reference:String;
    excercise_type:String;
    status: String;
    created_at: Date;
    updated_at: Date;
    grammar:GrammarModel

    constructor(data: { id: Number; question: String; option_a: String; option_b: String; option_c: String; option_d: String; answer: String; correct_answer: String; answer_reference: String; excercise_type: String; created_at: Date; updated_at: Date; grammar: GrammarModel; }) {
        if (data === null) {
            return;
        }
        this.id = data?.id;
        this.question = data?.question;
        this.option_a = data?.option_a;
        this.option_b = data?.option_b;
        this.option_c = data?.option_c;
        this.option_d = data?.option_d;
        this.answer = data?.answer;
        this.correct_answser = data?.correct_answer;
        this.answer_reference = data?.answer_reference;
        this.excercise_type = data?.excercise_type;
        this.created_at = data?.created_at;
        this.updated_at = data?.updated_at;
        this.grammar = data?.grammar;

    }


    toString() {
        return {
            id:this.id,
            question:this.question,
            option_a:this.option_a,
            option_b:this.option_b,
            option_c:this.option_c,
            option_d:this.option_d,
            answer: this.answer,
            correct_answser:this.correct_answser,
            answer_reference:this.answer_reference,
            excercise_type:this.excercise_type,
            status:this.status,
            created_at:this.created_at,
            updated_at:this.updated_at,
            grammar:this.grammar
        }
    }


}

export default GrammarExcerciseModel