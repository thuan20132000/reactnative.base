import { Platform } from "react-native";
import SQLite from "react-native-sqlite-storage";
import FieldModel from "../models/fieldModel";
import SQLiteManager from "./SQLiteManage";


class Quiz extends SQLiteManager {


    getAllField(success, error) {
        this.openDB().then(() => {
            this.db.transaction((tx) => {
                tx.executeSql("SELECT * FROM quiz_field", [], (tx, results) => {

                    let temp = [];
                    if (results.rows.length > 0) {
                        for (let i = 0; i < results.rows.length; ++i) {
                            temp.push(results.rows.item(i));
                        }
                    }
                    success(temp)
                })
            })

        }).catch((err) => {
            console.warn(err)
        })

    }




    getFieldTopic(field_id, success, error) {


        try {

            // console.warn(sss)
            this.openDB().then(() => {
                this.db.transaction((tx) => {
                    tx.executeSql("SELECT * FROM quiz_topic WHERE field_id=? ", [field_id], (tx, results) => {

                        let temp = [];
                        if (results.rows.length > 0) {
                            for (let i = 0; i < results.rows.length; i++) {
                                let current_row = results.rows.item(i);

                                temp.push(current_row);


                            }
                            success(temp)

                        }
                        // this.closeDB()
                    })
                })
            })

        } catch (error) {
            console.warn('error: ', error)
        }
    }

    getTopicVocabularyTotal(topic_id) {

        return new Promise((resolve, reject) => {
            this.openDB().then(() => {
                this.db.transaction((tx) => {
                    tx.executeSql("SELECT id FROM quiz_vocabularycard_topics WHERE topic_id=? ", [topic_id], (tx, results) => {
                        resolve(results.rows.length)
                    })
                })
            })
        })

    }



    getTopicVocabularyList(topic_id) {
        console.warn('t: ', topic_id)
        return new Promise((resolve, reject) => {
            this.openDB().then(() => {
                this.db.transaction((tx) => {
                    let queryStr = "SELECT * FROM quiz_vocabularycard qv INNER JOIN quiz_vocabularycard_topics ON quiz_vocabularycard_topics.vocabularycard_id=qv.id WHERE quiz_vocabularycard_topics.topic_id=?";
                    tx.executeSql(queryStr, [topic_id], (tx, results) => {
                        // resolve(results.rows.length)
                        let temp = [];
                        if (results.rows.length > 0) {
                            for (let i = 0; i < results.rows.length; i++) {
                                let current_row = results.rows.item(i);

                                temp.push(current_row);


                            }
                            resolve(temp)

                        }
                        // resolve(results.rows)
                    })
                })
            })
        })
    }

}


export default new Quiz()