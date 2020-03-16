import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtButton, AtModal } from 'taro-ui'
import { observer } from '@tarojs/mobx'

import './record.scss'

type PageStateProps = {

}

interface ICard {
  created: string,
  type: string,
  title: string,
  description: string,
  status: 'NEED' | 'IDLE',
}


interface Record {
  props: PageStateProps;
}

interface IListProps {

}

interface IListState {
  recordDatas: Array<ICard>,
  removeAtModal: boolean
  current: any
}

@observer
class Record extends Component<IListProps, IListState> {

  constructor(props){
    super(props)
    this.state = {
      removeAtModal: false,
      current: {},
      recordDatas: [{
        title: '我叫李耀',
        created: '2019-10-21',
        description: '我需要一个台挖掘机我需要一个台挖掘机我需要一个台挖掘机我需要一个台挖掘机我需要一个台挖掘机',
        type: '小型挖掘机',
        status: 'NEED',
      }]
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
    navigationBarTitleText: '已发帖子'
  }

  componentWillMount () { }

  componentWillReact () {
    console.log('componentWillReact')
  }


  getHistory() {

  }

  removeHistory() {

  }

  private handleClose () {
    this.setState({
      removeAtModal: false
    })
  }

  private handleConfirm () {
    this.setState({
      removeAtModal: false
    })
  }

  private handleCancel () {
    this.setState({
      removeAtModal: false
    })
  }

  private remove (current) {
    this.setState({
      removeAtModal: true,
      current,
    })
  }

  render () {
    const { recordDatas, removeAtModal} = this.state
    return (
      <View className='record'>
        {
          recordDatas.map((item,index)=>
            <View className='record-item' key={`${item.title}${index}`}>
              <View className='record-item-content'>
                <View className='record-item__info-title  '>
                  {item.title}
                </View>
                <View className='record-item__info-note '>
                  {item.description}
                </View>
                <View className='record-item__info-note '>
                  {`${item.created} ${item.type} ${item.status === 'NEED' ? '需要' : '限制' }`}
                </View>
              </View>
              <View className='record-item-extra  '>
                <AtButton type='primary' size='small' circle onClick={()=> this.remove(item)}>删除</AtButton>
              </View>
              <AtModal
                isOpened={removeAtModal}
                title='删除提示'
                cancelText='取消'
                confirmText='确认'
                onConfirm={this.handleConfirm.bind(this)}
                onClose={this.handleClose.bind(this)}
                onCancel={this.handleCancel.bind(this)}
                content='是否确认删除？'
              />
            </View>)
        }
      </View>
    )
  }
}

export default Record  as ComponentType
