import { Alert } from "react-native";
import { getUniqueId } from "react-native-device-info";
import UserModel from "./models/userModel";



class AppManager {
    static shared = new AppManager();
    deviceId = getUniqueId()

    user: UserModel = null
    access_token = ''

    handleErrorMessage = (error) => {
        console.log(error)
        let message = error?.response?.data?.message?.error ?? error?.response?.data?.message ?? "Somethings went wrong!"
        Alert.alert(message)
    }
    



}

export default AppManager