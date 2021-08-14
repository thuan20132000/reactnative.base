import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { BOXSHADOW } from '../../../app/constants/themes'
import CommonImages from '../../../utils/CommonImages'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import CommonIcons from '../../../utils/CommonIcons'

const LearnerItem = ({
    onPress,
    name,
    address,
    description,
    star,
    imagePath
}) => {
    return (
        <TouchableOpacity
            style={[styles.container]}
            onPress={onPress}
        >
            <View
                style={{
                    width:'10%'
                }}
            >
                <Image
                    source={{
                        uri: imagePath || CommonImages.avatar
                    }}
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: 10
                    }}
                />

            </View>
            <View
                style={{
                    paddingHorizontal:22,
                    width:'80%'
                }}
            >
                <Text style={{ fontWeight: '700', margin: 4 }}>{name}</Text>
                {/* <Text style={{ fontWeight: '500', margin: 4 }}>{address}</Text> */}
                <Text numberOfLines={2} style={{ width: '60%' }}>{description}</Text>
            </View>

            <View
                style={{
                    position: 'absolute',
                    bottom: 6,
                    right: 10,
                    flexDirection: 'row',
                    alignItems: 'center'
                }}
            >
                {/* <Text style={{ fontWeight: '700' }}>4.5</Text> */}
                {/* <MaterialCommunityIcons name={CommonIcons.star} color={'gold'} size={22} /> */}
            </View>
        </TouchableOpacity>
    )
}

export default LearnerItem

const styles = StyleSheet.create({
    container: {
        padding: 12,
        backgroundColor: 'white',
        margin: 4,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        ...BOXSHADOW.normal,
        height: 80
    }
})
