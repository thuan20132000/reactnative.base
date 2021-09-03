import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { BOXSHADOW } from '../../../app/constants/themes'
import ButtonText from '../../../components/Button/BottonText'
import ButtonGradient from '../../../components/shared/ButtonGradient'
import CommonImages from '../../../utils/CommonImages'
import FastImage from 'react-native-fast-image'

const ConversationItem = ({
    image_path,
    onPracticePress,
    onGroupPress,
    title

}) => {
    return (
        <View
            style={{
                width: '46%',
                height: 260,
                marginHorizontal: '2%',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginVertical: 12,
                backgroundColor: 'white',
                borderRadius: 12,
                ...BOXSHADOW.normal


            }}
        >
            <View
                style={{
                    width: '100%',
                    height: 100,
                    overflow: 'hidden'
                }}
            >
                <FastImage
                    source={{
                        uri: image_path
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
            <Text numberOfLines={2} style={{ fontSize: 12, fontWeight: '500', marginVertical: 12 }}>{title}</Text>
            <View
                style={{
                    flexDirection: 'column',
                }}
            >

                <ButtonText
                    label={'PRACTICE'}
                    width={100}
                    rightIcon
                    onItemPress={onPracticePress}
                    labelStyle={{
                        fontWeight: '700'
                    }}
                    containerStyle={{
                        backgroundColor: 'coral',
                        width: 120,
                        height: 32
                    }}
                    iconSize={16}
                />
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
        </View>
    )
}

export default ConversationItem

const styles = StyleSheet.create({})
