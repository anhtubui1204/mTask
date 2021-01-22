import React, { useEffect } from 'react'
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native'
import { CheckBox } from '@ui-kitten/components';
import { useDispatch, useSelector } from 'react-redux'

import { removeFromSelectedAction, sendToSelectedAction } from '../../actions/tag-members-actions'

export default function SingleOption({ unit }) {
    const [checked, setChecked] = React.useState(false);
    const dispatch = useDispatch()
    const selectedItems = useSelector(state => state.tagMemberReducer.selectedItems, [])
    const task = useSelector(state => state.taskReducer.taskItem, []);
    var idArr = selectedItems.map(unit => unit = unit._id)
    const idTagged = task.taggedUsers ? task.taggedUsers.map(unit => unit = unit._id) : []

    // console.log(checked)
    const sendToSelected = (items) => dispatch(sendToSelectedAction(items))
    const removeFromSelected = (items) => dispatch(removeFromSelectedAction(items))

    const onCheckedChange = (isChecked) => {
        isChecked ? sendToSelected(unit) : removeFromSelected(unit)
        setChecked(isChecked);
    };

    useEffect(() => {
        // setChecked(false)

        if (idArr.includes(unit._id) || idTagged.includes(unit._id)) {
            setChecked(true)
        } else {setChecked(false)}
    }, [unit])

    // console.log('single option props: ', props)
    const { fName, lName } = unit
    const fullName = fName + ' ' + lName

    return (
        <React.Fragment>
            <TouchableOpacity
                onPress={() => console.log(unit.fName)}
                style={styles.searchUserItem}
            >
                <View style={{ flexDirection: 'row', justifyContent: "space-between", paddingLeft: 15 }}>
                    <Text style={{ fontSize: 16 }}>{fullName}</Text>
                    <CheckBox
                    style={styles.checkbox}
                    checked={checked}
                    onChange={onCheckedChange}
                    />
                </View>
            </TouchableOpacity>
            
        </React.Fragment>
    )
}

const styles = StyleSheet.create({
    searchUserItem: {
        paddingVertical: 15,
        backgroundColor: '#EEF7FA',
        marginHorizontal: 20,
        marginVertical: 5,
        borderRadius: 25
    },
    checkbox: {
        marginRight: 20,
      }
})