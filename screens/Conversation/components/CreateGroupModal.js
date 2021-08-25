import React from 'react'
import { useState } from 'react';
import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { Modal, Portal } from 'react-native-paper';
import ButtonText from '../../../components/Button/BottonText';

const CreateGroupModal = ({ isShow, setIsShow, onCreatePress }) => {

    const containerStyle = { backgroundColor: 'white', padding: 20, height: 320 };

    const [groupName, setGroupName] = useState('')



    return (
        <Modal visible={isShow} onDismiss={() => setIsShow(false)} style={{ marginHorizontal: 20, bottom: 160, alignSelf: 'center' }} contentContainerStyle={containerStyle}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{
                    flex: 1,
                    justifyContent: 'center'
                }}
            >
                <TextInput
                    value={groupName}
                    onChangeText={(text) => setGroupName(text)}
                    style={{
                        backgroundColor: 'white',
                        height: 40,
                        paddingHorizontal: 8,
                        borderColor: '#dcdcdc',
                        borderWidth: 1
                    }}
                    placeholder={'Group name'}
                />

                <ButtonText
                    label={'ADD'}
                    labelStyle={{
                        fontWeight:'700'
                    }}
                    containerStyle={{
                        marginTop: 22,
                        height: 40
                    }}
                    onItemPress={() => {
                        onCreatePress(groupName)
                        setGroupName('')
                    }}
                />
            </KeyboardAvoidingView>
        </Modal>
    )
}

export default CreateGroupModal

const styles = StyleSheet.create({})
