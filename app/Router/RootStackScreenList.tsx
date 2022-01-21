import CommunityPostModel from "../models/CommunityPostModel";

export type RootStackParamList = {
    RecordingScreen: {
        post_id: number
    },
    TabBar: {},
    ConversationPractice: {},
    Signin: {}
    LearnerHome: {},
    LearnerProfile: {},
    PrivacyPolicy: {},
    Notification: {},
    ConversationComment: {},
    Webview: {},
    UpdateInfo: {},
    CommunityPostDetailScreen: {
        post_id: number,

    }
    CommunityPostCommentScreen: {
        post: CommunityPostModel
    },
    MyPracticePostScreen: {

    },
    CommunityAudioCommentScreen: {

    },
    RecordingCompleteScreen: {
        post: any
    }
}