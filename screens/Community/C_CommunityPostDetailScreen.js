import React from 'react'
import { Dimensions, Image, ImageBackground, StyleSheet, Text, TextInput, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { IconButton } from 'react-native-paper';
import AudioItem from '../../components/Item/AudioItem';
import CommonIcons from '../../utils/CommonIcons';
import CommonImages from '../../utils/CommonImages';

const C_CommunityPostDetailScreen = (props) => {



    React.useEffect(() => {
        props.navigation.dangerouslyGetParent().setOptions({
            tabBarVisible: false,
        });

        return () => {
            props.navigation.dangerouslyGetParent().setOptions({
                tabBarVisible: true,
               
            });
        }
    }, []);




    const _onRecordPractisePress = async () => {
        props.navigation.navigate('CommunityRecordPractise');
    }

    return (
        <>
            <ScrollView>

                <Image
                    style={{ height: deviceHeight / 2, width: deviceWidth }}
                    source={{ uri: "https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" }}
                    resizeMode={'stretch'}
                />


                <View
                    style={[
                        styles.row,
                        {
                            justifyContent: 'space-between',
                            paddingHorizontal: 22
                        }
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

                        <View
                            style={[
                                styles.row,
                                {
                                    alignItems: 'center'
                                }
                            ]}
                        >
                            <IconButton
                                icon={CommonIcons.heartOutline}
                                color={'coral'}
                                size={24}
                                style={{ marginHorizontal: 6 }}
                                onPress={() => console.warn('ds')}

                            />
                            <Text style={{ fontWeight: '700' }}>12</Text>
                        </View>

                        <View
                            style={[
                                styles.row,
                                {
                                    alignItems: 'center'
                                }
                            ]}
                        >
                            <IconButton
                                icon={CommonIcons.commentProcessingOutline}
                                color={'coral'}
                                size={24}
                                style={{ marginHorizontal: 6 }}
                                onPress={() => console.warn('ds')}

                            />
                            <Text style={{ fontWeight: '700' }}>7</Text>
                        </View>
                    </View>
                    <View
                        style={[
                            styles.row,
                            {
                                alignItems: 'center'
                            }
                        ]}
                    >
                        <IconButton
                            icon={CommonIcons.microphonePlus}
                            color={'coral'}
                            size={24}
                            style={{ marginHorizontal: 6 }}
                            onPress={_onRecordPractisePress}

                        />
                        <Text style={{ fontWeight: '700' }}>Tập luyện</Text>
                    </View>
                </View>
                
                {/* Record List */}
               
                <View
                    style={[
                        styles.column
                    ]}
                >
                    <AudioItem/>
                    <AudioItem/>
                  
                </View>


            </ScrollView>
            <View
                style={[
                    {
                        zIndex:999
                    }
                ]}
            >
                <TextInput
                    style={{
                        backgroundColor: 'coral'
                    }}
                />
            </View>
        </>
    )
}
const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;
export default C_CommunityPostDetailScreen


const styles = StyleSheet.create({
    row: {
        display: 'flex',
        flexDirection: 'row',

    },
    column:{
        display:'flex',
        flexDirection:'column'
    }
})
