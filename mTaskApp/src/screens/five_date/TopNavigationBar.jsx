import React, { Component } from 'react'
import {
  Icon,
  TopNavigation,
  TopNavigationAction,
  Layout
} from '@ui-kitten/components';
import { StyleSheet } from 'react-native'
import { withNavigation } from 'react-navigation';

const BackIcon = (style) => (
  <Icon {...style} name='arrow-back' />
);

const CalendarIcon = (style) => (
  <Icon {...style} name='calendar-outline' />
);

const CheckMarkIcon = (style) => (
  <Icon {...style} name='checkmark-circle-outline' />
);

const BackAction = (props) => (
  <TopNavigationAction {...props} icon={BackIcon} />
);

const CalendarAction = (props) => (
  <TopNavigationAction {...props} icon={CalendarIcon} />
);

const CheckMarkAction = (props) => (
  <TopNavigationAction {...props} icon={CheckMarkIcon} />
);

const TopNavigationBar = ({ navigation, route, withBackControl }) => {
  // console.log(props)
  const renderRightControls = () => [
    <CalendarAction onPress={() => { navigation.navigate('CalendarOverview') }} />,
    <CheckMarkAction onPress={() => { navigation.navigate('DoneListOverview') }} />,
  ];
  const renderBackControls = () => [
    <BackAction
      onPress={() => {
        navigation.goBack()
      }}
    />
  ]
  return withBackControl ? (
    <Layout style={{ paddingTop: 21, paddingBottom: 0 }}>
      <TopNavigation
        // titleStyle = {styles.titleStyle}
        // title='Five Days List'
        rightControls={renderRightControls()}
        leftControl={renderBackControls()}
      />
    </Layout>
  ) : (
      <Layout style={{ paddingTop: 21, paddingBottom: 0 }}>

        <TopNavigation
          // style={styles.topNavigation}
          // titleStyle = {styles.titleStyle}
          // title='Five Days List'
          rightControls={renderRightControls()}
        />
      </Layout>
    )
}

export default withNavigation(TopNavigationBar)

const styles = StyleSheet.create({
  // topNavigation: { 
  //   backgroundColor: 'gray',
  //   // paddingVertical: 20,
  //   marginVertical: 10,
  //   height: 100,
  //   justifyContent: 'center'
  // },
  // titleStyle: {
  //   color: '#EDF1F7',
  //   fontSize: 36,
  //   paddingVertical: 20,
  //   alignSelf: 'center'
  // }
})