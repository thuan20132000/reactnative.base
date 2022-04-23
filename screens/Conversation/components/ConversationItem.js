import React from 'react'
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { BOXSHADOW } from '../../../app/constants/themes'
import ButtonText from '../../../components/Button/BottonText'
import ButtonGradient from '../../../components/shared/ButtonGradient'
import CommonImages from '../../../utils/CommonImages'
import FastImage from 'react-native-fast-image'
import ConversationPostModel from '../../../app/models/conversationPostModel'

const ConversationItem = ({
    image_path,
    onPracticePress,
    onGroupPress,
    title,
    onJoinPress,
    conversation = new ConversationPostModel(null)

}) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPracticePress}>
            <View
                style={{
                    width: '100%',
                    height: 100,
                    overflow: 'hidden'
                }}
            >
                <FastImage
                    source={{
                        uri: conversation?.image
                    }}
                    style={{
                        width: '100%',
                        height: '100%',
                        borderTopRightRadius: 12,
                        borderTopLeftRadius: 12,
                    }}

                    resizeMode={FastImage.resizeMode.cover}

                />
            </View>
            <Text numberOfLines={3} style={styles.title}>{conversation?.title}</Text>
            <View
                style={{
                    flexDirection: 'column',
                }}
            >
                {
                    // onPracticePress &&
                    // <ButtonText
                    //     label={'PRACTICE'}
                    //     width={100}
                    //     rightIcon
                    //     onItemPress={onPracticePress}
                    //     labelStyle={{
                    //         fontWeight: '700'
                    //     }}
                    //     containerStyle={{
                    //         backgroundColor: 'coral',
                    //         width: 120,
                    //         height: 32
                    //     }}
                    //     iconSize={16}
                    // />
                }

                {
                    onGroupPress &&
                    <ButtonText
                        label={'Group'}
                        width={100}
                        rightIcon
                        onItemPress={onGroupPress}
                        labelStyle={{
                            fontWeight: '700'
                        }}
                        containerStyle={{
                            backgroundColor: 'deepskyblue',
                            width: 120,
                            height: 32
                        }}
                        iconSize={16}
                    />

                }

                {
                    onJoinPress &&
                    <ButtonText
                        label={'Join'}
                        width={100}
                        rightIcon
                        onItemPress={onJoinPress}
                        labelStyle={{
                            fontWeight: '700'
                        }}
                        containerStyle={{
                            backgroundColor: 'deepskyblue',
                            width: 120,
                            height: 32
                        }}
                        iconSize={16}
                    />

                }
            </View>
            <View
                style={{
                    width: '60%',
                    borderWidth: 0.6,
                    height: 1,
                    borderColor: 'red',
                    backgroundColor: 'red'
                }}
            />
        </TouchableOpacity>
    )
}

export default ConversationItem

const styles = StyleSheet.create({
    container: {
        width: '46%',
        height: 200,
        marginHorizontal: '2%',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 12,
        backgroundColor: 'white',
        borderRadius: 12,
        ...BOXSHADOW.normal


    },
    title: {
        fontSize: 12,
        fontWeight: '500',
        marginVertical: 12,
        marginHorizontal: 6,
        textAlign: 'justify'
    }
})
