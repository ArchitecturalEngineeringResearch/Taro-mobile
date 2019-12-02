import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import { AtAvatar, AtDivider } from 'taro-ui'

import './user.scss'

@observer
class User extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '首页'
  }

  componentWillMount () { }

  componentWillReact () {
    console.log('componentWillReact')
  }

  componentDidMount () {
    Taro.setNavigationBarTitle({
      title: '我的'
    })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='user'>
        <AtDivider content='LenLee' fontColor='#2d8cf0' lineColor='#2d8cf0' />
        <View className='at-row at-row__justify--center'>
          <AtAvatar
            circle
            image='https://jdc.jd.com/img/200'
            size='large'
          />
        </View>
      </View>
    )
  }
}

export default User  as ComponentType
