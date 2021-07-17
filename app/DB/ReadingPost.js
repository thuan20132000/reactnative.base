import { Platform } from "react-native";
import SQLite from "react-native-sqlite-storage";
import FieldModel from "../models/fieldModel";
import SQLiteManager from "./SQLiteManage";



class ReadingPost extends SQLiteManager {


    toArrayData(results) {
        let temp = [];
        if (results?.rows?.length > 0) {
            for (let i = 0; i < results.rows.length; i++) {
                let current_row = results.rows.item(i);
                temp.push(current_row);
            }
        }
        return temp
    }

    toObjectData(results){        
        return results.rows.item(0);
    }

    getAllTopic(success) {
        this.openDB().then(() => {
            this.db.transaction(tx => {
                tx.executeSql("SELECT * FROM reading_readingtopic", [], (tx, results) => {
                    success(this.toArrayData(results))
                    this.closeDB()
                })
            })
        })
    }


    getReadingPost(success) {
        this.openDB().then(() => {
            this.db.transaction((tx) => {
                tx.executeSql("SELECT * FROM reading_readingpost ORDER BY created_at DESC", [], (tx, results) => {
                    success(this.toArrayData(results))
                    this.closeDB()
                })
            })
        })
    }

    getReadingPostByTopic(topic_id,success){
        this.openDB().then(() => {
            this.db.transaction((tx) => {
                tx.executeSql("SELECT * FROM reading_readingpost WHERE reading_topic_id=?", [topic_id], (tx, results) => {
                    success(this.toArrayData(results))
                    this.closeDB()
                })
            })
        })
    }

    getReadingPostDetail(readingpost_id,response){
        this.openDB().then(() => {
            this.db.transaction((tx) => {
                tx.executeSql("SELECT * FROM reading_readingpost WHERE id=? LIMIT 1", [readingpost_id], (tx, results) => {
                    response(this.toObjectData(results))
                    
                })
            })
        })
    }

    getReadingPostVocabulary(readingpost_id,response){
        this.openDB().then(() => {
            this.db.transaction((tx) => {
                tx.executeSql("SELECT * FROM reading_readingpostvocabulary WHERE reading_post_id=? ", [readingpost_id], (tx, results) => {
                    response(this.toArrayData(results))
                    
                })
            })
        })
    }



}

export default new ReadingPost();