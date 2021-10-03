
import { addMinutes, closestIndexTo } from 'date-fns'
import { addDays } from 'date-fns/esm'
import PracticeVocabularyModel from '../models/PracticeVocabularyModel'
import VocabularyModel from '../models/vocabularyModel'

class VocabularyPracticeController {


    public readonly Vocabulary: PracticeVocabularyModel
    private VocabularyList: (PracticeVocabularyModel)[]


    constructor(vocabulary: PracticeVocabularyModel, vocabularyList: PracticeVocabularyModel[]) {
        this.Vocabulary = vocabulary
        this.VocabularyList = vocabularyList
    }



    public handleHardOption() {
        let now = new Date()
        let remind_time = addMinutes(now, 3)
        this.Vocabulary.remind_time = remind_time
        this.updateVocabularyRemindTime()



    }

    public handleAgainOption() {
        let now = new Date()
        let remind_time = addMinutes(now, 6)
        this.Vocabulary.remind_time = remind_time
        this.updateVocabularyRemindTime()
    }

    public handleIgnoreOption() {
        let now = new Date()
        let remind_time = addDays(now, 2)
        this.Vocabulary.remind_time = remind_time
        // if()
        this.VocabularyList = this.VocabularyList.filter(e => e != this.Vocabulary)

    }

    /**
     * getLeftVocabularyNumber
     */
    public getLearningVocabularyNumber(): Number {
        return this.VocabularyList.length
    }


    private updateVocabularyRemindTime() {
        let now = new Date()
        let updatedList = []
        updatedList = this.VocabularyList?.map(e => {
            if (e?.remind_time) {
                return e
            } else {
                return { ...e, remind_time: now }
            }
        })
        this.VocabularyList = updatedList
    }


    public getNextVocabulary(): VocabularyModel {
        if (this.getRemindVocabulary()) {
            return this.getRemindVocabulary()
        } else {
            return this.VocabularyList[0]
        }
    }

    /**
     * getRemindVocabulary
     */
    public getRemindVocabulary(): VocabularyModel {
        let dateToCompare = new Date()
        let datesArray = this.VocabularyList.map(e => e?.remind_time)
        let index = closestIndexTo(dateToCompare, datesArray)
        return this.VocabularyList[index]

    }



    public setVocabularyList(VocabularyList: PracticeVocabularyModel[]) {
        this.VocabularyList = VocabularyList
    }

    private updateVocabularyList() {
        this.VocabularyList?.map(e => {
            if (e.id === this.Vocabulary.id) {
                e.remind_time = this.Vocabulary.remind_time
                return this.VocabularyList
            }
            return this.VocabularyList
        })
    }

    /**
     * getVocabularyList
     */
    public getVocabularyList() {
        this.getRemindVocabulary()
        return this.VocabularyList
    }
    /**
     * answer
     */


}

export default VocabularyPracticeController