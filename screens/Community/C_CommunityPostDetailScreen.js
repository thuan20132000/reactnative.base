import React, { useState } from 'react'
import { Dimensions, Keyboard, StyleSheet, Text, View, KeyboardAvoidingView, Platform, FlatList } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { IconButton } from 'react-native-paper';
import AudioItem from '../../components/Item/AudioItem';
import CommonIcons from '../../utils/CommonIcons';
import CommonImages from '../../utils/CommonImages';
import Highlighter from 'react-native-highlight-words';
import readingpost from '../../data/readingpost_data.json';
import BottomRecordingNavigation from './components/BottomRecordingNavigation';
import AudioPlay from '../../components/Card/AudioPlay';
import BottomSheetComment from '../../components/BottomSheet/BottomSheetComment';
import HeaderBack from '../../components/Header/HeaderBack';
import CommentInput from '../../components/Comments/CommentInput';
import CommentItem from '../../components/Comments/CommentItem';
import { Header } from '@react-navigation/stack';

const C_CommunityPostDetailScreen = (props) => {

    // const [readingPost, setReadingPost] = useState(readingpost);
    const _refBottomSheet = React.useRef();
    const [readStyle, setReadStyle] = useState({
        fontSize: 24,
        speed: 70
    });
    const [commentList, setCommentList] = useState([]);

    const [highlightVocabulary, setHighlightVocabulary] = React.useState([]);

    React.useEffect(() => {
        props.navigation.dangerouslyGetParent().setOptions({
            tabBarVisible: false,
        });

        setCommentList(Array(10).fill({
            id: Math.floor(Math.random() * 100),
            content: `comment: ${Math.floor(Math.random() * 100)}`
        }));


        return () => {
            props.navigation.dangerouslyGetParent().setOptions({
                tabBarVisible: true,

            });
        }
    }, []);




    const _onRecordPractisePress = async () => {
        props.navigation.navigate('CommunityRecordPractise');
    }

    const _onOpenComments = async () => {
        _refBottomSheet.current.open();
    }

    const _onSendComment = async (text) => {
        console.warn('send: ', text);
        setCommentList(prev => {
            return [...prev, {
                id: Math.floor(Math.random * 100),
                content: `Comment: ${text}`
            }]
        });
        Keyboard.dismiss();
    }

    return (
        <>
            <View
                style={{
                    display: 'flex',
                    flex: 1
                }}
            >

                {/* <Image
                    style={{ height: deviceHeight / 2, width: deviceWidth }}
                    source={{ uri: "https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" }}
                    resizeMode={'stretch'}
                /> */}
                <View
                    style={{
                        height: '90%'
                    }}
                >
                    <ScrollView
                        style={{
                            backgroundColor: 'white',
                            paddingHorizontal: 12
                        }}
                    >
                        <Text
                            style={{
                                fontSize: readStyle.fontSize,
                                lineHeight: 52,
                                textAlign: 'justify',
                            }}
                            // suppressHighlighting={true}
                            // selectable={true}
                            allowFontScaling={true}

                        >
                            {
                                (readingpost?.content && readingpost.content || '') &&
                                <Highlighter
                                    highlightStyle={{ color: 'red', fontWeight: '700' }}
                                    searchWords={highlightVocabulary}
                                    textToHighlight={readingpost?.content}
                                />

                            }

                        </Text>

                    </ScrollView>
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                    >

                        <AudioPlay
                        // onPlay={_onStartPlay}
                        // onPause={_onPausePlay}
                        // isPlaying={isPlaying}
                        // currentProgress={currentProgress}
                        // durationTime={duration}
                        />

                    </View>
                </View>


                <View
                    style={[
                        styles.row,
                        {
                            justifyContent: 'space-between',
                            paddingHorizontal: 22
                        }
                    ]}
                >
                    <View
                        style={[
                            styles.row,
                            {
                                alignItems: 'center'
                            }
                        ]}
                    >

                        <View
                            style={[
                                styles.row,
                                {
                                    alignItems: 'center'
                                }
                            ]}
                        >
                            <IconButton
                                icon={CommonIcons.heartOutline}
                                color={'coral'}
                                size={24}
                                style={{ marginHorizontal: 6 }}
                                onPress={() => console.warn('ds')}

                            />
                            <Text style={{ fontWeight: '700' }}>12</Text>
                        </View>

                        <View
                            style={[
                                styles.row,
                                {
                                    alignItems: 'center'
                                }
                            ]}
                        >
                            <IconButton
                                icon={CommonIcons.commentProcessingOutline}
                                color={'coral'}
                                size={24}
                                style={{ marginHorizontal: 6 }}
                                onPress={_onOpenComments}

                            />
                            <Text style={{ fontWeight: '700' }}>7</Text>
                        </View>
                    </View>
                    <View
                        style={[
                            styles.row,
                            {
                                alignItems: 'center'
                            }
                        ]}
                    >
                        <IconButton
                            icon={CommonIcons.microphonePlus}
                            color={'coral'}
                            size={24}
                            style={{ marginHorizontal: 6 }}
                            onPress={_onRecordPractisePress}

                        />
                        <Text style={{ fontWeight: '700' }}>Tập luyện</Text>
                    </View>
                </View>

                {/* Record List */}

                {/* <ScrollView
                    style={[
                        styles.column
                    ]}
                >
                    <AudioItem />
                    <AudioItem />
                    <AudioItem />
                    <AudioItem />
                    <AudioItem />
                    <AudioItem />


                </ScrollView> */}


            </View>

            <BottomSheetComment
                refRBSheet={_refBottomSheet}
                height={deviceHeight}
            >
                <HeaderBack
                    backTitle={'Trở về'}
                    onBackPress={() => _refBottomSheet.current.close()}
                />
                <KeyboardAvoidingView
                    style={{
                        flex: 1,
                    }}
                    behavior={'padding'}
                    keyboardVerticalOffset={'0'}


                >
                    {/* <ScrollView

                    >
                        {
                            (commentList && commentList.length > 0) &&
                            commentList.map((e) =>
                                <CommentItem
                                    commentText={e.content}
                                />

                            )
                        }

                    </ScrollView> */}
                    <FlatList
                        data={commentList}
                        renderItem={({ item }) =>
                            <CommentItem
                                commentText={item.content}
                            />
                        }
                        keyExtractor={(item,idnex) => idnex.toString()}
                    />

                    <CommentInput
                        onSendPress={_onSendComment}
                    />

                </KeyboardAvoidingView>



            </BottomSheetComment>
        </>
    )
}
const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;
export default C_CommunityPostDetailScreen


const styles = StyleSheet.create({
    row: {
        display: 'flex',
        flexDirection: 'row',

    },
    column: {
        display: 'flex',
        flexDirection: 'column'
    }
})
