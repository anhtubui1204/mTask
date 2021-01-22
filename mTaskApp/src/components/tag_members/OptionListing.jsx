import React, { useState, useEffect } from 'react'
import {Text, ScrollView, View} from 'react-native'
import SingleOption from './SingleOption'
import {useSelector} from 'react-redux'

export default function OptionListing(props){
     const data = useSelector(state => state.tagMemberReducer.selectedItems, [])
    // console.log('map state to props selected items: ', this.props.selectedItems)
    const selectedMemListing = data.map((unit, i)=><Text key={i}>{unit.fName}</Text>)
        return(
            <React.Fragment>
                {/* {selectedMemListing} */}
                
                <ScrollView>
                    <View style={{
                        padding: 10,
                        marginBottom: 20
                    }}>
                        {props.data.map((unit, i)=> <SingleOption  unit={unit} key={i}/>)}
                    </View>
                </ScrollView>
            </React.Fragment>
        )
}
