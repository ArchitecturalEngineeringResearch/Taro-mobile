import Taro, { Component, Config } from '@tarojs/taro'
import { Provider } from '@tarojs/mobx'

import counterStore from './store/counter'
import 'taro-ui/dist/style/index.scss'

import './icon.scss'
import './app.scss'
import CreateMessage from './pages/createMessage/createMessage'

const store = {
  counterStore
}

class App extends Component {
  config: Config = {
    pages: [
      'pages/list/list',
      'pages/createMessage/createMessage',
      'pages/user/user',
      'pages/deviceType/deviceType',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar:{
      selectedColor: '#6190e8',
      list: [
        {
          pagePath: 'pages/list/list',
          text: '列表',
        },
        {
          pagePath: 'pages/user/user',
          text: '我的',
        },
      ]
    }
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <CreateMessage/>
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
