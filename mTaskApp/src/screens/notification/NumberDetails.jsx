import React, { useEffect } from 'react'
import { Text, Icon } from '@ui-kitten/components'
import { View, StyleSheet } from 'react-native'
export default function NumberDetails(props) {
    const count = (type) => {
        var num = 0
        for (let i = 0; i < props.task.taggedUsers.length; i++) {
            var userObj = props.task.taggedUsers[i]
            if (userObj[type] === true) {
                num += 1
            }
        }
        if (type === 'isAccepted') props.setNumberOfAccept(num)
        else props.setNumberOfDecline(num)

        return num
    }

    useEffect(() => {

        // props.setNumberOfAccept(props.numberOfAccept)


    }, [props])


    return (
        <>
            <View style={styles.spacingStyle}>
                <Icon name='people-outline' width={20} height={20} fill='#3366FF' />
                <Text style={styles.textStyle}>{props.task.taggedUsers.length}</Text>
            </View>
            
            <View style={styles.spacingStyle}>
                <Icon name='checkmark-outline' width={20} height={20} fill='#3366FF' />
                <Text style={styles.textStyle}>{count('isAccepted')}</Text>
            </View>

            <View style={styles.spacingStyle}>
                <Icon name='close-outline' width={20} height={20} fill='#3366FF' />
                <Text style={styles.textStyle}>{props.numberOfDecline}</Text>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    spacingStyle: {
        flexDirection: 'row'
    },
    textStyle:{
        paddingHorizontal: 10
    }
})