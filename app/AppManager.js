import UserModel from "./models/userModel";



class AppManager {
    static shared = new AppManager();

    user: UserModel = null
    access_token = ''


}

export default AppManager