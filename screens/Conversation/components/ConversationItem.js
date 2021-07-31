import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { BOXSHADOW } from '../../../app/constants/themes'
import ButtonText from '../../../components/Button/BottonText'
import ButtonGradient from '../../../components/shared/ButtonGradient'
import CommonImages from '../../../utils/CommonImages'

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
                height: 220,
                marginHorizontal: '2%',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginVertical: 12,
                backgroundColor: 'white',
                overflow: 'hidden',
                borderRadius: 12,

            }}
        >
            <Image
                source={{
                    uri: image_path
                }}
                style={{
                    width: '80%',
                    height: 100
                }}
                resizeMode={'contain'}
            />
            <Text numberOfLines={2} style={{fontSize:14,fontWeight:'500',marginVertical:12}}>{title}</Text>
            <View
                style={{
                    flexDirection: 'row',
                    bottom:0
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
                        backgroundColor: 'coral'
                    }}
                />
                <ButtonText
                    label={'Group'}
                    width={80}
                    rightIcon
                    onItemPress={onGroupPress}
                    labelStyle={{
                        fontWeight: '700'
                    }}
                    containerStyle={{
                        backgroundColor: 'deepskyblue',
                    }}

                />
            </View>
            <View
                style={{
                    width:'60%',
                    borderWidth:0.6,
                    height:1,
                    borderColor:'red',
                    backgroundColor:'red'
                }}
            />
        </View>
    )
}

export default ConversationItem

const styles = StyleSheet.create({})
