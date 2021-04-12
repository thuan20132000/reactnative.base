import React from 'react'
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import { IconButton, ProgressBar } from 'react-native-paper'
import CommonIcons from '../../utils/CommonIcons'
import CommonImages from '../../utils/CommonImages'
import ControlButton from '../Button/ControlButton'

const AudioItem = () => {
    return (
        <View
            style={[
                styles.container
            ]}
        >
            <View
                style={[
                    styles.row,
                    {
                        alignItems: 'center'
                    }
                ]}
            >
                <Image
                    source={{
                        uri: CommonImages.avatar
                    }}
                    style={{
                        width: 40,
                        height: 40
                    }}
                />

                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >

                    <View
                        style={[
                            styles.row,
                            {
                                alignItems: 'center'
                            }
                        ]}
                    >
                        <ControlButton
                            iconName={CommonIcons.heartOutline}
                            label={7}
                        />
                        <ControlButton
                            iconName={CommonIcons.commentProcessingOutline}
                            label={8}
                        />
                    </View>
                    <View>
                        <ProgressBar
                            progress={0.5}
                            style={{
                                width: deviceWidth - 100
                            }}
                        />
                    </View>

                </View>

            </View>

            <IconButton
                icon={CommonIcons.playCircleOutline}
                color={'coral'}
                size={24}
                style={{ marginHorizontal: 6 }}
                onPress={() => console.warn('ds')}
            />
        </View>
    )
}

export default AudioItem
const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 6,
        backgroundColor: 'white',
        marginHorizontal: 4,
        marginVertical: 1,
        minHeight: 80,
        borderRadius:6,
    },
    row: {
        display: 'flex',
        flexDirection: 'row',

    },
    column: {
        display: 'flex',
        flexDirection: 'column'
    }
})
