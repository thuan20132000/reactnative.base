import React, { useState } from 'react'
import { Checkbox, ProgressBar, RadioButton, Modal, Provider, Portal, Badge } from 'react-native-paper';
import { StyleSheet, Text, View, FlatList, Switch, Image ,TouchableOpacity} from 'react-native';
import GrammarExcerciseModel from '../../app/models/grammarExcerciseModel';
import GrammarModel from '../../app/models/grammarModel';
import { BOXSHADOW, COLORS, FONTS } from '../../app/constants/themes';
import GrammarAPI from '../../app/API/GrammarAPI';
import { setCompleteGrammar, setPractisedGrammarResult } from '../../app/StorageManager';
import QuizCard from './components/QuizCard';

import { BannerAd, BannerAdSize, TestIds } from '@react-native-firebase/admob';

import Sound from 'react-native-sound';
import { config } from '../../app/constants';

const adUnitId = __DEV__ ? TestIds.BANNER : config.adbmod_android_app_id;



const GrammarExcerciseScreen = (props) => {

    const { item } = props.route?.params;

    const [currentQuiz, setCurrentQuiz] = useState({ index: 0, data: '' });
    const [quizList, setQuizList] = React.useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isNext, setIsNext] = useState(true);
    const [isPrevious, setIsPrevious] = useState(false);
    const [isShowExplain, setIsShowExplain] = useState({
        state: false,
        data: ''
    });
    const [isShowReview, setIsShowReview] = useState(false);
    const [excerciseStatictis, setExerciseStatictis] = useState({
        incorrect_num: 0,
        correct_num: 0,
    })


    const [excerciseList, setExcerciseList] = useState([
        {
            "id": 3,
            "question": "Three weeks after Ms. Kanes was hired for the job, _____ had to move to Singapore.",
            "option_a": "she",
            "option_b": "hers",
            "option_c": "herself",
            "option_d": "her own",
            "answer": "herself",
            "correct_answer": "herself",
            "answer_reference": "<p>Three weeks after Ms. Kanes was hired for the job, _____ had to move to Singapore.</p>",
            "excercise_type": "quiz",
            "status": "published",
            "created_at": "2021-06-27T10:42:14.880942Z",
            "updated_at": "2021-06-27T10:42:14.880969Z",
            "grammar": {
                "id": 1,
                "name": "Thi hien tai do",
                "slug": "thi-hien-tai-don",
                "image": "https://practiceenglish.s3.amazonaws.com/image/Screen_Shot_2021-06-13_at_01.15.21.png",
                "status": "published",
                "created_at": "2021-06-27T05:58:26.643273Z",
                "updated_at": "2021-06-27T05:58:26.643331Z"
            }
        },
        {
            "id": 4,
            "question": "Classes at the community center are usually held either in the afternoon on weekdays _____ on the weekend",
            "option_a": "but",
            "option_b": "or",
            "option_c": "nor",
            "option_d": "and",
            "answer": "and",
            "correct_answer": "and",
            "answer_reference": "<p>Classes at the community center are usually held either in the afternoon on weekdays _____ on the weekend</p>",
            "excercise_type": "quiz",
            "status": "published",
            "created_at": "2021-06-27T10:43:16.782437Z",
            "updated_at": "2021-06-27T10:43:16.782461Z",
            "grammar": {
                "id": 1,
                "name": "Thi hien tai do",
                "slug": "thi-hien-tai-don",
                "image": "https://practiceenglish.s3.amazonaws.com/image/Screen_Shot_2021-06-13_at_01.15.21.png",
                "status": "published",
                "created_at": "2021-06-27T05:58:26.643273Z",
                "updated_at": "2021-06-27T05:58:26.643331Z"
            }
        },
        {
            "id": 5,
            "question": "The school construction project is proceeding _____ now that the school year is over.",
            "option_a": "still",
            "option_b": "quickly",
            "option_c": "highly",
            "option_d": "rarely",
            "answer": "rarely",
            "correct_answer": "quickly",
            "answer_reference": "<p>The school construction project is proceeding _____ now that the school year is over</p>",
            "excercise_type": "quiz",
            "status": "published",
            "created_at": "2021-06-27T10:44:01.122499Z",
            "updated_at": "2021-06-27T10:44:01.122529Z",
            "grammar": {
                "id": 1,
                "name": "Thi hien tai do",
                "slug": "thi-hien-tai-don",
                "image": "https://practiceenglish.s3.amazonaws.com/image/Screen_Shot_2021-06-13_at_01.15.21.png",
                "status": "published",
                "created_at": "2021-06-27T05:58:26.643273Z",
                "updated_at": "2021-06-27T05:58:26.643331Z"
            }
        }

    ])

    const [practisedExcercise, setPractisedExcercise] = useState([]);

    const [excercise, setExercise] = useState()
    const hideModal = () => setIsShowExplain({ ...isShowExplain, state: false });
    const hideModalReview = () => setIsShowReview(false);

    const _onSelectAnswer = (value, item_quiz, index) => {

        let quiz = new GrammarExcerciseModel(item_quiz);

        let answer = '';
        switch (value) {
            case "option_a":
                answer = quiz.option_a;
                break;
            case "option_b":
                answer = quiz.option_b;
                break;
            case "option_c":
                answer = quiz.option_c;
                break;
            case "option_d":
                answer = quiz.option_d;
                break;
            default:
                break;
        }


        let correct_num = excerciseStatictis.correct_num;
        let incorrect_num = excerciseStatictis.incorrect_num;
        if (answer.toLocaleLowerCase().trim() === quiz.correct_answser.toLocaleLowerCase().trim()) {
            setTimeout(() => {
                var sound = new Sound('button_correct.mp3', Sound.MAIN_BUNDLE, (error) => {
                    /* ... */
                    if (error) {
                        console.log('error: ', error);
                        sound.release()

                    }
                });
                setTimeout(() => {
                    sound.play((success) => {
                        /* ... */
                        sound.release();

                    });
                }, 100);
            }, 100);
            correct_num = correct_num + 1
            setExerciseStatictis({
                ...excerciseStatictis,
                correct_num: correct_num
            })
        } else {
            setTimeout(() => {
                var sound = new Sound('button_incorrect.mp3', Sound.MAIN_BUNDLE, (error) => {
                    /* ... */
                    if (error) {
                        console.log('error: ', error);
                        sound.release()

                    }
                });
                setTimeout(() => {
                    sound.play((success) => {
                        /* ... */
                        sound.release();

                    });
                }, 100);
            }, 100);
            incorrect_num = incorrect_num + 1;
            setExerciseStatictis({
                ...excerciseStatictis,
                incorrect_num: incorrect_num
            })
        }

        let tempPractisedList = practisedExcercise;
        tempPractisedList[index].selected = value;
        tempPractisedList[index].answered = answer


        if (excerciseList[index + 1] != undefined) {
            tempPractisedList = [...tempPractisedList, excerciseList[index + 1]];
        } else {
            tempPractisedList = [...tempPractisedList];

        }
        // console.log('sa: ', tempPractisedList.length);
        setPractisedExcercise(tempPractisedList);

        if (excerciseList.length == practisedExcercise.length) {
            setTimeout(() => {
                setIsShowReview(true);
                // let result = excerciseStatictis?.correct_num || 0;

                let practice_percentage = ((correct_num / excerciseList.length) * 100).toFixed(1);
                if (practice_percentage > 60) {
                    setCompleteGrammar(item?.id).then((res) => console.warn('complete: ', res))
                }
                console.warn('ss: ', practice_percentage);

                setPractisedGrammarResult(item?.id, practice_percentage).then((res) => console.warn('save: ', res))
            }, 1200);
        }
    }

    const _onExcerciseStartPress = () => {
        // return;
        if (item != null && item != undefined && excerciseList[0]) {
            setPractisedExcercise([excerciseList[0]]);
        }
    }

    const _onExplainPress = (data) => {
        setIsShowExplain({
            state: true,
            data: data
        })
    }

    const _onRefreshExcercise = () => {
        setPractisedExcercise([]);
        setExerciseStatictis({
            correct_num: 0,
            incorrect_num: 0
        })
    }

    const _onBackPress = () => {
        props.navigation.goBack();
    }

    const _onReviewPress = () => {

    }

    function renderExcerciseStart() {
        return (
            <View
                style={{
                    backgroundColor: COLORS.white,
                    alignSelf: 'center',
                    position: 'absolute',
                    alignContent: 'center',
                    justifyContent: 'center',
                    height: 200,
                    width: 200,
                    top: '30%',
                    padding: 12
                }}
            >

                <TouchableOpacity
                    onPress={_onExcerciseStartPress}
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Text style={FONTS.body4, { textAlign: 'center' }}>Mục tiêu: Điểm số lớn hơn 60% </Text>

                    <Text style={[FONTS.h2, { marginTop: 12, color: COLORS.primary }]}>Bắt Đầu</Text>
                </TouchableOpacity>
            </View>
        )
    }


    function renderModalExplainModal(visible = false, onDismiss, data) {
        const containerStyle = { backgroundColor: 'white', padding: 20, minHeight: 280 };

        return (
            <Portal>
                <Modal visible={visible} onDismiss={onDismiss} style={{ margin: 12 }} contentContainerStyle={containerStyle}>
                    <Text>{data}</Text>
                </Modal>
            </Portal>
        )
    }

    function renderModalStatictis(visible = false, onDismiss, data, onReview, onBack) {
        const containerStyle = { backgroundColor: 'white', padding: 20, minHeight: 280 };

        return (
            <Portal>
                <Modal visible={visible} dismissable={false} onDismiss={onDismiss} style={{ margin: 12 }} contentContainerStyle={containerStyle}>
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center'
                        }}
                    >

                        <View style={{
                            display: 'flex',
                            flexDirection: 'column',
                            marginVertical: 6,
                            borderBottomWidth: 1,
                            borderBottomColor: 'green',
                            backgroundColor: 'white',
                            width: 100,
                            height: 100,
                            borderRadius: 50,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Text>{data?.correct_num}</Text>
                            <Text>Đúng</Text>

                        </View>
                        <View style={{
                            display: 'flex',
                            flexDirection: 'column',
                            marginVertical: 6,
                            borderBottomWidth: 1,
                            borderBottomColor: 'red',
                            backgroundColor: 'white',
                            width: 100,
                            height: 100,
                            borderRadius: 50,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Text>{data?.incorrect_num}</Text>
                            <Text>Sai</Text>

                        </View>
                    </View>
                    <View
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'row',
                        }}
                    >
                        <View style={{
                            display: 'flex',
                            flexDirection: 'column',
                            marginVertical: 6,
                            borderBottomWidth: 1,
                            borderBottomColor: 'red',
                            width: 100,
                            height: 100,
                            borderRadius: 50,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderColor: 'coral',
                            borderWidth: 2
                        }}>
                            <Text style={{ fontSize: 26 }}>{((excerciseStatictis?.correct_num / excerciseList.length) * 100).toFixed(1)}%</Text>
                            <Text style={{ fontWeight: '700' }}>Điểm số</Text>
                        </View>
                    </View>
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: "row",
                            justifyContent: 'center'
                        }}
                    >
                        <Image


                            source={
                                ((excerciseStatictis?.correct_num / excerciseList.length) * 100).toFixed(1) >= 60 ?
                                    require('../../app/assets/images/ic_passed.png')
                                    :
                                    require('../../app/assets/images/ic_failed.png')

                            }
                            style={{
                                width: 220,
                                height: 120,
                            }}
                        />
                    </View>
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: "row",
                            justifyContent: 'space-around'
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                backgroundColor: 'coral',
                                padding: 8,
                                borderRadius: 6,
                                width: 120,
                                alignItems: 'center'
                            }}
                            onPress={onBack}
                        >
                            <Text style={{
                                color: 'white',
                                fontWeight: '700'
                            }}>Thoát</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                backgroundColor: 'coral',
                                padding: 8,
                                borderRadius: 6,
                                width: 120,
                                alignItems: 'center'
                            }}
                            onPress={onReview}
                        >
                            <Text style={{
                                color: 'white',
                                fontWeight: '700'
                            }}>Xem lại</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </Portal>
        )
    }


    React.useLayoutEffect(() => {
        props.navigation.setOptions({
            title: item?.name
        })
        props.navigation.dangerouslyGetParent().setOptions({
            tabBarVisible: false
        })

        return () => {
            props.navigation.dangerouslyGetParent().setOptions({
                tabBarVisible: true
            })
        }
    }, []);


    React.useEffect(() => {
        setPractisedExcercise(excerciseList)
        // GrammarAPI.getGrammarExcercise(item?.id)
        //     .then((res) => {
        //         if (res.status_code === 200) {
        //             setExcerciseList(res?.data)
        //         }
        //     })
        //     .catch((err) => {
        //         console.warn('err: ', err)
        //     })
    }, []);

    const _refFlatList = React.useRef();

    return (
        <Provider>
            {renderModalExplainModal(isShowExplain.state, hideModal, isShowExplain.data)}
            {renderModalStatictis(isShowReview, hideModalReview, excerciseStatictis, hideModalReview, _onBackPress)}
            <View
                style={{
                    display: 'flex',
                    flex: 1
                }}
            >
                <View
                    style={{
                        display: 'flex',
                        alignSelf: 'center',
                        paddingVertical: 6
                    }}
                >
                    {
                        adUnitId &&
                        <BannerAd
                            unitId={adUnitId}
                            size={BannerAdSize.BANNER}
                            requestOptions={{
                                requestNonPersonalizedAdsOnly: true,
                                keywords: ['education', 'ielts', 'shopping', 'books']
                            }}

                        />

                    }
                </View>
                {
                    practisedExcercise.length <= 0 &&
                    renderExcerciseStart()
                }

                {
                    practisedExcercise.length > 0 &&

                    <>
                        <FlatList
                            data={practisedExcercise}
                            renderItem={({ item, index }) =>
                                <QuizCard
                                    item={item}
                                    index={index}
                                    onAnswerPress={_onSelectAnswer}
                                    onExplainPress={() => _onExplainPress(item?.answer_reference)}
                                />
                            }
                            keyExtractor={(item) => item.id}

                            ref={_refFlatList}
                            onContentSizeChange={() => _refFlatList.current.scrollToEnd({ animated: true })}
                            onLayout={() => _refFlatList.current.scrollToEnd({ animated: true })}

                        />
                        <View
                            style={{
                                height: 80,
                                backgroundColor: COLORS.white,
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >

                            {/* <Text>{practisedExcercise?.length}/{excerciseList?.length}</Text> */}
                            <Badge size={42} style={{ backgroundColor: 'green', marginHorizontal: 6, color: 'white' }}>{excerciseStatictis?.correct_num}</Badge>
                            <Badge size={42} style={{ backgroundColor: 'coral', marginHorizontal: 6, color: 'white' }}>{excerciseStatictis?.incorrect_num}</Badge>

                        </View>
                    </>

                }
            </View>
        </Provider>


    )
}

export default GrammarExcerciseScreen

const styles = StyleSheet.create({})
