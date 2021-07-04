import { Platform } from "react-native";
import SQLite from "react-native-sqlite-storage";
import FieldModel from "../models/fieldModel";
import SQLiteManager from "./SQLiteManage";


class Quiz extends SQLiteManager {

   
    getAllField(success,error) {
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
        })
        
    }


}


export default new Quiz()