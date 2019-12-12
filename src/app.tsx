import Taro, { Component, Config } from '@tarojs/taro'
import { Provider } from '@tarojs/mobx'

import deviceTypeStore from './store/deviceType'
import 'taro-ui/dist/style/index.scss'

import './icon.scss'
import './app.scss'

const store = {
  deviceTypeStore,
}

class App extends Component {
  config: Config = {
    pages: [
      'pages/list/list',
      'pages/createMessage/createMessage',
      'pages/user/user',
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
      navigationBarTextStyle: 'white'
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

  componentDidMount () {
  }

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

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
