import React from 'react'
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native'
import { Button, LinearProgress } from 'react-native-elements'
import FastImage from 'react-native-fast-image'
import Constants from '../../../app/constants/Constant'
import Icon from 'react-native-vector-icons/Ionicons';

interface PostCardItemI {
    onPress?: TouchableOpacityProps['onPress']
}
const CommunityPostCard = (props: PostCardItemI) => {
    return (
        <View style={[styles.container]}>
            <TouchableOpacity onPress={props.onPress}>
                <View style={[styles.header]}>
                    <FastImage
                        source={{ uri: Constants.masterData.communityData.avatarUrl }}
                        style={{
                            width: 60,
                            height: 60,
                            marginRight: 12,
                            marginVertical: 12
                        }}
                    />
                    <View>
                        <Text>Dominique Palmer</Text>
                        <Text>American</Text>
                    </View>
                </View>
                <View>
                    <FastImage
                        source={{ uri: Constants.masterData.communityData.pageReaderUrl }}
                        style={{
                            width: '100%',
                            height: 120,
                            marginVertical: 12
                        }}
                        resizeMode='center'
                    />
                    <Text numberOfLines={2}>{Constants.masterData.communityData.descriptions}</Text>
                </View>

            </TouchableOpacity>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 20
            }}>
                <Button
                    type='clear'
                    icon={
                        <Icon name={Constants.ionicon.audioPlay} size={28} color={Constants.COLORS.primary} />
                    }
                />
                <LinearProgress variant='determinate' color="primary" style={{ marginHorizontal: 8 }} />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                <Button
                    type='clear'
                    icon={
                        <Icon name={Constants.ionicon.likeThumb} size={22} color={Constants.COLORS.primary} />
                    }
                    title={'12'}
                />
                <Button
                    type='clear'
                    icon={
                        <Icon name={Constants.ionicon.dislikeThumb} size={22} color={Constants.COLORS.primary} />
                    }
                    title={'6'}
                />
                <Button
                    type='clear'
                    icon={
                        <Icon name={Constants.ionicon.comment} size={22} color={Constants.COLORS.primary} />
                    }
                    title={'21'}
                />
            </View>
        </View>
    )
}

export default CommunityPostCard

const styles = StyleSheet.create({
    container: {
        padding: 12,
        backgroundColor: '#ffffff',
        borderRadius: 12,
        ...Constants.styles.boxshadow,
        margin: 12
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    }
})
