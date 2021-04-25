import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import CommonColor from '../../../utils/CommonColor'
import CommonIcons from '../../../utils/CommonIcons'
import { getActionDays } from '../../../utils/helper'
const LearningActivities = () => {

    const [actionDays, setActionsDays] = useState(0);

    useEffect(() => {
        getActionDays()
            .then((data) => {
                if (data) {
                    setActionsDays(data);
                }
            });
    }, [])

    return (
        <View
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 8
            }}
        >
            <Text
                style={{
                    color: 'black',
                    fontWeight: '700',
                }}
            >
                Thời gian luyện tập liên tục
            </Text>
            <View
                style={[
                    {
                        display: 'flex',
                        flexDirection: 'row',
                        width: 80,
                        height: 80,
                        backgroundColor: 'white',
                        borderRadius: 40,
                        margin: 12,
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignItems: 'center',
                        shadowColor: CommonColor.btnSubmit,
                        shadowOffset: {
                            width: 4,
                            height: 5,
                        },
                        shadowOpacity: 0.36,
                        shadowRadius: 6.68,

                        elevation: 22,
                    }
                ]}
            >
                <Text
                    style={{
                        color: CommonColor.btnSubmit,
                        fontWeight: '700',
                        fontSize: 18
                    }}
                >
                    {actionDays} ngày
                </Text>
            </View>

{/* 
            <View
                style={{
                    backgroundColor: 'white',
                    padding: 4,
                    borderRadius: 12,
                    marginVertical: 6
                }}
            >
                <Text
                    style={{
                        textAlign: 'center',
                        fontSize: 14,
                        color: "grey",
                        color: 'coral',
                        fontWeight: '700'
                    }}
                >
                    Knows your limits, but never stop trying to exceed them.
                </Text>
                <Text
                    style={{
                        textAlign: 'center',
                        fontSize: 14,
                        color: "grey"
                    }}
                >
                    Biết giới hạn của bản thân, nhưng đừng bao giờ ngừng cố gắng để mở rộng nó.
                </Text>

            </View> */}
        </View>
    )
}

export default LearningActivities

const styles = StyleSheet.create({})
