import React from 'react'
import {Layout } from '@ui-kitten/components';
import NotificationListing from './NotificationListing'
export default function NotificationScreen (props){
    return(
        <Layout style={{ flex: 1}}>
            <NotificationListing {...props}/>
        </Layout>
    )
}



  