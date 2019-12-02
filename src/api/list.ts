import { request } from '@tarojs/taro'
import { serverURL } from '../config'

const ListApi = {
  getNextPage: (data: any)=> {
    return request({
      url: `${serverURL}/messageList`,
      method: 'GET',
      data,
    })
  }
}

export default ListApi
