import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtList, AtListItem } from "taro-ui"
import { observer, inject } from '@tarojs/mobx'

import './record.scss'

type PageStateProps = {

}

interface Record {
  props: PageStateProps;
}

interface IListProps {

}

interface IListState {

}

@observer
class Record extends Component<IListProps, IListState> {

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

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='record'>
        <AtList>
          <AtListItem
            note='描述信息'
            title='标题文字标题文字标题文字标题文字标题文字'
            extraText='详细信息详细信息详细信息详细信息'
          />
        </AtList>
      </View>
    )
  }
}

export default Record  as ComponentType
