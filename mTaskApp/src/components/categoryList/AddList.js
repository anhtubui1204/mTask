import React, {useState, useEffect} from 'react'
import { StyleSheet, View, AsyncStorage } from 'react-native'
import { Layout, Text, Input, Button, Icon } from '@ui-kitten/components';

const AddList = ({submitHandler}) => {
    const [userId, setUserId] = useState('')
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')

    const ListData = {
        name: name,
        description: desc,
        creatorId: userId
    }

    const getUserId = async () => {
        try {
            let id = await AsyncStorage.getItem('userId')
            setUserId(id)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getUserId()
    }, [])

    return (
        <View style={styles.containter}>
            <View style={styles.inputGroup}>
                <Input
                    autoFocus={true}
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    placeholder='New List ...'
                />
            </View>
            <View style={styles.inputGroup}>
                <Input
                    style={[styles.input]}
                    value={desc}
                    onChangeText={setDesc}
                    placeholder='Description'
                />
            </View>
            <View style={{ paddingTop: 8 }}>
                <Button style={styles.submitButton} onPress={() => submitHandler(ListData)}>Add</Button>
            </View>
        </View>
    )
}

export default AddList

const styles = StyleSheet.create({
    containter: {
        marginTop: 10,
        // flex:1
    },
    input: {
        // marginVertical: 3,
        marginHorizontal: 10,
        // flex: 1
    },
    submitButton: {
        justifyContent: 'center',
        margin: 8,
        backgroundColor: '#1E262C',
        borderStartColor: "transparent"
    },
    inputGroup: {
        // width: '100%',
        paddingBottom: 8,
        // position: 'relative'
    },
})
