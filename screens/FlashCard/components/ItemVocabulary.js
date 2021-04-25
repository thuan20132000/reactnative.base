import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { IconButton } from 'react-native-paper'
import CommonIcons from '../../../utils/CommonIcons'

const ItemVocabulary = ({
    name,
    phon,
    type,
    sound,
    onSoundPress,
    onItemPress,
}) => {

    return (
        <TouchableOpacity
            style={[
                styles.container,
                {
                    marginHorizontal: 6,
                    marginVertical: 2,
                    justifyContent: 'space-between',
                    borderRadius: 8
                }
            ]}
            onPress={onItemPress}
        >
            <View
                style={[
                    styles.left,
                    {
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center'
                    }
                ]}
            >
                <Text
                    style={{
                        color: 'black',
                        fontSize: 16,
                        marginHorizontal: 6,
                        fontWeight: '700'
                    }}
                >
                    {name}
                </Text>
                <Text
                    style={{
                        marginHorizontal: 6,
                        color: 'grey',
                        fontSize: 12
                    }}
                >
                    ({type})
                </Text>
            </View>
            <View
                style={[
                    styles.right,
                    styles.row,
                    {
                        alignItems: 'center'
                    }
                ]}
            >
                <Text>{phon}</Text>
                <IconButton
                    icon={CommonIcons.volumnHigh}
                    animated={true}
                    onPress={onSoundPress}
                    size={22}
                    color={'white'}
                    style={{
                        backgroundColor: 'red',
                        margin: 0,
                        marginHorizontal: 4
                    }}
                />
            </View>
        </TouchableOpacity>
    )
}

export default ItemVocabulary

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        padding: 6,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    row: {
        display: 'flex',
        flexDirection: "row"
    },
    right: {
        alignItems: 'flex-end'
    },
    left: {
        justifyContent: 'flex-end'
    }
})
