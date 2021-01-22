import React, { Component } from 'react'
import {Layout, Text } from '@ui-kitten/components';
import OnSpecificDateList from '../../components/list/on_specific_date/OnSpecificDateList'
import {
    StyleSheet,
    View,
  } from 'react-native';
import TopNavigationBarBackButton from '../../components/cores/TopNavigationBarBackButton'
import CalendarOverview from '../../components/calendar/Calendar'
export default class CalendarOverviewScreen extends Component {
    render() {
        return (
            <Layout  style={styles.screen}>
                <TopNavigationBarBackButton {...this.props} title='Calendar Overview'/>
                <CalendarOverview />
                <OnSpecificDateList/>

            </Layout>
        )
    }
}
const styles = StyleSheet.create({
    screen: {
      paddingTop: 16, 
      // paddingBottom: 20,
      flex: 1
    },
  });