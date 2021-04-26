import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { getFieldsList, getFieldTopic } from '../../utils/api_v1'
import CommonImages from '../../utils/CommonImages'
import CardField from './components/CardField'
import { BannerAd, BannerAdSize, TestIds } from '@react-native-firebase/admob';
import { adbmod_android_app_id } from '../../config/api_config.json';

const adUnitId = __DEV__ ? TestIds.BANNER : adbmod_android_app_id;

const F_FlashCardFieldScreen = (props) => {

    const [fieldList, setFieldList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    React.useEffect(() => {
        setIsLoading(true);
        getFieldsList()
            .then((data) => {
                if (data.status) {
                    setFieldList(data.data)
                }
            })
            .catch(err => console.warn(err))
            .finally((res) => setIsLoading(false));

        props.navigation.setOptions({
            headerShown: false
        })

    }, []);


    const _onNavigateToTopicList = async (field) => {
        props.navigation.navigate('FlashCardTopic', {
            field: field
        });
        // getFieldTopic(field.id)
        //     .then((data) => console.warn(data))


    }

    return (
        <>
            <View
                style={{
                    display:'flex',
                    alignSelf:'center',
                    paddingVertical:8
                }}
            >
                <BannerAd
                    unitId={adUnitId}
                    size={BannerAdSize.MEDIUM_RECTANGLE}
                    requestOptions={{
                        requestNonPersonalizedAdsOnly: true,
                        keywords:['education','ielts','toeic','english','tiếng anh','học tiếng anh']
                    }}
                    
                />
            </View>
            <ScrollView

            >
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginVertical: 20
                    }}
                >
                    {
                        fieldList.length > 0 &&
                        fieldList.map((e, index) =>
                            <CardField
                                key={index.toString()}
                                label={e?.name}
                                image_path={e?.image}
                                onItemPress={() => _onNavigateToTopicList(e)}
                            />

                        )
                    }

                </View>

            </ScrollView>

        </>
    )
}

export default F_FlashCardFieldScreen

const styles = StyleSheet.create({})
