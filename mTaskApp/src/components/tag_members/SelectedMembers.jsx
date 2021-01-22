import React, { useState, useEffect } from 'react'
import {Text} from 'react-native'
import SingleOption from './SingleOption'
import {connect} from 'react-redux'

class SelectedMembers extends React.Component{
    constructor(props){
        super(props)
        this.state={
            selectedMemListing: this.props.selectedItems.map((unit, i)=><Text key={i}>{unit.fName}</Text>)
        }
    }
    componentWillReceiveProps(nextProps){
        if (nextProps.selectedItems !== this.props.selectedItems) {
            this.setState({
                selectedMemListing: this.props.selectedItems.map((unit, i)=><Text key={i}>{unit.fName}</Text>)
            });
          }
    }
    render(){
    console.log('map state to props selected items IN SELECTEDMEMBERS: ', this.props.selectedItems)
    const selectedMemListing = this.props.selectedItems.map((unit, i)=><Text key={i}>{unit.fName}</Text>)
        return(
            <React.Fragment>
                {this.state.selectedMemListing}
            </React.Fragment>
        )
    }
    
}
const mapStateToProps = state=>{
    console.log('mapStateToProps state in SELECTEDMEMBERS', state.tagMemberReducer.selectedItems)
    return{
        selectedItems : state.tagMemberReducer.selectedItems
    }
}
export default connect(mapStateToProps)(SelectedMembers)
