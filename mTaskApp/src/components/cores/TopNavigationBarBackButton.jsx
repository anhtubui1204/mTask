import React, { Component } from 'react'
import {
    Icon,
    TopNavigation,
    TopNavigationAction,
  } from '@ui-kitten/components';
import { withNavigation } from 'react-navigation';
  
/**
 * With Back Button
 * @param {*} style 
 */
  const BackIcon = (style) => (
    <Icon {...style} name='arrow-back'/>
  );

  
  const BackAction = (props) => (
    <TopNavigationAction {...props} icon={BackIcon}/>
  );

 class TopNavigationBarBackButton extends Component {
    render() {
      const renderLeftControls = () => [
        <BackAction onPress={()=> this.props.navigation.goBack()}/>
      ];  
      const renderRightControls = () => this.props.rightControls
        return (
            <TopNavigation
                title={this.props.title}
                leftControl={renderLeftControls()}
                rightControls={renderRightControls()}
            />
        )
    }
}
export default withNavigation(TopNavigationBarBackButton)