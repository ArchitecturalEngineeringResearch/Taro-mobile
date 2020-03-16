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
  getUploadToken: (accessKey: string , secretKey: string, scope: string)=> {
    return request({
      url: `${serverURL}/messageList/uploadToken`,
      method: 'GET',
      data: {
        accessKey,
        secretKey,
        scope
      },
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
