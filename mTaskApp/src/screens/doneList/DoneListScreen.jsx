import React, { Component } from 'react';
import { Layout, Text, Button } from '@ui-kitten/components';
import TopNavigationBarBackButton from '../../components/cores/TopNavigationBarBackButton';
import { Modal, FlatList, StyleSheet, View, ActivityIndicator, TouchableOpacity, SectionList, AsyncStorage } from 'react-native';
import Timeago from './TimeAgo';
import Timeformat from './TimeFormat';
import _ from 'lodash'
import moment from 'moment';




export default class DoneListScreen extends Component {

    constructor() {
        super();
        this.state = {
            isLoading: true,
            dataSource: [],
            show: false,
            selectedItemName: '',
            selectedItemId: '',
            selectedDescription: '',
            selectedCompletedDate: '',
            selectedTaggedFriend: [],
            userId:'',

        }
    }

    componentDidMount() {
        AsyncStorage.getItem("userId")
        .then((value) => {
            this.setState({userId: value});
            console.log(value)

            fetch(`https://bigquery-project-medium.df.r.appspot.com/tasks-by-user-id/${value}`)
            .then((response) => response.json())
            .then(dataSource => {
                this.setState({ dataSource: dataSource.filter(d => d.completed === true) })
                // this.setState({ dataSource: dataSource.filter(d => d.creatorId == this.state.userId) })
            })
        })
        
        // return fetch('https://bigquery-project-medium.df.r.appspot.com/task')
        //     .then((response) => response.json())

        //     .then(dataSource => {
        //         this.setState({ dataSource: dataSource.filter(d => d.completed === true) })
        //         this.setState({ dataSource: dataSource.filter(d => d.creatorId == this.state.userId) })
        //     })
    }

    renderHeader = ({ section }) => {
        return (
            <View style={styles.header} >
                <Text style={{ fontSize: 20, color: '#6375df', fontWeight:'bold' }}>{section.title}</Text>
            </View>
        )
    }

    _renderItem = ({ item }) => {
        const taggedList = this.state.selectedTaggedFriend.map((i, index) =>
            <Text key={index} style={{ fontSize: 15, textAlign: "center" }}>{i.fName}</Text>
        )
        return (

            <View>

                <Modal
                    
                    transparent={true}
                    visible={this.state.show}
                >

                    <View style={{ backgroundColor: "#000000aa", flex: 1 }}>
                        <View style={{ backgroundColor: "#ffffff", marginHorizontal: 50, marginVertical: 100, padding: 40, borderRadius: 10, flex: 1 }}>
                            <View style={{ marginBottom: 20 }}>
                                <Text style={{ fontSize: 20, textAlign: "center" }}>Task Title</Text>
                                <Text style={{ fontSize: 15, textAlign: "center" }}>{this.state.selectedItemName}</Text>
                            </View>

                            <View style={{ marginBottom: 20 }}>
                                <Text style={{ fontSize: 20, textAlign: "center" }}>Description</Text>
                                <Text style={{ fontSize: 15, textAlign: "center" }}>{this.state.selectedDescription}</Text>
                            </View>

                            <View style={{ marginBottom: 20 }}>
                                <Text style={{ fontSize: 20, textAlign: "center" }}>Completed Time</Text>
                                <Timeformat time={this.state.selectedCompletedDate} />
                            </View>

                            {this.state.selectedTaggedFriend.length !== 0 && (
                                <View style={{ marginBottom: 20 }}>
                                    <Text style={{ fontSize: 20, textAlign: "center" }}>Tagged Friend</Text>
                                    {taggedList}
                                </View>
                            )}

                            <View style={{ marginLeft: '50%', marginBottom: 36, position: 'absolute', bottom: 0 }}>
                                <Button onPress={() => { this.setState({ show: false }) }}>Back</Button>
                            </View>

                        </View>
                    </View>
                </Modal>

                <TouchableOpacity onPress={() => {
                    this.setState(
                        {
                            show: true, selectedItemId: item._id, selectedItemName: item.name, selectedDescription: item.description, selectedCompletedDate: item.dateTime,
                            selectedTaggedFriend: item.taggedUsers ? item.taggedUsers : []
                        })
                }}
                >

                    <View style={styles.item}>
                        <Text style={{ fontSize: 18, fontWeight: "bold", }}>{item.name}</Text>
                        <Text style={{ fontSize: 15 }}><Timeago time={item.dateTime} /></Text>
                    </View>
                </TouchableOpacity>

            </View>

        )
    };



    render() {

        console.log('run')
        const sortbyDate = this.state.dataSource.sort((first, second) => {
            return new Date(second.dateTime).getTime() - new Date(first.dateTime).getTime();
        });

        const groupbydate = _.groupBy(sortbyDate, task => moment(task.dateTime).format('MMMM Do YYYY'))
        const newList = _.reduce(groupbydate, (acc, next, index) => {
            acc.push({
                title: index,
                data: next
            })
            return acc
        }, [])

        return (

            <Layout style={{ paddingTop: 16, paddingBottom: 0 }}>
                <View style={{ marginVertical: 10, borderBottomColor: 'black' }}>
                    <TopNavigationBarBackButton {...this.props} title='Back' />

                </View>
                <Text style={{ textAlign: "center", fontWeight:'bold' }} category='h1'>Done List</Text>

                <View style={{ paddingBottom: '22%' }}>

                    {/* <FlatList 
                //Try to sort the data by date
                    data={sortbyDate}
                    renderItem={this._renderItem}
                    keyExtractor={i => i._id}
                 />
              */}

                    <SectionList

                        sections={newList}
                        renderSectionHeader={this.renderHeader}
                        renderItem={this._renderItem}
                        keyExtractor={item => item._id}
                    />


                </View>
            </Layout>

        )
    }
}

const styles = StyleSheet.create({

    item: {
        padding: 10,
        borderBottomWidth: 2,
        borderBottomColor: '#ccc',
        marginLeft: 10,
        marginRight: 10,

    },
    header: {
        paddingTop: 20,
        paddingLeft: 10,
        backgroundColor: 'white',
        paddingBottom: 3,

    }
});