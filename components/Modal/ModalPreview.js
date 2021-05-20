import React from 'react'
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import * as PropTypes from 'prop-types';

const ModalPreview = ({ isShow = true, children }) => {
    const [modalVisible, setModalVisible] = React.useState(isShow);

    return (
        <View
            // style={[styles.centeredView]}
        >
            <Modal
                animationType="slide"
                transparent={true}
                visible={isShow}

            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        {children}
                    </View>
                </View>
            </Modal>
        </View>
    )
}


export default ModalPreview

const styles = StyleSheet.create({
    centeredView: {
        justifyContent: "center",
        alignItems: "center",
        height:'100%',
        backgroundColor:'white'
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }

})
