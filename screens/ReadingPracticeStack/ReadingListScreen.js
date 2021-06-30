import React from 'react'
import { ActivityIndicator, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useDispatch } from 'react-redux';
import { getReadingPostList, getReadingTopicsList } from '../../utils/api_v1';
import ButtonText from '../../components/Button/BottonText';
import CardReading from './components/CardReading';
import CardBox from './components/CardBox';
import ReadingAPI from '../../app/API/ReadingAPI';
import ReadingModel from '../../app/models/readingModel';
import ReadingTopicModel from '../../app/models/readingTopicModel';

const ReadingListScreen = (props) => {

    const dispatch = useDispatch();


    const [readingPost, setReadingPost] = React.useState([]);
    const [readingTopic, setReadingTopic] = React.useState([]);
    const [nextPageLink, setNextPageLink] = React.useState();
    const [isLoadMore, setIsLoadMore] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {

        ReadingAPI.getAllReadingPost()
            .then((res) => {
                console.log('sa  ', res)
                setIsLoading(true);
                if (res.status_code === 200 && res.data?.length > 0) {

                    let readingList = [];
                    res.data.forEach(element => {
                        let reading = new ReadingModel(element)
                        readingList = [...readingList, reading];
                    });
                    setReadingPost(readingList);
                    if (res.next) {
                        setNextPageLink(res.next);
                    }
                }
            })
            .catch((err) => {
                console.log('err: ', err)
            })
            .finally(() => setIsLoading(false))

        ReadingAPI.getReadingTopicList()
            .then((res) => {
                if (res.status_code === 200 && res.data?.length > 0) {
                    let topicList = [];
                    res.data.forEach(element => {
                        let topic = new ReadingTopicModel(element)
                        topicList = [...topicList, topic];
                    });
                    setReadingTopic(topicList);
                }
            })

        // getReadingTopicsList()
        //     .then((res) => {
        //         if (res.status && res.data.length > 0) {
        //             setReadingTopic(res.data)
        //         }
        //     })
        //     .catch((err) => {
        //         console.log('error: ', err);
        //     })
        //     .finally(() => {
        //         console.log('finally');
        //     })

    }, []);

    const _onNavigateToReadingVocabulary = (post) => {


        // dispatch(readingActions.setReadingVocabularyList(data, sample_data))

        props.navigation.navigate('ReadingVocabulary', {
            readingpost: post
        });

    }



    const _onNavigateToPractice = (post) => {
        props.navigation.navigate('ReadingPractice', {
            readingpost: post
        });
    }



    React.useLayoutEffect(() => {
        props.navigation.setOptions({
            title: "",
            headerShown: false
        })

    }, []);


    const _onLoadMoreItem = async () => {
        setIsLoadMore(true);
        if (!nextPageLink) {
            setIsLoadMore(false)
            return;
        }
        let fetchData = await fetch(`${nextPageLink}`);

        if (!fetchData.ok) {
            setIsLoadMore(false)
            return;
        }
        let fetchRes = await fetchData.json();



        if (fetchRes.data?.length > 0) {
            // console
            setReadingPost([...readingPost, ...fetchRes.data]);
        }

        if (fetchRes.next) {
            setNextPageLink(fetchRes.next);

        } else {
            setNextPageLink(null);
        }
        setIsLoadMore(false)


    }


    const [isRefreshing, setIsRefreshing] = React.useState(false);
    const _onRefreshItemList = async () => {
        setReadingPost([]);
        setIsRefreshing(true);
   
            ReadingAPI.getAllReadingPost()
            .then((res) => {
                if (res.status_code === 200 && res.data?.length > 0) {

                    let readingList = [];
                    res.data.forEach(element => {
                        let reading = new ReadingModel(element)
                        readingList = [...readingList, reading];
                    });
                    setReadingPost(readingList);
                    if (res.next) {
                        setNextPageLink(res.next);
                    }
                }
            })
            .catch((err) => {
                console.log('err: ', err)
            })
            .finally(() => setIsRefreshing(false))


    }


    const _onGetTopicVocabularyPress = async (topic) => {
      
        ReadingAPI.getAllReadingPost(topic.id)
            .then((res) => {
                setIsLoading(true);
                if (res.status_code === 200 && res.data?.length > 0) {

                    let readingList = [];
                    res.data.forEach(element => {
                        let reading = new ReadingModel(element)
                        readingList = [...readingList, reading];
                    });
                    setReadingPost(readingList);
                    if (res.next) {
                        setNextPageLink(res.next);
                    }
                }
            })
            .catch((err) => {
                console.log('err: ', err)
            })
            .finally(() => setIsLoading(false))
    }


    return (
        <>
            <View>

                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={{
                        marginVertical: 8
                    }}

                >
                    {
                        (readingTopic && readingTopic.length > 0) &&
                        readingTopic.map((topic, index) =>
                            <CardBox key={`topic-${topic.id?.toString()}`}
                                label={topic.name}
                                onItemPress={() => _onGetTopicVocabularyPress(topic)}
                                labelStyle={{
                                    fontWeight: '700',
                                    color: 'black'
                                }}
                                image_path={topic.image}

                            />
                        )
                    }
                </ScrollView>
            </View>



            {/* List */}

            {
                isLoading &&
                <View
                    style={{
                        display: 'flex',
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >

                    <ActivityIndicator
                        animating={true}
                        size={'large'}
                        color={'coral'}
                    />

                </View>
            }

            {
                !isLoading &&
                <View
                    style={{
                        backgroundColor: 'white',
                        paddingTop: 12,
                        borderTopRightRadius: 22,
                        borderTopLeftRadius: 22
                    }}
                >

                    <FlatList
                        data={readingPost}
                        renderItem={({ item }) =>
                            <CardReading
                                onPracticePress={() => _onNavigateToPractice(item)}
                                onVocabularyPress={() => _onNavigateToReadingVocabulary(item)}
                                title={item.title}
                                summary={item.summary}
                                image_path={item.image}
                            />
                        }
                        keyExtractor={item => `post-${item.id.toString()}`}

                        ListFooterComponent={


                            <View>
                                <ActivityIndicator
                                    size={'large'}
                                    color={'coral'}
                                    animating={isLoadMore}
                                />
                            </View>

                        }

                        onEndReachedThreshold={0.2}
                        onEndReached={_onLoadMoreItem}


                        onRefresh={_onRefreshItemList}

                        refreshing={isRefreshing}
                        style={{
                            marginBottom: 70
                        }}


                    />
                </View>

            }

        </>
    )
}

export default ReadingListScreen

const styles = StyleSheet.create({})
