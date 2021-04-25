import React from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import CommonColor from '../../utils/CommonColor'

const S_ContributionScreen = (props) => {


    const _onSendContribution = async () => {
        console.warn('fsa')
    }

    return (
        <View>
            <View
                style={[styles.inputGroup]}
            >
                <Text
                    style={[styles.inputLabel]}
                >
                    Thông tin đóng góp
                </Text>
                <View>
                    <TextInput
                        style={[
                            styles.input
                        ]}
                        placeholder={'Nhập thông tin liên hệ'}
                        placeholderTextColor={'grey'}

                    />
                </View>
            </View>
            <View
                style={[styles.inputGroup]}
            >
                <Text
                    style={[styles.inputLabel]}
                >
                    Nội dung đóng góp
                </Text>
                <View>
                    <TextInput
                        style={[
                            styles.input,
                            {
                                textAlign: 'left',
                            }
                        ]}
                        placeholder={'Nhập thông tin liên hệ'}
                        placeholderTextColor={'grey'}
                        multiline={true}
                        numberOfLines={6}
                        textAlignVertical={'top'}
                    />
                </View>
            </View>

            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <TouchableOpacity
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        backgroundColor: CommonColor.btnSubmit,
                        padding: 12,
                        minWidth: 120,
                        borderRadius:6,
                        marginVertical:12
                    }}
                    onPress={_onSendContribution}
                    
                >
                    <Text
                        style={{
                            color: 'white',
                            textAlign: 'center',
                            fontSize:16,
                            fontWeight:'700'
                        }}
                    >
                        Gửi
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default S_ContributionScreen

const styles = StyleSheet.create({
    input: {
        marginHorizontal: 6,
        borderRadius: 4,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.36,
        shadowRadius: 4.68,

        elevation: 3,
        paddingHorizontal: 12
    },
    inputLabel: {
        fontSize: 16,
        marginHorizontal: 6,
        marginBottom: 4,
        color: 'grey'
    },
    inputGroup: {
        marginVertical: 6,
    }
})
