import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import CommonColor from '../../utils/CommonColor'
import CommonIcons from '../../utils/CommonIcons'
const BottomReadingControl = ({
    onRunScroll,
    onResetScroll,
    onPlayAudio,
    onShowFriends
}) => {
    return (
        <View
            style={[styles.container]}
        >
            <TouchableOpacity
                style={[
                    styles.buttonIcon
                ]}
                onPress={onRunScroll}
            >
                <MaterialCommunityIcons
                    name={'clock-start'}
                    size={32}
                    style={{
                        color: CommonColor.primary
                    }}
                />
            </TouchableOpacity>
            <TouchableOpacity
                style={[
                    styles.buttonIcon
                ]}
                onPress={onResetScroll}
            >
                <MaterialCommunityIcons
                    name={'restart'}
                    size={32}
                    style={{
                        color: CommonColor.primary
                    }}
                />
            </TouchableOpacity>
            <TouchableOpacity
                style={[
                    styles.buttonIcon
                ]}
                onPress={onPlayAudio}

            >
                <MaterialCommunityIcons
                    name={'volume-high'}
                    size={32}
                    style={{
                        color: CommonColor.primary
                    }}
                />
            </TouchableOpacity>
            {
                onShowFriends &&
                <TouchableOpacity
                    style={[
                        styles.buttonIcon
                    ]}
                    onPress={onShowFriends}

                >
                    <MaterialCommunityIcons
                        name={CommonIcons.person}
                        size={32}
                        style={{
                            color: CommonColor.primary
                        }}
                    />
                </TouchableOpacity>

            }
        </View>
    )
}

export default BottomReadingControl

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    buttonIcon: {
        padding: 6,
        marginHorizontal: 8,
        color: 'red'
    }
})
