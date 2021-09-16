import firestore from '@react-native-firebase/firestore';
import DeskModel from './models/DeskModel';

import PracticeVocabularyModel from './models/PracticeVocabularyModel'
class FirebaseManager {


    /**
     * getDeskList
     */
    public static getDeskList(userId: String) {

        return new Promise(resolve => {
            firestore().collection('Users')
                .doc(userId.toString())
                .collection('DeskList')
                .orderBy('created_at', 'desc')
                .get()
                .then(querySnapshot => {
                    let x = []
                    querySnapshot.forEach(documentSnapshot => {
                        console.log(documentSnapshot.data())
                        let desk = new DeskModel(documentSnapshot.data())
                        desk.id = documentSnapshot.id
                      
                        x.push(desk)
                    });
                    resolve(x)
                })

        })
    }


    public static createDesk(name: String, userId: String) {
        return new Promise(resolve => {
            firestore()
                .collection('Users')
                .doc(userId.toString())
                .collection('DeskList')
                .doc()
                .set({
                    name: name,
                    created_at: firestore.FieldValue.serverTimestamp()
                })
                .then(() => {
                    console.log('User added!');
                    resolve(true)
                })
                .catch(() => resolve(false))

        })
    }

    public static addDeskVocabulary(vocabulary: PracticeVocabularyModel, deskId: String, userId: String) {
        return new Promise(resolve => {
            firestore()
                .collection('Users')
                .doc(userId.toString())
                .collection('DeskList')
                .doc(deskId.toString())
                .collection('Vocabulary')
                .doc()
                .set({
                    name: vocabulary?.name,
                    native_name: vocabulary?.native_name,
                    image_url: vocabulary?.image_url,
                    created_at: firestore.FieldValue.serverTimestamp()
                })
                .then(() => {
                    console.log('User added!');
                    resolve(true)
                })
                .catch((err) => resolve(false))

        })
    }


    public static updateDeskVocabulary(vocabulary: PracticeVocabularyModel, desk: DeskModel, userId: String) {
        console.log(vocabulary)
        return new Promise(resolve => {
            firestore()
                .collection('Users')
                .doc(userId.toString())
                .collection('DeskList')
                .doc(desk?.id.toString())
                .collection('Vocabulary')
                .doc(vocabulary?.id?.toString())
                .update({
                    name: vocabulary?.name,
                    native_name: vocabulary?.native_name,
                    image_url: vocabulary?.image_url,
                })
                .then(() => {
                    console.log('User added!');
                    resolve(true)
                })
                .catch((err) => {
                    console.log(err)
                    resolve(false)
                })

        })
    }

    public static getDeskVocabulary(userId: String, desk: DeskModel) {

        return new Promise(resolve => {
            firestore().collection('Users')
                .doc(userId.toString())
                .collection('DeskList')
                .doc(desk?.id?.toString())
                .collection('Vocabulary')
                .orderBy('created_at', 'desc')
                .get()
                .then(querySnapshot => {
                    let x = []
                    querySnapshot.forEach(documentSnapshot => {
                        let vocabulary = new PracticeVocabularyModel(documentSnapshot.data())
                        vocabulary.id = documentSnapshot.id
                        console.log(vocabulary)
                        x.push(vocabulary)
                    });
                    resolve(x)
                })

        })
    }


    public static removeDeskVocabulary(userId: String, desk: DeskModel, vocabulary: PracticeVocabularyModel) {

        return new Promise(resolve => {
            firestore().collection('Users')
                .doc(userId.toString())
                .collection('DeskList')
                .doc(desk?.id?.toString())
                .collection('Vocabulary')
                .doc(vocabulary.id?.toString())
                .delete()
                .then(querySnapshot => {

                    resolve(true)
                })
                .catch(() => {
                    resolve(false)
                })

        })
    }


    /**
     * static removeDesk
     */
    public static removeDesk(userId: String, desk: DeskModel) {
        return new Promise(resolve => {
            firestore().collection('Users')
                .doc(userId.toString())
                .collection('DeskList')
                .doc(desk?.id?.toString())
                .delete()
                .then(querySnapshot => {

                    resolve(true)
                })
                .catch(() => {
                    resolve(false)
                })

        })
    }


}


export default FirebaseManager