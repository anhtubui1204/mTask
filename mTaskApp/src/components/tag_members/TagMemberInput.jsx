import React, { Component, useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import axios from 'axios'
import * as url from '../../constants/url/url'
import {
  Icon,
  Input,
} from '@ui-kitten/components';
import OptionListing from './OptionListing'
import { useSelector } from 'react-redux';
import SelectedMembers from './SelectedMembers'

export default function TagMemberInput() {

  // input
  const [value, setValue] = useState('');
  const [searchResult, setSearchResult] = useState([])

  const searchMembers = async (searchTerm) => {
    setValue(searchTerm)
    try {
      var res = await axios.post(url.searchMembers, { searchTerm })
      setSearchResult(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  const renderIcon = (style) => (
    <Icon {...style} name={value ? 'close-outline' : 'corner-down-left-outline'} />
  );

  // const selectedMembersListing = selectedItems.map((unit, index)=> <Text key={index}>{unit.fName}</Text>)
  return (
    <View>
      {/* <SelectedMembers/> */}
      <View style={styles.inputContainer}>
        <Input
          autoFocus={true}
          value={value}
          placeholder='search members'
          style={styles.input}
          icon={renderIcon}
          onIconPress={() => setValue('')}
          onChangeText={searchMembers}
        />
      </View>
      <OptionListing data={searchResult} />
    </View>
  );

}

const styles = StyleSheet.create({
  inputContainer: {
    // borderTopWidth: 1.5,
    borderTopColor: "#ccc",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    width: '100%'
  },
  input: {
    flex: 1,
    height: 36,
    borderRadius: 36,
    paddingHorizontal: 15,
    backgroundColor: "#f1f1f1",
    marginHorizontal: 10
  },
})

// const [selectedItems, setSelectedItems] = React.useState([])
//   const [searchResult, setSearchResult] = React.useState(items)
//   const searchMembers = async (searchTerm) => {
//     try {
//       var resp = await axios.post(url.searchMembers, { searchTerm })
//       var data = resp.data
//       // console.log(searchTerm, 'search result: ', f)
//       data = restructureData(data)
//       loadToSearchResult(data)
//       // return data
//     } catch (err) {
//       console.error(err)
//     }

//   }
//   const loadToSearchResult = (data) => {
//     items[0]['children'] = data
//     console.log('loadToSearchResult: ', items)
//     setSearchResult(items)

//   }
//   const restructureData = (data) => {
//     data.map((unit) => {
//       unit.id = unit._id
//       unit.name = unit.fName + ' ' + unit.lName
//       delete unit._id
//       delete unit.fName
//       delete unit.lName
//       delete unit.email
//       return unit
//     })
//     console.log('restructure data: ', data)
//     return data
//   }