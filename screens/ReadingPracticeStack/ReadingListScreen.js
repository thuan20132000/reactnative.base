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
import ReadingPostDB from '../../app/DB/ReadingPost';
const ReadingListScreen = (props) => {

    const dispatch = useDispatch();


    const [readingPost, setReadingPost] = React.useState([]);
    const [readingTopic, setReadingTopic] = React.useState([]);
    const [nextPageLink, setNextPageLink] = React.useState();
    const [isLoadMore, setIsLoadMore] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const _refTopicScroll = React.useRef();

    React.useEffect(() => {

        ReadingPostDB.getAllTopic(success => {
            if (success && success.length > 0) {
                let readingTopic = [];
                success.forEach(ele => {
                    let topic = new ReadingTopicModel(ele)
                    readingTopic = [...readingTopic, topic]
                })
                console.log(readingTopic)
                setReadingTopic(readingTopic)
            }
        })

        ReadingPostDB.getReadingPost(success => {
            if (success && success.length > 0) {
                let readingList = [];
                success.forEach(element => {
                    let reading = new ReadingModel(element)
                    readingList = [...readingList, reading];
                });
                setReadingPost(readingList);
                if (success.next) {
                    setNextPageLink(success.next);
                }
            }
        })

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
        const unsubscribe = props.navigation.addListener('focus', () => {
            props.navigation.dangerouslyGetParent().setOptions({
                tabBarVisible: true
            });
        });
        return unsubscribe;

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

        ReadingPostDB.getReadingPost(success => {
            if (success && success.length > 0) {
                let readingList = [];
                success.forEach(element => {
                    let reading = new ReadingModel(element)
                    readingList = [...readingList, reading];
                });
                setReadingPost(readingList);
                if (success.next) {
                    setNextPageLink(success.next);
                }
                setIsRefreshing(false)
            }
        })


    }


    const _onGetTopicVocabularyPress = async (topic, index) => {

        _refTopicScroll.current.scrollToIndex({
            animated: true,
            index: index,
            viewPosition: 0.5
        })

        ReadingPostDB.getReadingPostByTopic(topic?.id, success => {
            if (success && success.length > 0) {
                let readingList = [];
                success.forEach(element => {
                    let reading = new ReadingModel(element)
                    readingList = [...readingList, reading];
                });
                setReadingPost(readingList);
                if (success.next) {
                    setNextPageLink(success.next);
                }
                setIsRefreshing(false)
            }
        })

    }


    return (
        <>
            <View>


                <FlatList
                    data={readingTopic}
                    renderItem={({ item, index }) => {
                        return (
                            <CardBox key={`topic-${item.id?.toString()}`}
                                label={item.name}
                                onItemPress={() => _onGetTopicVocabularyPress(item, index)}
                                labelStyle={{
                                    fontWeight: '700',
                                    color: 'black'
                                }}
                                image_path={item.image}

                            />

                        )
                    }
                    }
                    keyExtractor={item => `post-${item.id.toString()}`}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    ref={_refTopicScroll}
                />
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
                        renderItem={({ item }) => {
                            return (
                                <CardReading
                                    onPracticePress={() => _onNavigateToPractice(item)}
                                    onVocabularyPress={() => _onNavigateToReadingVocabulary(item)}
                                    title={item?.title}
                                    summary={item.summary}
                                    image_path={item.image}
                                />

                            )
                        }
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
