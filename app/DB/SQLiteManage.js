import { Platform } from "react-native";
import SQLite from "react-native-sqlite-storage";
import FieldModel from "../models/fieldModel";


SQLite.DEBUG(true)
SQLite.enablePromise(true);

const database_name = 'db.sqlite3';
const database_version = '1.0';
const database_displayname = 'test database';
const database_size = 200000;



class SQLiteManager {
    constructor() {
        this.db = null
        this.type = "SingletonDefaultExportInstance"

    }

    openDB() {
        if (this.db != null) {
            return this.db
        }

        if (Platform.OS === 'android') {
            this.db = SQLite.openDatabase({
                name: database_name,
                location: '~/www/db.sqlite3',
            }).then((res) => {
                console.log('res: ',res)
            })
            .catch((err) => {
                console.log('err: ',err)
            })
        } else {
            this.db = SQLite.openDatabase({
                name: database_name,
                location: 'Documents',
                database_version,
                database_displayname,
                database_size
            })
        }
        return this.db
    }


    closeDB() {
        if (this.db) {
            this.db.close();
            this.db = null;
        }
    }


    insertField(data) {
        this.openDB();
        this.db.transaction(function (tx) {
            let field = new FieldModel(data)
            tx.executeSql("INSERT INTO quiz_field(name,slug,image,status,created_at,updated_at) VALUES (?,?,?,?,?,?)", [
                field.name,
                field.slug,
                field.image,
                field.status,
                field.created_at,
                field.updated_at
            ])
        }).then(() => {

        })
            .catch((error) => {
                throw error
            })
            .finally(() => this.closeDB());

    }

    getAllFields() {
        this.openDB();
        this.db.transaction((tx) => {
            tx.executeSql("SELECT * FROM quiz_field", [], (tx, results) => {

                console.log('data: ', results)

            })
        })
            .then(() => {

            })
            .catch((err) => {

            })
            .finally(() => this.closeDB())
    }


}

export default SQLiteManager