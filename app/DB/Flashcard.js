import { SQLiteFactory } from "react-native-sqlite-storage/lib/sqlite.core";
import SQLiteManager from "./SQLiteManage";



class FlashCard extends SQLiteManager {

    constructor() {
        this.openDB()
    }


    getAllTopic(success, err) {

        try {
            this.db.transaction((tx) => {
                tx.executeSql("SELECT * FROM quiz_field", [], (tx, results) => {

                    let temp = [];
                    if (results.rows.length > 0) {
                        for (let i = 0; i < results.rows.length; ++i) {
                            temp.push(results.rows.item(i));
                        }
                    }
                    this.db.close()
                    success(temp)

                })
            })

        } catch (error) {
            this.db.close()
            err(error);
        }
    }
}