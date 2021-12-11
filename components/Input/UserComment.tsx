import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import FastImage from 'react-native-fast-image'
import Constants from '../../app/constants/Constant'
import Icon from 'react-native-vector-icons/Ionicons';

const UserComment = () => {
    return (
        <View style={[styles.container]}>
            <View style={[styles.header]}>
                <FastImage
                    source={{ uri: Constants.masterData.communityData.avatarUrl }}
                    style={{
                        width: 50,
                        height: 50,
                        marginRight: 12,
                        marginVertical: 12,
                        borderRadius: 25
                    }}
                />
                <View>
                    <Text>Dominique Palmer</Text>
                    <Text>American</Text>
                </View>
                <Button
                    type='clear'
                    icon={
                        <Icon name={Constants.ionicon.personAdd} size={22} color={Constants.COLORS.primary} />
                    }
                    containerStyle={{ borderRadius: 20, position: 'absolute', top: 0, right: 0 }}
                />
            </View>
            <View style={{ marginBottom: 22 }}>
                <Text>Perfect. Please keep it up. Perfect. Please keep it up. Perfect. Please keep it up. Perfect. Please keep it up. Perfect. Please keep it up.</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                <Button
                    icon={
                        <Icon name={Constants.ionicon.likeThumb} size={16} color={Constants.COLORS.white} />
                    }
                    containerStyle={{ borderRadius: 20, width: 100 }}
                    title={'12'}
                />
                <Button
                    icon={
                        <Icon name={Constants.ionicon.dislikeThumb} size={16} color={Constants.COLORS.white} />
                    }
                    containerStyle={{ borderRadius: 20, width: 100 }}
                    title={'34'}
                />

            </View>
            <Text style={{ marginTop: 6, color: 'gray', fontStyle: 'italic' }}>{new Date().toISOString()}</Text>
        </View>
    )
}

export default UserComment

const styles = StyleSheet.create({
    container: {
        padding: 12,
        backgroundColor: '#ffffff',
        borderRadius: 12,
        ...Constants.styles.boxshadow,
        marginHorizontal: 2,
        marginVertical: 4
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    }
})
