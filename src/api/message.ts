import { request } from '@tarojs/taro'
import { serverURL } from '../config'

const MessageApi = {
  createMessage: (data: any)=> {
    return request({
      url: `${serverURL}/messageList/createMessage`,
      method: 'POST',
      data,
    })
  },
  getHistory: (data: any)=> {
    return request({
      url: `${serverURL}/messageList/history`,
      method: 'GET',
      data,
    })
  },
  remove: (data: any)=> {
    return request({
      url: `${serverURL}/messageList/${data}`,
      method: 'DELETE',
    })
  }
}

export default MessageApi
