import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import ProgressCircle from 'react-native-progress-circle'

const GoalProgress = ({
    fill = 0
}) => {
    let progress_percent = fill ? fill?.toFixed(0):0

    return (

        <ProgressCircle
            percent={Number(progress_percent)}
            radius={80}
            borderWidth={12}
            color="#3399FF"
            shadowColor="#999"
            bgColor="#fff"
           
        >
            <Text style={{ fontSize: 18 }}>{progress_percent}%</Text>
            <Text style={{ fontSize: 12}}>Today's Progress</Text>
        </ProgressCircle>
    )
}

export default GoalProgress

const styles = StyleSheet.create({

})
