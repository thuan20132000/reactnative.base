import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';




const CalendarProgress = ({
    markedDates = []
}) => {
    const getMarkdates = () => {

        let dates = {}
        markedDates?.map((e) => {
            let format = { endingDay: false, color: '#50cebb', textColor: 'white' }
            dates[e] = format
        })

        return dates
    }

    return (
        <View>
            <Calendar
                markingType={'period'}
                // markedDates={{

                //     '2021-08-25': { endingDay: false, color: '#50cebb', textColor: 'white' },
                //     '2021-08-28': { endingDay: false, color: '#50cebb', textColor: 'white' },
                //     '2021-08-29': { endingDay: false, color: '#50cebb', textColor: 'white' },
                //     '2021-08-20': { endingDay: false, color: '#50cebb', textColor: 'white' }

                // }}
                markedDates={getMarkdates()}
            />
        </View>
    )
}

export default CalendarProgress

const styles = StyleSheet.create({})
