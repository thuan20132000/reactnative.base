import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, View, SafeAreaView } from 'react-native'
import { getFieldsList, getFieldTopic } from '../../utils/api_v1'
import CommonImages from '../../utils/CommonImages'
import CardField from './components/CardField'
import { BannerAd, BannerAdSize, TestIds } from '@react-native-firebase/admob';
import config from '../../app/constants/config';
import FieldModel from '../../app/models/fieldModel'
const adUnitId = __DEV__ ? TestIds.BANNER : config.adbmod_android_app_id;

import QuizAPI from '../../app/API/QuizAPI'
import Field from '../../app/DB/Field'

const F_FlashCardFieldScreen = (props) => {

    const [fieldList, setFieldList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    React.useEffect(() => {

        props.navigation.setOptions({
            headerShown: false
        })

        let field = new Field()
        field.getAllFields(function(success){
            console.log('success: ',success)
        })
    }, []);


    const _onNavigateToTopicList = async (fieldData) => {

        props.navigation.navigate('FlashCardTopic', {
            field: fieldData
        });

    }


    React.useEffect(() => {
        QuizAPI.getAllField().then(res => {
            if (res?.status_code === 200) {
                let fieldListData = [];
                res.data?.forEach(element => {
                    let field = new FieldModel(element);
                    fieldListData = [...fieldListData, field];
                });
                setFieldList(fieldListData)
            }
        })

    }, []);

    return (
        <SafeAreaView>
            <View
                style={{
                    display: 'flex',
                    alignSelf: 'center',
                    paddingVertical: 8
                }}
            >
                {
                    adUnitId &&
                    <BannerAd
                        unitId={adUnitId}
                        size={BannerAdSize.BANNER}
                        requestOptions={{
                            requestNonPersonalizedAdsOnly: true,
                            keywords: ['education', 'ielts']
                        }}

                    />

                }
            </View>
            <ScrollView

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


            </ScrollView>

        </SafeAreaView>
    )
}

export default F_FlashCardFieldScreen

const styles = StyleSheet.create({})
