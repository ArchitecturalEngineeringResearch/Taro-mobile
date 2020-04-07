import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/mobx'
import 'taro-ui/dist/style/index.scss'

import deviceTypeStore from './store/deviceType'
import { BaiduApi } from './api'

// import './icon.scss'
import './app.scss'

const store = {
  deviceTypeStore,
}

class App extends Component {
  componentDidMount () {
    this.getbaidubceToken()
  }

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  config: Taro.Config = {
    pages: [
      'pages/list/list',
      'pages/record/record',
      'pages/user/user',
      'pages/createMessage/createMessage',
      'pages/deviceType/deviceType',
    ],
    permission: {
      'scope.userLocation': {
        desc: '位置将用于通知附近的浏览者'
      }
    },
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#FE7F2D',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'white',
      enablePullDownRefresh: true
    },
    tabBar:{
      color: '#000',
      selectedColor: '#FE7F2D',
      list: [
        {
          iconPath: 'resources/5048271.png',
          selectedIconPath: 'resources/504827.png',
          pagePath: 'pages/list/list',
          text: '主页',
        },
        {
          iconPath: 'resources/5048761.png',
          selectedIconPath: 'resources/504876.png',
          pagePath: 'pages/user/user',
          text: '我的',
        },
      ]
    }
  }

  private getbaidubceToken() {
    BaiduApi.access_token({
      'grant_type': 'client_credentials',
      'client_id': 'nMjd3oR1e6H6Vdgu8wK4bwIO', // api key
      'client_secret': 'pjO4G8A2MlmWcBheNK4CTG5BmyNxkLLq' // Secret Key
    }).then((res:any)=> {
      if(res.data.access_token) {
        Taro.setStorage({
          key: 'baidu_access_token',
          data: res.data
        })
      }
    })
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
