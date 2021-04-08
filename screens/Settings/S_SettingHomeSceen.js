import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import CommonIcons from '../../utils/CommonIcons'
import RowItem from '../Settings/components/RowItem'
import LearningActivities from './components/LearningActivities'

const S_SettingHomeSceen = (props) => {

   

    return (
        <View>


            <View>
                <LearningActivities />
            </View>
            <RowItem
                label={"Nhắc nhở"}
                leftIconName={CommonIcons.bell}
                leftIconStyle={{
                    color: 'coral'
                }}
                containerStyle={[styles.itemContainer]}
                leftIconSize={26}
                labelStyle={{
                    marginLeft: 16,
                    fontSize: 16
                }}
                onItemPress={() => props.navigation.navigate('VocabularyRemind')}
            />
            <RowItem
                label={"Lịch sử tìm kiếm"}
                leftIconName={CommonIcons.search}
                leftIconStyle={{
                    color: 'coral'
                }}
                containerStyle={[styles.itemContainer]}

                leftIconSize={26}
                labelStyle={{
                    marginLeft: 16,
                    fontSize: 16

                }}
                onItemPress={() => props.navigation.navigate('SearchHistory')}

            />
            {/* <RowItem
                label={"Ngữ pháp tiếng anh"}
                leftIconName={CommonIcons.account}
                containerStyle={[styles.itemContainer]}

                leftIconSize={26}
                labelStyle={{
                    marginLeft: 16,
                    fontSize: 16

                }}
            /> */}
            <RowItem
                label={"Đóng góp cải thiện"}
                leftIconName={CommonIcons.face_good}
                leftIconStyle={{
                    color: 'coral'
                }}
                containerStyle={[styles.itemContainer]}

                leftIconSize={26}
                labelStyle={{
                    marginLeft: 16,
                    fontSize: 16

                }}
                onItemPress={() => props.navigation.navigate('Contribution')}

            />
            <RowItem
                label={"Đánh giá ủng hộ ứng dụng trên Google Play"}
                leftIconName={CommonIcons.bookMarker}
                leftIconStyle={{
                    color: 'coral'
                }}
                containerStyle={[styles.itemContainer]}

                leftIconSize={26}
                labelStyle={{
                    marginLeft: 16,
                    fontSize: 16

                }}
            />
            <RowItem
                label={"Chia sẻ ứng dụng với bạn bè"}
                leftIconName={CommonIcons.shareVariant}
                leftIconStyle={{
                    color: 'coral'
                }}
                containerStyle={[styles.itemContainer]}

                leftIconSize={26}
                labelStyle={{
                    marginLeft: 16,
                    fontSize: 16

                }}
            />
            <View
                style={[
                    {
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginVertical: 12
                    }
                ]}
            >

                <Text
                    style={{
                        color: 'grey',
                        fontSize: 12,
                        fontWeight: '100',
                        fontStyle: 'italic'
                    }}
                >
                    version 1.0
                </Text>
            </View>
        </View>
    )
}

export default S_SettingHomeSceen

const styles = StyleSheet.create({
    itemContainer: {
        paddingVertical: 12
    }
})
