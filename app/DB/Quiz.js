import { Platform } from "react-native";
import SQLite from "react-native-sqlite-storage";
import FieldModel from "../models/fieldModel";
import SQLiteManager from "./SQLiteManage";


class Quiz extends SQLiteManager{
   
    constructor() {
       this.table = 'quiz'
    }

  
}


export default Quiz