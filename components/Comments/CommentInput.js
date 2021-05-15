import React from 'react'
import { StyleSheet, TextInput, Text, View, KeyboardAvoidingView, Platform } from 'react-native'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import CommonIcons from '../../utils/CommonIcons';
import CommonColors from '../../utils/CommonColor';
import { IconButton } from 'react-native-paper';

const CommentInput = ({
    onSendPress
}) => {
    const [text, setText] = React.useState('');

    const _onSend = () => {
        onSendPress(text);
        setText('');
    }

    return (

        <View style={{
            paddingTop:6,
            paddingBottom:32,
            backgroundColor: 'lightgray',
            display:'flex',
            flexDirection:'row',
            justifyContent:'center',
            alignItems:'center'
        }}>
            <TextInput
                style={{
                    backgroundColor:'white',
                    marginHorizontal:4,
                    borderRadius:4,
                    marginVertical:4,
                    flex:2
                }}
                placeholder="Your message here..."
                multiline={true}
                value={text}
                onChangeText={(text) => setText(text)}
            />
            <IconButton
                icon={CommonIcons.send}
                size={22}
                color={CommonColors.btnSubmit}
                style={{
                    marginHorizontal:6
                }}
                onPress={_onSend}
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
