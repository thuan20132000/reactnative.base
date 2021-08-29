import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const GoalProgress = ({
    fill = 100
}) => {
    return (

        <AnimatedCircularProgress
            size={120}
            width={15}
            fill={fill}
            tintColor="#00e0ff"
            onAnimationComplete={() => console.log('onAnimationComplete')}
            backgroundColor="#3d5875"
        >
            {
                (fill) => (
                    <Text style={{color:'red',fontWeight:'bold'}}>
                        { fill?.toFixed(0)}%
                    </Text>
                )
            }
        </AnimatedCircularProgress>
    )
}

export default GoalProgress

const styles = StyleSheet.create({

})
