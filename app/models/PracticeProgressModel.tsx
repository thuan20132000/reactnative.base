import { differenceInMinutes, differenceInSeconds, isToday, sub } from "date-fns"
import PracticeProgress from "../DB/PracticeProgress"
import { getStorageData, setStorageData } from "../StorageManager"


class PracticeProgressModel {

    public id: Number
    readonly datetime: Date = new Date()
    readonly target_minutes: Number = 15
    public practice_minutes: Number = 0
    private start_time: Date
    public date: Date


    constructor() {

    }



    public setDateProgress(minutes: Number) {
        this.practice_minutes = minutes
    }

    public startPractice() {
        this.start_time = new Date()
    }

    public endPractice() {
        let during = differenceInMinutes(new Date(), this.start_time)
        this.practice_minutes = Number(this.practice_minutes) + Number(during)
        // this.saveProgress()
        this.updateOrCreateProgress().then(res => {
          
        })
    }

    private async updateOrCreateProgress() {
        try {
            let res: any
            if (this.id) {
                res = await PracticeProgress.updateTodayProgress(this.id, this.practice_minutes)

            } else {
                let datetime_string = new Date().getTime().toString()
                res = await PracticeProgress.addPracticeDates(datetime_string, this.target_minutes, this.practice_minutes)

            }
            return true
        } catch (error) {
            console.warn('error update progress: ', error)
            return false
        }
    }

    public async getCurrentPracticeDates() {
        let current_date = new Date()
        let current_date_practice = await PracticeProgress.getCurrentDatePractice()

        return current_date_practice
    }

    public async checkPracticeProgressTime() {

        try {
            let res = await getStorageData('practice_progress')
            let result = isToday(new Date(res?.datetime))
            console.warn(result)
        } catch (error) {
        }

    }

    public saveProgress() {
        setStorageData('practice_progress', this.toDictionary())
            .then((res) => console.log('save progress'))
            .catch(err => console.log('error at save progress'))
    }


    public getPracticeProgressPercent(practice_minutes: Number) {
        return (Number(practice_minutes) / 0.15)
    }

    public savePracticeProgressDate() {
        setStorageData('practice_progress_date', this.toDictionary())
            .then((res) => console.log('save progress'))
            .catch(err => console.log('error at save progress'))
    }



    public async addProgress() {

        let datetime_string = new Date().getTime().toString()
        let res = await PracticeProgress.addPracticeDates(datetime_string, this.target_minutes, this.practice_minutes)
        return res
    }


    public async updateTodayProgress(progress_id: any, practice_minutes: any) {
        try {

            let res = await PracticeProgress.updateTodayProgress(progress_id, practice_minutes)
            return res
        } catch (error) {
            console.warn('error update progress: ', error)
        }
    }

    toDictionary() {
        return {
            datetime: this.datetime,
            target_minutes: this.target_minutes,
            practice_minutes: this.practice_minutes,
            date: this.date,
            id: this.id
        }
    }


}

export default PracticeProgressModel