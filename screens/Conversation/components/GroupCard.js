import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

const GroupCard = ({ authorName, authorImage, conversationName,groupName }) => {
    return (
        <View
            style={[styles.container]}
        >
            <Text>{conversationName}</Text>
            <View>
                <Text>{groupName}</Text>
            </View>
            <View
                style={{
                    display:'flex',
                    flexDirection:'row'
                }}
            >
                <Text>{authorName}</Text>
                <Image
                    source={{
                        uri: authorImage
                    }}
                    style={{
                        width: 60,
                        height: 60,
                        borderRadius: 30
                    }}
                />
            </View>
        </View>
    )
}

export default GroupCard

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        backgroundColor: 'white',
        alignSelf: 'center',
        margin: 4,
        height: 120,
        width:'100%'
    }
})
