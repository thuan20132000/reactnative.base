import PracticeProgressModel from "../models/PracticeProgressModel";
import SQLiteManager from "./SQLiteManage";




class PracticeProgress extends SQLiteManager {


    constructor() {
        super()
        // this.createTable().then(res => {
        //     console.log('create table : ')
        // })
        //     .catch(err => {
        //         console.log('error create tble')
        //     })
    }


    // Create Table
    async createTable() {
        let Table = await this.ExecuteQuery("CREATE TABLE IF NOT EXISTS practice_progress (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, datetime DATETIME, target_minutes INTEGER, practice_minutes INTEGER)", []);
        console.log('create table: ', Table);
        return Table
    }

    async getPracticeProgress() {
        try {
            let query_string = `SELECT * FROM practice_progress`
            let results = await this.ExecuteQuery(query_string, []);
            let temp = [];
            console.log('reee: ', results)
            if (results.rows.length > 0) {
                for (let i = 0; i < results.rows.length; i++) {
                    let current_row = results.rows.item(i);

                    temp.push(current_row);


                }
            }
            return temp
        } catch (error) {
            console.log('error: ', error)
        }

    }





    createPracticeProgressTable() {

        return new Promise((resolve, reject) => {
            this.openDB().then(() => {
                this.db.transaction((tx) => {
                    tx.executeSql("CREATE TABLE IF NOT EXISTS practice_progress (id INTEGER PRIMARY KEY NOT NULL, datetime DATETIME, target_minutes INTEGER, practice_minutes INTEGER)", [], (tx, results) => {
                        console.warn('create tbl: ', results)
                        resolve(results)
                    })
                })
            })
        })

    }


    async addPracticeDates(datetime, target_minutes, practice_minutes) {
        try {
            let date = new Date().toLocaleDateString()
            let query_string = `INSERT INTO practice_progress (datetime,date, target_minutes, practice_minutes) VALUES (?,?,?,?)`
            let singleInsert = await this.ExecuteQuery(query_string, [datetime, date, target_minutes, practice_minutes]);
            return singleInsert
        } catch (error) {
            console.log('error: ', error)
        }

    }

    async getCurrentDatePractice() {
        try {
            let current_date = new Date().toLocaleDateString()
            let query_string = `SELECT * FROM practice_progress where date=? LIMIT 1`
            let results = await this.ExecuteQuery(query_string, [current_date]);
            let data = results.rows.item(0)
            return data
        } catch (error) {
            console.log('error: ', error)
        }
    }

    async updateTodayProgress(progress_id, practice_minutes,) {
        try {
            let current_date = new Date().toLocaleDateString()
            let query_string = `UPDATE practice_progress SET practice_minutes = ? WHERE id = ?`
            let results = await this.ExecuteQuery(query_string, [practice_minutes, progress_id]);
            let data;
            if(results?.rows?.length > 0){
                data = results.rows.item(0)
            }else{
                data = {}
            }
            console.warn('daaa: ',results)
            return data
        } catch (error) {
            console.log('error: ', error)
        }
    }

    /**
  * Select Query Example
  */
    async SelectQuery() {
        try {
            let selectQuery = await this.ExecuteQuery("SELECT * FROM practice_progress", []);
            var rows = selectQuery.rows;
            for (let i = 0; i < rows.length; i++) {
                var item = rows.item(i);
                console.log(item);
            }
            return rows

        } catch (error) {
            console.warn('error: ', error)
            throw error
        }
    }

}


export default new PracticeProgress