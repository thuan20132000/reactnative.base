import React from 'react'
import { ScrollView, StyleSheet, Text, TextInput, View, Image, ImageBackground, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import { Avatar } from 'react-native-paper';
import CommonImages from '../../utils/CommonImages';
import Video from 'react-native-video';
import CommonColor from '../../utils/CommonColor';
import { uploadPost } from '../../utils/api_v1';
import { useSelector } from 'react-redux';

const C_CommunityUploadScreen = (props) => {

    const { file_url } = props.route.params;
    const [isOpenVideo, setIsOpenVideo] = React.useState(false);
    const _refVideo = React.useRef();

    const { userInformation } = useSelector(state => state.authentication);

    const [isLoading, setIsLoading] = React.useState(false);
    const [content, setContent] = React.useState('');





    const _onUploadPost = async () => {
       
        setIsLoading(true);
        uploadPost('test video', content, file_url, userInformation.access)
            .then((res) => {
                if (res.status && res.data?.status_code === 201) {
                    Alert.alert('', 'Upload post successfully.');
                    props.navigation.navigate('CommunityHome');
                }
            })
            .catch((err) => {
                console.warn('err: ', err)
            })
            .finally(() => {
                setIsLoading(false);
            })

    }

    return (
        <ScrollView>

            <View
                style={[styles.row]}
            >
                <View>
                    <Avatar.Image size={24} source={{ uri: CommonImages.avatar }} />
                    <Text>Thuan truong</Text>

                </View>
                <TouchableOpacity
                    style={{
                        marginHorizontal: 12
                    }}
                    onPress={_onUploadPost}
                >
                    <Text style={{ fontWeight: '700', fontSize: 18, color: CommonColor.primary }}>Post</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TextInput
                    placeholder={'Hãy nói gì đó về video này...'}
                    style={{
                        fontSize: 18,
                        paddingHorizontal: 12
                    }}
                    multiline={true}
                    value={content}
                    onChangeText={setContent}
                />
                <ActivityIndicator
                    size={'large'}
                    color={'red'}
                    animating={isLoading}
                />
            </View>

            <View
                style={{
                    display: 'flex',
                    flex: 1,
                    marginVertical: 22,

                }}
            >
                {
                    (file_url && isOpenVideo) ?
                        <Video
                            ref={_refVideo}                                      // Store reference
                            // onBuffer={this.onBuffer}                // Callback when remote video is buffering
                            // onError={this.videoError}               // Callback when video cannot be loaded
                            // style={styles.backgroundVideo}
                            source={{ uri: file_url || "" }}   // Can be a URL or a local file.
                            rate={1.0}
                            volume={3.0}
                            isMuted={false}
                            resizeMode="cover"
                            style={[
                                styles.preview,
                                {
                                    height: 500
                                }
                            ]}

                            controls={true}


                        /> :
                        <TouchableOpacity
                            onPress={() => setIsOpenVideo(true)}
                            style={{
                                display: 'flex',
                                alignSelf: 'center'
                            }}
                        >

                            <Image
                                source={{
                                    uri: file_url
                                }}
                                style={[
                                    styles.preview, {
                                        height: 300,
                                        width: 300
                                    }
                                ]}

                            />
                        </TouchableOpacity>


                }
            </View>
        </ScrollView>
    )
}

export default C_CommunityUploadScreen

const styles = StyleSheet.create({
    row: {
        display: 'flex',
        flexDirection: 'row'
    },
    preview: {
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
})
