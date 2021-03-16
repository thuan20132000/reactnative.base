import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { Chip } from 'react-native-paper';
import CommonColor from '../../utils/CommonColor'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import CommonIcons from '../../utils/CommonIcons';

const D_WordDefinitionScreen = (props) => {


    const { wordDefinition,wordExplaination } = props;

    return (
        <View style={styles.container}>
            <ScrollView>

                <View style={styles.header}>

                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                        <Text style={{ color: 'white', fontSize: 26, fontFamily: 'Roboto', fontWeight: '600' }}>{wordDefinition?.name}</Text>
                        <Chip style={{ backgroundColor: '#0DA6E4', marginHorizontal: 10, justifyContent: 'center' }}
                            onPress={() => console.log('Pressed')}
                        >
                            <Text style={{ fontSize: 14, fontWeight: '600', color: 'white' }}>{wordDefinition?.type}</Text>
                        </Chip>

                    </View>

                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                        <View style={{ display: 'flex', justifyContent: 'space-around' }}>
                            <Text style={styles.textPronunciation}><Text style={{ color: '#DF330F', backgroundColor: '#F2C827' }}>us</Text>{wordDefinition?.pronunciation_us}</Text>
                            <Text style={styles.textPronunciation}><Text style={{ color: 'white', backgroundColor: '#E16624' }}>uk</Text>{wordDefinition?.pronunciation_uk}</Text>
                        </View>
                        <View>
                            <MaterialCommunityIcon style={{ backgroundColor: CommonColor.secondary }}
                                icon={CommonIcons.arrowRight}
                                color={CommonColor.secondary}
                                size={26}
                            />
                            <MaterialCommunityIcon style={{ backgroundColor: CommonColor.secondary }}
                                icon={CommonIcons.arrowRightChevron}
                                color={CommonColor.secondary}
                                size={26}
                            />
                        </View>

                    </View>

                </View>

                <View style={styles.body}>

                    {
                        wordExplaination &&
                        wordExplaination.map((ex, index) =>
                            <View style={{ width: '100%', paddingBottom: 12 }} key={index}>
                                <View style={styles.explaination}>
                                    {/* <Text style={{...styles.textExplainTitle},[{color:'white',fontSize:22,marginRight:6}]}>
                                           {index+1} 
                                        </Text> */}
                                    <Text style={styles.textExplainTitle}><Icon name={'star'} color='yellow' />{ex.title} </Text>
                                </View>
                                <View style={styles.explainExample}>
                                    {ex.example.map((e, index) => <Text key={index} style={styles.textExplainExample}> - {e}</Text>)}
                                </View>
                            </View>

                        )
                    }


                </View>
            </ScrollView>

        </View>
    )
}

export default D_WordDefinitionScreen

const styles = StyleSheet.create({

    header: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        alignItems: 'flex-start',
        margin: 6,
        borderRadius: 22,
        backgroundColor: '#435E7D',
        paddingVertical: 6,
        paddingLeft: 22,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.33,
        shadowRadius: 2.97,

        elevation: 21,
    },
    textName: {
        fontSize: 28,
        color: 'white',
        fontWeight: '500'
    },
    textPronunciation: {
        fontSize: 16,
        color: 'white'
    },
    body: {
        padding: 4,
        margin: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.33,
        shadowRadius: 2.97,

        elevation: 21,
    },
    textExplainTitle: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'Roboto',
        padding: 8

    },
    textExplainExample: {
        color: 'black',
        paddingLeft: 20,
        fontSize: 18,
        fontStyle: 'italic',
        paddingVertical: 4
    },
    explainExample: {
    },
    explaination: {
        // display:'flex',
        // flexDirection:'row',
        // alignItems:'flex-start',
        backgroundColor: '#536983',
        padding: 6,
        borderRadius: 8
    }
})
