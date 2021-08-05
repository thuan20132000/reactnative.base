import { Platform } from "react-native";
import SQLite from "react-native-sqlite-storage";
import FieldModel from "../models/fieldModel";
import SQLiteManager from "./SQLiteManage";


class Field extends SQLiteManager {

   


    insertField(data, response) {
        let field = new FieldModel(data);
        this.openDB().then(() => {
            this.db.transaction(function (tx) {
                tx.ex
            })
            this.db.transaction("INSERT INTO field(name,slug,image,created_at,updated_at) VALUES (?,?,?,?,?)", [
                field.name,
                field.slug,
                field.image,
                field.created_at,
                field.updated_at
            ])
            response("success")
        })
    }

    getAllField(success) {
        this.openDB().then(() => {
            this.db.transaction((tx) => {
                tx.executeSql("SELECT * FROM field", [], (tx, results) => {

                    let temp = [];
                    if (results.rows.length > 0) {
                        for (let i = 0; i < results.rows.length; ++i) {
                            temp.push(results.rows.item(i));
                        }
                    }
                    success(temp)
                    this.db.close()

                })
            })
        })
    }





}


export default Field