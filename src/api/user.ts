import { request } from '@tarojs/taro'
import { serverURL } from '../config'

const UserApi = {
  login: (data: any)=> {
    return request({
      url: `${serverURL}/user/onLogin`,
      method: 'POST',
      data,
    })
  }
}

export default UserApi
