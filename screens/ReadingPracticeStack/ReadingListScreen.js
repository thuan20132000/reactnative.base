import React from 'react'
import { ActivityIndicator, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import CardTopic from './components/CardTopic'
import * as readingActions from '../../store/actions/readingActions';
import { useDispatch } from 'react-redux';
import { getReadingPostList, getReadingTopicsList } from '../../utils/api_v1';
import { Button, Menu, Divider, Provider } from 'react-native-paper';
import ButtonText from '../../components/Button/BottonText';

const ReadingListScreen = (props) => {

    const dispatch = useDispatch();


    const [readingPost, setReadingPost] = React.useState([]);
    const [readingTopic, setReadingTopic] = React.useState([]);
    const [nextPageLink, setNextPageLink] = React.useState();
    const [isLoadMore, setIsLoadMore] = React.useState(false);

    React.useEffect(() => {

        getReadingPostList()
            .then((res) => {
                if (res.status && res.data.length > 0) {
                    setReadingPost(res.data);
                    if (res.next) {
                        setNextPageLink(res.next);
                    }
                }
            })
            .catch((err) => {
                console.log('error: ', err);
            })
            .finally(() => {
                console.log('finally');
            });

        getReadingTopicsList()
            .then((res) => {
                if (res.status && res.data.length > 0) {
                    setReadingTopic(res.data)
                    console.log('topicL ', res.data)
                }
            })
            .catch((err) => {
                console.log('error: ', err);
            })
            .finally(() => {
                console.log('finally');
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
            setReadingPost(prev => [...prev, ...fetchRes.data]);
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
        getReadingPostList()
            .then((res) => {
                console.warn(res);
                if (res.status && res.data.length > 0) {
                    setReadingPost(res.data);
                    console.warn(res.next);
                    if (res.next) {
                        setNextPageLink(res.next);
                    }
                }
            })
            .catch((err) => {
                console.log('error: ', err);
            })
            .finally(() => {
                console.log('finally');
            });


    }


    const _onGetTopicVocabularyPress = async (topic) => {
        getReadingPostList(topic.id)
            .then((res) => {
                if (res.status && res.data.length > 0) {
                    setReadingPost(res.data);
                    if (res.next) {
                        setNextPageLink(res.next);
                    }
                }
            })
            .catch((err) => {
            })
            .finally(() => {
                console.warn('finally')
            })
        
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
                            <ButtonText key={topic.id?.toString()}
                                label={topic.name}
                                onItemPress={() => _onGetTopicVocabularyPress(topic)}

                            />
                        )
                    }
                </ScrollView>
            </View>



            {/* List */}
            <FlatList
                data={readingPost}
                renderItem={({ item }) =>
                    <CardTopic
                        onPracticePress={() => _onNavigateToPractice(item)}
                        onVocabularyPress={() => _onNavigateToReadingVocabulary(item)}
                        title={item.title}
                        summary={item.summary}
                    />
                }
                keyExtractor={item => item.id.toString()}

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


            />
        </>
    )
}

export default ReadingListScreen

const styles = StyleSheet.create({})
