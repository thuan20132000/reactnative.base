import React, { useState } from 'react'
import { Checkbox, ProgressBar, RadioButton, Modal, Provider, Portal, Badge } from 'react-native-paper';
import { StyleSheet, Text, View, FlatList, Switch, Image } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import GrammarExcerciseModel from '../../app/models/grammarExcerciseModel';
import GrammarModel from '../../app/models/grammarModel';
import { BOXSHADOW, COLORS, FONTS } from '../../app/constants/themes';
import GrammarAPI from '../../app/API/GrammarAPI';


const QuizCard = ({ item, index, onAnswerPress, onExplainPress }) => {
    return (
        <View
            key={index.toString()}
            style={{
                margin: 8,
                padding: 8,
                backgroundColor: COLORS.white,
                ...BOXSHADOW.normal,

            }}
        >
            <View
                style={{ borderBottomWidth: 0.5, paddingBottom: 10, borderBottomColor: "gray" }}
            >
                <Text style={FONTS.body4, { color: 'gray' }}>Câu hỏi {index + 1}:</Text>
                <Text style={[styles.titleTxt, { marginTop: 30 }]}>{item?.question}</Text>
            </View>
            <View>
                <RadioButton.Group
                    onValueChange={value => onAnswerPress(value, item, index)}
                    value={item?.selected}

                >
                    <RadioButton.Item style={(item?.selected && item?.correct_answer === item.option_a) ? { backgroundColor: 'lightblue' } : { backgroundColor: 'white' }} labelStyle={[{ fontWeight: '700' }, (item?.selected && item?.correct_answer === item.option_a) ? { color: 'blue' } : { color: "black" }]} disabled={item?.selected ? true : false} label={item?.option_a} value="option_a" />
                    <RadioButton.Item style={(item?.selected && item?.correct_answer === item.option_b) ? { backgroundColor: 'lightblue' } : { backgroundColor: 'white' }} labelStyle={[{ fontWeight: '700' }, (item?.selected && item?.correct_answer === item.option_b) ? { color: 'blue' } : { color: "black" }]} disabled={item?.selected ? true : false} label={item?.option_b} value="option_b" />
                    <RadioButton.Item style={(item?.selected && item?.correct_answer === item.option_c) ? { backgroundColor: 'lightblue' } : { backgroundColor: 'white' }} labelStyle={[{ fontWeight: '700' }, (item?.selected && item?.correct_answer === item.option_c) ? { color: 'blue' } : { color: "black" }]} disabled={item?.selected ? true : false} label={item?.option_c} value="option_c" />
                    <RadioButton.Item style={(item?.selected && item?.correct_answer === item.option_d) ? { backgroundColor: 'lightblue' } : { backgroundColor: 'white' }} labelStyle={[{ fontWeight: '700' }, (item?.selected && item?.correct_answer === item.option_d) ? { color: 'blue' } : { color: "black" }]} disabled={item?.selected ? true : false} label={item?.option_d} value="option_d" />
                </RadioButton.Group>
            </View>
            {
                item?.selected &&
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginVertical: 4
                    }}
                >
                    <Text style={FONTS.body4, { color: 'lightblue' }}> Đáp án đúng: {item?.correct_answer} </Text>
                    <TouchableOpacity
                        onPress={() => onExplainPress(item)}
                        style={{
                            backgroundColor: COLORS.primary,
                            paddingHorizontal: 4,
                            borderRadius: 8
                        }}

                    >
                        <Text style={[FONTS.body4, { color: 'white', fontWeight: '700' }]}>Giải thích</Text>
                    </TouchableOpacity>
                </View>
            }

        </View>
    )
}



const GrammarExcerciseScreen = (props) => {

    const {item} = props.route?.params;

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

    const _onSelectAnswer = (value, item, index) => {

        let quiz = new GrammarExcerciseModel(item);

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


        if (answer.toLocaleLowerCase().trim() === quiz.correct_answser.toLocaleLowerCase().trim()) {
            setExerciseStatictis({
                ...excerciseStatictis,
                correct_num: excerciseStatictis.correct_num + 1
            })
        } else {
            setExerciseStatictis({
                ...excerciseStatictis,
                incorrect_num: excerciseStatictis.incorrect_num + 1
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
            }, 1200);
        }

        // return;

        // let additional;
        // let actual_answer = currentQuiz.data[data];
        // if (currentQuiz.data?.answer === data) {
        //   additional = { ...quizList[currentQuiz.index], selected_option: data.toString(), status: true, actual_answer: actual_answer };
        // } else {
        //   additional = { ...quizList[currentQuiz.index], selected_option: data.toString(), status: false, actual_answer: actual_answer };
        // }
        // let tempQuizList = quizList;
        // tempQuizList[currentQuiz.index] = additional;
        // setQuizList(tempQuizList);
        // setSelectedAnswer(data.toString());
    }

    const _onExcerciseStartPress = () => {
        setPractisedExcercise([excerciseList[0]]);
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
                    top: '30%'

                }}
            >
             
                <TouchableOpacity
                    onPress={_onExcerciseStartPress}
                    style={{
                        alignItems:'center',
                        justifyContent:'center'
                    }}
                >
                    <Text style={FONTS.body4,{textAlign:'center'}}>Mục tiêu: Điểm số lớn hơn 5 cho 20 cấu hỏi</Text>

                    <Text style={[FONTS.h2,{marginTop:12,color:COLORS.primary}]}>Bắt Đầu</Text>
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
                            <Text style={{ fontSize: 26 }}>{data?.correct_num ? (data?.correct_num * 0.5).toFixed(2) : 0}</Text>
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
                                data?.correct_num * 0.5 > 5 ?
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
                            onPress={onReview}
                        >
                            <Text style={{
                                color: 'white',
                                fontWeight: '700'
                            }}>Xem Lai</Text>
                        </TouchableOpacity>
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
                            }}>Ôn lại</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </Portal>
        )
    }


    React.useLayoutEffect(() => {
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
        GrammarAPI.getGrammarExcercise(item.id)
        .then((res) => {
            if(res.status_code === 200){
                setExcerciseList(res?.data)
            }
        })
        .catch((err) => {
            console.warn('err: ',err)
        })
    },[]);


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
                {
                    practisedExcercise.length <= 0 &&
                    renderExcerciseStart()
                }


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

                />
                <View
                    style={{
                        height: 80,
                        backgroundColor: COLORS.white,
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >

                    {/* <Text>{practisedExcercise?.length}/{excerciseList?.length}</Text> */}
                    <Badge size={42} style={{ backgroundColor: 'lightblue', marginHorizontal: 6, color: 'white' }}>{excerciseStatictis?.correct_num}</Badge>
                    <Badge size={42} style={{ backgroundColor: 'lightgray', marginHorizontal: 6, color: 'white' }}>{excerciseStatictis?.incorrect_num}</Badge>

                </View>
            </View>
        </Provider>


    )
}

export default GrammarExcerciseScreen

const styles = StyleSheet.create({})
