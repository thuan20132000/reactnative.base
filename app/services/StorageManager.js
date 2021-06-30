import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'


export const setData = async (key, value) => {
    try {
        return await AsyncStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
        alert(error)
    }
}

export const getData = async (key) => {
    try {
        let data = await AsyncStorage.getItem(key)
        return JSON.parse(data)
    } catch (error) {
        return null
    }
}
