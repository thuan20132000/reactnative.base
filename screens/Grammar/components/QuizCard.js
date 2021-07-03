import React, { useState } from 'react'
import { Checkbox, ProgressBar, RadioButton, Modal, Provider, Portal, Badge } from 'react-native-paper';
import { StyleSheet, Text, View, FlatList, Switch, Image } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import GrammarExcerciseModel from '../../../app/models/grammarExcerciseModel';
import GrammarModel from '../../../app/models/grammarModel';
import { BOXSHADOW, COLORS, FONTS } from '../../../app/constants/themes';
import GrammarAPI from '../../../app/API/GrammarAPI';
import { setPractisedGrammarResult } from '../../../app/StorageManager';




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
                    <Text style={FONTS.body4, { color: 'red',flex:2 }}> Đáp án đúng: {item?.correct_answer} </Text>
                    <TouchableOpacity
                        onPress={() => onExplainPress(item)}
                        style={{
                            backgroundColor: COLORS.primary,
                            borderRadius: 26,
                            padding:8
                        }}

                    >
                        <Text style={[FONTS.body4, { color: 'white', fontWeight: '400',flex:1 }]}>Giải thích</Text>
                    </TouchableOpacity>
                </View>
            }

        </View>
    )
}

export default QuizCard
const styles = StyleSheet.create({})
