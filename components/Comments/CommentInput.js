import React from 'react'
import { StyleSheet, TextInput, Text, View, KeyboardAvoidingView, Platform, PermissionsAndroid, TouchableOpacity } from 'react-native'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import CommonIcons from '../../utils/CommonIcons';
import CommonColors from '../../utils/CommonColor';
import { IconButton, ProgressBar } from 'react-native-paper';
import AudioRecorderPlayer, { AudioEncoderAndroidType, AudioSourceAndroidType, AVEncoderAudioQualityIOSType, AVEncodingOption } from 'react-native-audio-recorder-player';
import AudioPlay from '../Card/AudioPlay';

const audioRecorderPlayer = new AudioRecorderPlayer();
const CommentInput = ({
    onSendPress,
    onStartRecord,
    onStopRecord,
    isRecording=false
}) => {
    const [text, setText] = React.useState('');
    
    return (

        <View style={{
            paddingTop: 6,
            paddingBottom: 32,
            backgroundColor: 'lightgray',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            {
                !isRecording &&
                <TextInput
                    style={{
                        backgroundColor: 'white',
                        marginHorizontal: 4,
                        borderRadius: 4,
                        marginVertical: 4,
                        flex: 2
                    }}
                    placeholder="Your message here..."
                    multiline={true}
                    value={text}
                    onChangeText={(text) => setText(text)}
                />

            }

            {
                isRecording &&
                <View
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                        marginHorizontal: 22
                    }}
                >
                    <TouchableOpacity
                        onPress={onStopRecord}
                    >
                        <MaterialCommunityIcon
                            name={CommonIcons.removeTrash}
                            size={22}
                            color={CommonColors.btnSubmit}
                            style={{ marginHorizontal: 22 }}
                        />
                    </TouchableOpacity>
                    <ProgressBar
                        indeterminate={true}
                        style={{
                            width: 160
                        }}
                        focusable={true}
                        color={'grey'}

                    />

                </View>
            }

            {/* <IconButton
                icon={CommonIcons.microphonePlus}
                size={22}
                color={CommonColors.btnSubmit}
                style={{
                    marginHorizontal: 6
                }}
                onPressIn={()=>console.log('dssd')}
            /> */}
            {
                !isRecording &&
                <TouchableOpacity
                    onPress={onStartRecord}
                >
                    <MaterialCommunityIcon
                        name={CommonIcons.microphonePlus}
                        size={22}
                        color={CommonColors.btnSubmit}
                    />
                </TouchableOpacity>

            }

            <IconButton
                icon={CommonIcons.send}
                size={22}
                color={CommonColors.btnSubmit}
                style={{
                    marginHorizontal: 6
                }}
                onPress={()=>onSendPress(text)}
            />
        </View>

    )
}

export default CommentInput

const styles = StyleSheet.create({
    container: {
        borderColor: '#242F39',
        borderWidth: 1,
        borderRadius: 2,
        padding: 10,
        paddingLeft: 16,
        backgroundColor: '#0A151F',

        height: 80,
    },
    input: {
        height: 80
    }
})
