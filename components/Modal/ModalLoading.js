import React, { useState } from 'react'
import { ActivityIndicator, Modal, StyleSheet, Text, View } from 'react-native'

const ModalLoading = ({
    transparent = false,
    animationType = "slide",
    visible = false,
    setVisible
}) => {

    const [modalVisible, setModalVisible] = useState(true);

    return (

        <Modal
            animationType={"fade"}
            transparent={transparent}
            visible={visible}

          

        >
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(114, 109, 109,0.5)'
                }}
            >
                <ActivityIndicator
                    animating={true}
                    size={'large'}
                    color={'red'}
                />

            </View>
        </Modal>

    )
}

export default ModalLoading

const styles = StyleSheet.create({})
