import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { getFieldsList, getFieldTopic } from '../../utils/api_v1'
import CommonImages from '../../utils/CommonImages'
import CardField from './components/CardField'


const F_FlashCardFieldScreen = (props) => {

    const [fieldList, setFieldList] = useState([]);
    const [isLoading,setIsLoading] = useState(false);


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
    }, []);


    const _onNavigateToTopicList = async (field) => {
        props.navigation.navigate('FlashCardTopic',{
            field:field
        });
        // getFieldTopic(field.id)
        //     .then((data) => console.warn(data))
            

    }

    return (
        <ScrollView

        >
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'flex-start'
                }}
            >
                {
                    fieldList.length > 0 &&
                    fieldList.map((e, index) =>
                        <CardField
                            key={index.toString()}
                            label={e?.name}
                            image_url={e?.image}
                            onItemPress={()=>_onNavigateToTopicList(e)}
                        />

                    )
                }
            </View>
        </ScrollView>
    )
}

export default F_FlashCardFieldScreen

const styles = StyleSheet.create({})
