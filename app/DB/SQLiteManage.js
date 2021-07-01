import { Platform } from "react-native";
import SQLite from "react-native-sqlite-storage";
import FieldModel from "../models/fieldModel";


SQLite.DEBUG(true);
SQLite.enablePromise(false);
const database_name = 'chinook.db';
const database_version = '3.3';
const database_displayname = 'Bluezone database';
const database_size = 20 * 1024 * 1024;


class SQLiteManager {
    constructor() {
        this.db = null
        this.type = "SingletonDefaultExportInstance"

    }

    async openDB() {
        if (this.db != null) {
            return this.db
        }
        if (Platform.OS === 'android') {
            this.db = SQLite.openDatabase({
                name: database_name,
                location: '~/www/db.sqlite3',
            }).then((res) => {
                console.log('res android: ', res)
            })
                .catch((err) => {
                    console.log('err: ', err)
                })
        } else {
            this.db = SQLite.openDatabase({
                name: database_name,
                createFromLocation: 1
            })
        }
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

    async getAllFields() {


        console.log('gert')
        this.db.transaction((tx) => {
            tx.executeSql("SELECT * FROM albums", [], (tx, results) => {

                console.log('data: ', results)

            })
        })


    }

    async getProducts(success) {


        console.log('get products')
        this.db.transaction((tx) => {
            tx.executeSql("SELECT * FROM albums", [], (tx, results) => {

                console.log('data: ', results);
                let temp = [];
                if (results.rows.length > 0) {
                    for (let i = 0; i < results.rows.length; ++i) {
                        temp.push(results.rows.item(i));
                    }
                }
                console.log('get')
                success(temp)
                this.db.close()

            })
        })
    }

    async insertProduct(data) {
        this.db.transaction(function (tx) {
            tx.executeSql("INSERT INTO Product(prodId, prodName, prodDesc, prodImage, prodPrice) VALUES (?,?,?,?,?)", [
                1,
                "tomato",
                "sdasa ",
                "dasd s",
                "asfasf"
            ])
        })
    }


    async createTable() {
        if (this.db != null) {
            console.warn('db: ', this.db);
            this.db.transaction((tx) => {
                tx.executeSql('CREATE TABLE IF NOT EXISTS Product (prodId, prodName, prodDesc, prodImage, prodPrice)');
            })
        } else {
            console.log('db: ', this.db)
            // this.openDB(); 
            // this.db.executeSql('CREATE TABLE IF NOT EXISTS Product (prodId, prodName, prodDesc, prodImage, prodPrice)');
            // this.db.executeSql('CREATE TABLE IF NOT EXISTS Product (prodId, prodName, prodDesc, prodImage, prodPrice)')

        }
    }


}

export default SQLiteManager