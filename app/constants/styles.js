import { StyleSheet, StyleSheetProperties, TextPropTypes } from 'react-native'

export default StyleSheet.create({
    boxshadow: {
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

export const COLORS = {
    primary: '#277fc6',
    white:'#ffffff'
}