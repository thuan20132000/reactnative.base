import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { BOXSHADOW, COLORS, FONTS, SIZES } from '../../app/constants/themes'
import { WebView } from 'react-native-webview';
import GrammarAPI from '../../app/API/GrammarAPI';

const GrammarDescriptionScreen = (props) => {




    const { item } = props.route?.params;
    const [grammarDescription,setGrammarDescription] = React.useState(null);


    React.useLayoutEffect(() => {
        props.navigation.setOptions({
            title:item?.name
        })
        props.navigation.dangerouslyGetParent().setOptions({
            tabBarVisible: false,
        })

        return () => {
            props.navigation.dangerouslyGetParent().setOptions({
                tabBarVisible: true
            })
        }
    }, []);


    const _onGrammarExcercisePress = () => {
        if(item){
            props.navigation.push('GrammarExcerciseScreen',{
                item:item
            });
        }
    }

    React.useEffect(() => {
        GrammarAPI.getGrammarDescription(item?.id)
            .then(res => {
                if(res.status_code === 200){
                    setGrammarDescription(res?.data);
                }
            })
            .catch((err) => {
                console.log('error: ', err)
            })
    }, [])

    return (
        <View
            style={{
                display: 'flex',
                flex: 1,
                backgroundColor: COLORS.white,

            }}
        >
            <WebView
                originWhitelist={['*']}
                source={{ html: grammarDescription?.body }}
                style={{
                    paddingHorizontal: 6
                }}
            />



            <View
                style={{
                    position: 'absolute',
                    bottom: 6,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center'
                }}
            >
                <TouchableOpacity
                    style={{
                        backgroundColor: COLORS.primary,
                        padding: 8,
                        borderRadius: SIZES.base,
                        ...BOXSHADOW.normal,
                    }}
                    onPress={_onGrammarExcercisePress}
                >
                    <Text style={[{ color: COLORS.white }, FONTS.h4]}>Luyện Tập</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default GrammarDescriptionScreen

const styles = StyleSheet.create({})
