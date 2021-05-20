import React from 'react'
import { Dimensions, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import CommonImages from '../../../../utils/CommonImages'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import CommonIcons from '../../../../utils/CommonIcons'
import { IconButton } from 'react-native-paper'

const PostCard = ({
    onPostDetailPress,
    onLikePress,
    onCommentPress,
    onSharePress,
    onEditPress,
    author,
    content,
    practiceNumber = 0,
    favoriteNumber=0,
    favorite_active=false

}) => {
    return (
        <View
            style={[
                styles.container
            ]}
        >
            <View
                style={[
                    styles.row,
                    {
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingHorizontal: 12
                    }
                ]}
            >
                <View
                    style={[
                        styles.row,
                        {
                            justifyContent: 'center',
                            alignItems: 'center'
                        }
                    ]}
                >
                    <Image
                        source={{
                            uri: CommonImages.avatar
                        }}
                        style={{
                            width: 40,
                            height: 30,
                            borderRadius: 20
                        }}
                    />
                    <Text
                        style={{
                            marginHorizontal: 12,
                            fontWeight: '700'
                        }}
                    >
                        {author}
                    </Text>
                </View>
                <IconButton
                    icon={CommonIcons.dotsVertical}
                    color={'coral'}
                    size={24}
                    style={{ marginHorizontal: 6 }}
                    onPress={onEditPress}
                />

            </View>
            {/* body */}
            <TouchableOpacity
                style={[
                    styles.body
                ]}
                onPress={onPostDetailPress}
            >

                <Text
                    numberOfLines={5}
                >
                    {content}
                </Text>
            </TouchableOpacity>
            {/* footer */}
            <View
                style={[
                    styles.footerContainer
                ]}
            >
                <View
                    style={[
                        styles.row,
                        {
                            alignItems: 'center'
                        }
                    ]}
                >

                    <View
                        style={[
                            styles.row,
                            {
                                alignItems: 'center'
                            }
                        ]}
                    >
                        <IconButton
                            icon={favorite_active? CommonIcons.heart :CommonIcons.heartOutline}
                            color={'coral'}
                            size={24}
                            style={{ marginHorizontal: 6 }}
                            onPress={onLikePress}

                        />
                        <Text style={{ fontWeight: '700' }}>{favoriteNumber}</Text>
                    </View>

                </View>
                <View>
                    <Text
                        style={{ fontSize: 12, color: 'black', fontWeight: '700', fontStyle: 'italic', marginVertical: 4 }}
                    >
                        {practiceNumber} người đã luyện tập
                    </Text>
                </View>

                {/* <View>
                    <Text
                        style={{
                            color: 'gray',
                            marginVertical: 4
                        }}
                    >
                        Xem tất cả 6 bình luận
                    </Text>
                </View> */}
            </View>
            {/* comments */}
            <View>
                <View
                    style={[styles.row, { alignItems: 'center' }]}
                >
                    <MaterialCommunityIcon
                        name={CommonIcons.face_verygood}
                        size={16}
                        color={'coral'}
                        style={{
                            marginHorizontal: 8
                        }}
                    />
                    <Text style={{ color: 'black', fontStyle: 'italic' }}>Luyện tập cùng tôi.</Text>
                </View>
            </View>
        </View>
    )
}

const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;
export default PostCard

const styles = StyleSheet.create({
    row: {
        display: 'flex',
        flexDirection: 'row',

    },
    container: {
        backgroundColor: 'white',
        borderRadius: 2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 6,
        marginVertical: 1,
        paddingVertical: 8
    },
    footerContainer: {
        marginHorizontal: 12,
        marginVertical: 6
    },
    body: {
        paddingHorizontal: 8
    }
})
