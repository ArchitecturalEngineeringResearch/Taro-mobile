import { request } from '@tarojs/taro'

const BaiduApi = {
  access_token: (data: any)=> {
    return request({
      url: 'https://aip.baidubce.com/oauth/2.0/token',
      method: 'GET',
      data,
    })
  },
  user_defined: (imgUrl: string, token:string)=> {
    return request({
      url: `https://aip.baidubce.com/rest/2.0/solution/v1/img_censor/v2/user_defined?access_token=${token}`,
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        imgUrl
      }
    })
  }
}

export default BaiduApi
