import React, { Component } from 'react'
import {
  Icon,
  TopNavigation,
  TopNavigationAction,
  Layout,
} from '@ui-kitten/components';
import { withNavigation } from 'react-navigation';

const BackIcon = (style) => (
  <Icon {...style} name='arrow-back' />
);

const CheckMarkIcon = (style) => (
  <Icon {...style} name='checkmark-circle-outline' />
);

const BackAction = (props) => (
  <TopNavigationAction {...props} icon={BackIcon} />
);

const CheckMarkAction = (props) => (
  <TopNavigationAction {...props} icon={CheckMarkIcon} />
);

const TopNavigationBarList = ({ navigation, route, withBackControl, isDisplayDoneButton, onNavigateDoneDetail }) => {
  const renderRightControls = () => {
    return isDisplayDoneButton ? [
      <CheckMarkAction onPress={() => {
        onNavigateDoneDetail()
      }} />
    ] : []
  }
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
        
        rightControls={renderRightControls()}
        leftControl={renderBackControls()}
      />
    </Layout>
  ) : (
      <Layout style={{ paddingTop: 21, paddingBottom: 0 }}>
        <TopNavigation
          
          rightControls={renderRightControls()}
        // leftControl={renderBackControls()}
        />
      </Layout>
    )
}

export default withNavigation(TopNavigationBarList)