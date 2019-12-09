import { request } from '@tarojs/taro'
import { serverURL } from '../config'

const MessageApi = {
  createMessage: (data: any)=> {
    return request({
      url: `${serverURL}/messageList/createMessage`,
      method: 'POST',
      data,
    })
  }
}

export default MessageApi
