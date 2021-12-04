import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, SafeAreaView, TouchableOpacity,Alert } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ConversationAPI from '../../app/API/ConversationAPI'
import CommonColor from '../../utils/CommonColor'
import RNProgressHud from 'progress-hud';

const ConversationCommentScreen = () => {

    const route = useRoute()
    const navigation = useNavigation()
    const { conversation_id } = route?.params ?? ''

    const [comment, setComment] = useState('')

    const _onSendCommentPress = () => {
        RNProgressHud.show()
        ConversationAPI.addPostComment(comment, conversation_id)
            .then(res => {
                Alert.alert("Thank you","We received your report and we will act accrodingly after reviewing")
                navigation.goBack()
            })
            .catch(err => { })
            .finally(() => RNProgressHud.dismiss())
    }

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: 'white'

            }}
        >
            <KeyboardAwareScrollView
                style={styles.keyboardView}
                showsVerticalScrollIndicator={false}
            >
                <View
                    style={[
                        {
                            flex: 1,

                            backgroundColor: 'white'
                        }
                    ]}
                >

                    <View
                        style={[styles.inputView, { borderRadius: 6, bottom: 0 }]}
                    >
                        <TextInput
                            style={styles.textInput}
                            placeholder='Write report about content...'
                            multiline
                            onChangeText={(text) => setComment(text)}
                            value={comment}
                        />
                    </View>
                    <View
                        style={[{
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginVertical: 8,
                            paddingHorizontal: 12
                        }]}
                    >

                        <TouchableOpacity
                            onPress={_onSendCommentPress}
                            style={[
                                styles.sendReviewTouch
                            ]}
                        >
                            <Text style={[styles.sendReviewText]}>SEND</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}

export default ConversationCommentScreen

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'white'
    },
    keyboardView: {
        backgroundColor: 'white',
        flex: 1
    },
    itemView: {
        // width: (Constant.screen.width - 4 * space) / 3,
        // height: (Constant.screen.width - 4 * space) / 3,
        // marginRight: space,
        // marginBottom: space,
        // borderColor: Constant.color.border,
        borderWidth: 1,
    },
    imgTouch: {
        width: '100%',
        height: '100%',
        position: 'absolute'
    },
    imgItem: {
        width: '100%',
        height: '100%',
    },
    deleteTouch: {
        height: 30,
        width: 30,
        alignSelf: 'flex-end'
    },
    flatListContent: {
        // marginLeft: space,
        alignItems: 'center'
    },
    sendReviewText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16
    },
    inputView: {
        backgroundColor: '#e8e8e8',
        height: 150,
        marginHorizontal: 12,
        marginTop: 4,
        borderWidth: 1,
        borderColor: '#cccccc'
    },
    textInput: {
        flex: 1,
        padding: 12,
        paddingTop: 8,
        textAlignVertical: 'top',
    },
    sendReviewView: {
        height: 55,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sendReviewTouch: {
        backgroundColor: CommonColor.primary,
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        width: '100%',
        borderRadius: 5
    },

})
