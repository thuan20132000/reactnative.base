import firestore from '@react-native-firebase/firestore';


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
                        console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
                        x.push(documentSnapshot.data())
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

}


export default FirebaseManager