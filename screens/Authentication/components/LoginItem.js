import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'

const LoginItem = ({ logoPath, label, onPress }) => {

    return (
        <TouchableOpacity
            style={[styles.container]}
            onPress={onPress}
        >
            <Image
                source={logoPath}
                style={{
                    width: 50,
                    height: 50,
                    resizeMode: 'cover',
                    borderRadius: 25
                }}
            />
            <View
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '80%'
                }}
            >
                <Text style={{ textAlign: 'center',fontWeight:'700' }}>{label}</Text>

            </View>
        </TouchableOpacity>
    )
}

export default LoginItem

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
        borderRadius: 8,
        paddingVertical: 6,
        marginVertical: 12,
        paddingHorizontal: 22,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,

    }
})
