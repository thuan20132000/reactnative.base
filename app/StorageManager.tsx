import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'


/**
 * 
 * @param key 
 * @param value 
 * @returns 
 */
export const setStorageData = async (key: string, value: any) => {
    try {
        return await AsyncStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
        alert(error)
    }
}


/**
 * 
 * @param key 
 * @returns 
 */
export const getStorageData = async (key: string) => {
    try {
        let data = await AsyncStorage.getItem(key)
        return JSON.parse(data)
    } catch (error) {
        return null
    }
}




/**
 * 
 * @param grammar_id 
 * @param value 
 * @returns 
 */
export const setPractisedGrammarResult = async (grammar_id: string, value: any) => {
    try {
        return await AsyncStorage.setItem(`@grammar_${grammar_id}`, JSON.stringify(value))
    } catch (error) {
        throw error
    }
}



/**
 * 
 * @param grammar_id
 * @returns 
 */
export const getPractisedGrammarResult = async (grammar_id: string) => {
    try {
        let data = await AsyncStorage.getItem(`@grammar_${grammar_id}`);
        return JSON.parse(data)
    } catch (error) {
        return null
    }
}


/**
 * 
 * @param igrammar_id
 * @param value 
 * @returns 
 */
 export const setCompleteGrammar = async (grammar_id: string, value: any) => {
    try {
        return await AsyncStorage.setItem(`@grammar_complete_${grammar_id}`, JSON.stringify(value))
    } catch (error) {
        throw error
    }
}



/**
 * 
 * @param grammar_id
 * @returns 
 */
export const getCompleteGrammar = async (grammar_id: string) => {
    try {
        let data = await AsyncStorage.getItem(`@grammar_complete_${grammar_id}`);
        return JSON.parse(data)
    } catch (error) {
        return null
    }
}




/**
 * 
 * @param 
 * @param  
 * @returns 
 */
 export const setUserAuth = async (user: any) => {
    try {
        return await AsyncStorage.setItem(`@user_auth`, JSON.stringify(user))
    } catch (error) {
        throw error
    }
}



/**
 * 
 * @param 
 * @returns 
 */
export const getUserAuth = async () => {
    try {
        let data = await AsyncStorage.getItem(`@user_auth`);
        return JSON.parse(data)
    } catch (error) {
        return null
    }
}


export const removeUserAuth = async () => {
    try {
        let data = await AsyncStorage.removeItem(`@user_auth`);
        return data
    } catch (error) {
        return null
    }
}
