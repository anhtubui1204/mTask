import axios from 'axios'
import * as url from '../../../constants/url/url'
import { AsyncStorage } from 'react-native'
const savePushToken = async (expoPushToken)=>{
    var userId = await AsyncStorage.getItem('userId')
    var resp = await axios.post(url.saveExpoPushToken + '/' + userId, {expoPushToken})
}

export default savePushToken