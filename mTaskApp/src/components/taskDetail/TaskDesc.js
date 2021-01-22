import React, { useState } from 'react'
import { StyleSheet,  View, TouchableHighlight, TouchableOpacity } from 'react-native'
import { Ionicons, AntDesign, FontAwesome, Feather, Foundation, MaterialIcons } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import { Input, Button ,Text} from '@ui-kitten/components';

const TaskDesc = ({ addType, isSaveDesc, saveDesc, desc, setDesc }) => {

    const [modalVisible, setModalVisible] = useState(false)

    const OpenDesc = () => {
        switch (addType) {
            case 'button':
                return (
                    <TouchableOpacity
                        // style={styles.openButton}
                        onPress={() => setModalVisible(true)}
                    >
                        <MaterialIcons name="text-fields" size={22} color="black" />
                    </TouchableOpacity>
                )
            case 'input':
                return (
                    <View style={styles.descInputStyle}>
                        {desc !== '' ? (
                            <TouchableOpacity onPress={() => setModalVisible(true)}>
                                <Text category='s1'>{desc}</Text>
                            </TouchableOpacity>
                        ) : (
                                <TouchableOpacity onPress={() => setModalVisible(true)}>
                                    <Text>Add Description</Text>
                                </TouchableOpacity>
                            )}
                    </View>
                )
            default:

        }
    }

    return (
        <View>
            <OpenDesc />
            <Modal
                isVisible={modalVisible}
                backdropColor='black'
                backdropOpacity={0.8}
                // hasBackdrop={false}
                onBackdropPress={() => setModalVisible(false)}

            >
                <View style={{ marginVertical: 15 }}>
                    <View style={[styles.modalView, styles.shadowContainer]} >
                        <Input
                            value={desc}
                            onChangeText={setDesc}
                            multiline={true}
                            textStyle={{ minHeight: 86 }}
                            placeholder='Add Description ...'
                        // {...multilineInputState}
                        />
                        <Button
                            style={{backgroundColor: '#1E262C'}} 
                            onPress={() => {
                            setModalVisible(false)
                            if (isSaveDesc && desc !== '') saveDesc()
                        }} >Add Description</Button>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default TaskDesc

const styles = StyleSheet.create({
    openButton: {
        backgroundColor: "#D1D5D8",
        borderRadius: 5,
        paddingRight: 25,
        paddingLeft: 5,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-around'
        // width: 150
    },
    textStyle: {
        // color: "white",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        alignSelf: 'center'
    },
    shadowContainer: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    modalView: {
        backgroundColor: 'white',
        paddingBottom: 5,
        paddingTop: 10,
        paddingHorizontal: 15,
        borderRadius: 8
    },
    descInputStyle: {
        justifyContent: 'center',
        paddingBottom: 10
    }
})
