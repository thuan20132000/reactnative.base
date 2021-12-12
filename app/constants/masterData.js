import CommentModel from "../models/CommentModel";
import TopicModel from "../models/topicModel";


export default {
    communityData: {
        avatarUrl: "https://avatarfiles.alphacoders.com/105/thumb-105223.jpg",
        pageReaderUrl: "https://240722-739412-raikfcquaxqncofqfm.stackpathdns.com/wp-content/uploads/2020/11/pakistan-english-newspapers-1-dawn.jpg",
        descriptions: "React Native combines the best parts of native development with React, a best-in-class JavaScript library for building user interfaces."
    },
    comments: [
        new CommentModel({
            body: "hello",
            id: 1,
            post: {
                id: 1
            },
            created_at: new Date(),
            status: "1",
            updated_at: new Date(),
            user: {
                id: 1
            }
        }),
        new CommentModel({
            body: "hello",
            id: 2,
            post: {
                id: 1
            },
            created_at: new Date(),
            status: "1",
            updated_at: new Date(),
            user: {
                id: 1
            }
        }),
        new CommentModel({
            body: "hello",
            id: 3,
            post: {
                id: 1
            },
            created_at: new Date(),
            status: "1",
            updated_at: new Date(),
            user: {
                id: 1
            }
        }),
        new CommentModel({
            body: "hello",
            id: 4,
            post: {
                id: 1
            },
            created_at: new Date(),
            status: "1",
            updated_at: new Date(),
            user: {
                id: 1
            }
        }),
        new CommentModel({
            body: "hello",
            id: 5,
            post: {
                id: 1
            },
            created_at: new Date(),
            status: "1",
            updated_at: new Date(),
            user: {
                id: 1
            }
        })
    ],
    communityTopics: [
        new TopicModel({
            id: 1,
            name: "Speaking",

        }),
        new TopicModel({
            id: 2,
            name: "Reading",

        }),
        new TopicModel({
            id: 3,
            name: "Conversation",

        }),
        new TopicModel({
            id: 4,
            name: "Translation",

        }),
        new TopicModel({
            id: 5,
            name: "Grammar",

        })
    ]

}