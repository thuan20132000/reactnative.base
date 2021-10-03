import { Platform } from "react-native"


class Admob {

    // Advertisiment
    // android
    private adbmod_android_app_id: String = "ca-app-pub-7783640686150605~6780496114"
    private adbmod_android_banner: String = 'ca-app-pub-7783640686150605/2939455462'
    private adbmod_android_fullpage: String = 'ca-app-pub-7783640686150605/2202116538'

    // ios
    private adbmod_ios_app_id: String = "ca-app-pub-7783640686150605~7080533923"
    private adbmod_ios_banner: String = 'ca-app-pub-7783640686150605/1636635552'
    private adbmod_ios_fullpage: String = 'ca-app-pub-7783640686150605/1921683340'


    adbmod_app_id: String
    adbmod_banner: String
    adbmod_fullpage: String


    constructor() {
        if (Platform.OS === 'android') {
            this.adbmod_app_id = this.adbmod_android_app_id
            this.adbmod_banner = this.adbmod_android_banner
            this.adbmod_fullpage = this.adbmod_android_fullpage
        } else {
            this.adbmod_app_id = this.adbmod_ios_app_id
            this.adbmod_banner = this.adbmod_ios_banner
            this.adbmod_fullpage = this.adbmod_ios_fullpage
        }
    }


}


export default new Admob()