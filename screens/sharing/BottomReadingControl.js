import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import CommonColor from '../../utils/CommonColor'
import CommonIcons from '../../utils/CommonIcons'
const BottomReadingControl = ({
    onRunScroll,
    onResetScroll,
    onPlayAudio,
    onShowFriends,
    onCommentPress,
    onLikePress,
    onQuizPress
}) => {
    return (
        <View
            style={[styles.container]}
        >
            {
                onCommentPress &&
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row'
                    }}
                >
                    <TouchableOpacity
                        style={[
                            styles.buttonIcon,
                            {
                                alignSelf: 'flex-start'
                            }
                        ]}
                        onPress={onCommentPress}
                    >
                        <MaterialCommunityIcons
                            name={'comment-alert-outline'}
                            size={32}
                            style={{
                                color: 'red'
                            }}
                        />
                    </TouchableOpacity>
                    {
                        onQuizPress &&
                        <TouchableOpacity
                            style={[
                                styles.buttonIcon,
                                {
                                    alignSelf: 'flex-start'
                                }
                            ]}
                            onPress={onQuizPress}
                        >
                            <MaterialCommunityIcons
                                name={'comment-alert-outline'}
                                size={32}
                                style={{
                                    color: 'red'
                                }}
                            />
                        </TouchableOpacity>

                    }
                    {/* <TouchableOpacity
                    style={[
                        styles.buttonIcon,
                        {
                            alignSelf: 'flex-start'
                        }
                    ]}
                    onPress={onLikePress}
                >
                    <MaterialCommunityIcons
                        name={CommonIcons.face_verygood}
                        size={32}
                        style={{
                        }}
                    />
                </TouchableOpacity> */}

                </View>

            }
            <View style={[styles.container, { flex: 1 }]}>

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
        </View>
    )
}

export default BottomReadingControl

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 8
    },
    buttonIcon: {
        padding: 6,
        marginHorizontal: 8,
        color: 'red'
    }
})
