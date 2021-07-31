import React from 'react'
import { ImageBackground, StyleSheet, Text, View } from 'react-native'

const ButtonGradient = () => {
    return (
        <ImageBackground
            source={require('../../app/assets/images/button_bg.png')}

            style={{
                width:100,
                height:40
            }}
        >
            <Text>Luyen Tap</Text>
        </ImageBackground>
    )
}

export default ButtonGradient

const styles = StyleSheet.create({})
