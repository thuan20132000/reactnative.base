import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import ConversationAPI from '../../app/API/ConversationAPI';
import GroupCard from './components/GroupCard';
import RNProgressHud from 'progress-hud';
import ConversationGroupModel from '../../app/models/conversationGroupModel';
import { useNavigation } from '@react-navigation/native';
import ButtonText from '../../components/Button/BottonText';
import { BOXSHADOW, COLORS } from '../../app/constants/themes';
import { Provider, Modal, Portal } from 'react-native-paper';
import CreateGroupModal from './components/CreateGroupModal';

const ConversationGroupScreen = (props) => {
    const navigation = useNavigation();
    const [createGroupVisible, setCreateGroupVisible] = useState(false);
    const [conversationGroup, setConversationGroup] = useState([]);
    const { conversation } = props.route?.params ?? '';


    const _onGetConversationGroups = () => {
        RNProgressHud.show()

        ConversationAPI.getConversationGroup(conversation?.id)
            .then((res) => {
                if (res.status_code === 200 && res?.data?.length > 0) {
                    let groups = res?.data.map(e => new ConversationGroupModel(e))
                    setConversationGroup(groups)
                }
            })
            .catch((err) => {
                navigation.goBack()
            })
            .finally(() => {
                RNProgressHud.dismiss()
            })
    }

    useEffect(() => {
        _onGetConversationGroups()
    }, [])


    const _onOpenConversationGroup = (group) => {
        navigation.navigate('ConversationDetail', {
            item: group
        })
    }

    const _onCreateGroupVisiblePress = () => {
        setCreateGroupVisible(true)
    }

    const _onCreateGroup = async (groupName) => {
        console.warn(groupName)
        setCreateGroupVisible(false)
        RNProgressHud.show()
        ConversationAPI.createConversationGroup(groupName, conversation?.id)
            .then((res) => {
                if(res.status_code === 201){
                    _onGetConversationGroups()
                }
            })
            .catch((err) => {
                console.warn('sd ', err)
                RNProgressHud.dismiss()

            })
          
    }


    React.useLayoutEffect(() => {
        navigation.dangerouslyGetParent().setOptions({
            tabBarVisible: false,

        });


    }, [])
    return (
        <Provider>
            <Portal>
                <CreateGroupModal onCreatePress={_onCreateGroup} isShow={createGroupVisible} setIsShow={setCreateGroupVisible} />
            </Portal>

            <View
                style={{
                    display: 'flex',
                    flex: 1
                }}
            >

                <FlatList

                    data={conversationGroup}
                    renderItem={({ item }) => {
                        return (
                            <GroupCard
                                authorName={item.author?.username}
                                authorImage={item.author?.profile_pic}
                                conversationName={item.conversation?.title}
                                groupName={item.name}
                                onPress={() => _onOpenConversationGroup(item)}
                            />

                        )
                    }}
                    keyExtractor={(item) => item?.id}

                />
                <View>
                    <ButtonText
                        label={'Tạo nhóm'}
                        containerStyle={styles.buttonCreate}
                        labelStyle={{
                            color: COLORS.secondary,
                            fontSize: 16,
                            fontWeight: '600'
                        }}
                        onItemPress={_onCreateGroupVisiblePress}
                    />
                </View>
            </View>
        </Provider>

    )
}

export default ConversationGroupScreen

const styles = StyleSheet.create({
    buttonCreate: {
        backgroundColor: 'transparent',
        borderWidth: 0.6,
        borderColor: COLORS.secondary,
        marginBottom: 32,
        height: 50,
    }
})
