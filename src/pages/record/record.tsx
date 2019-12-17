import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer } from '@tarojs/mobx'

import './record.scss'

type PageStateProps = {

}

interface Record {
  props: PageStateProps;
}

interface IListProps {

}

interface IListState {
  recordDatas: Array<any>
}

@observer
class Record extends Component<IListProps, IListState> {

  constructor(props){
    super(props)
    this.state = {
      recordDatas: []
    }
  }

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
        <View className="record-item">
          <View className='record-item-content'>
            <View className="record-item__info-title"></View>
            <View className="record-item__info-note"></View>
          </View>
          <View className="record-item-extra"></View>
        </View>
      </View>
    )
  }
}

export default Record  as ComponentType
