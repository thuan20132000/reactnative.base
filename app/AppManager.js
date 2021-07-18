import UserModel from "./models/userModel";



class AppManager {
    static shared = new AppManager();

    user: UserModel = null


}

export default AppManager