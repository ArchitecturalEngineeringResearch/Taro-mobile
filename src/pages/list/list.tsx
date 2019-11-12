import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { AtNoticebar, AtCard, AtButton, AtFab } from 'taro-ui'


import './list.scss'

type PageStateProps = {
  counterStore: {
    counter: number,
    increment: Function,
    decrement: Function,
    incrementAsync: Function
  }
}

interface ICard {
  time: string,
  title: string,
  description: string,
  type: 'NEED' | 'IDLE'
}

interface List {
  props: PageStateProps;
}

interface IListProps {

}

interface IListState {
  messagesData: Array<ICard>
}

@inject('counterStore')
@observer
class List extends Component<IListProps, IListState> {

  constructor() {
    super()
    this.state = {
      messagesData: [
        {
          time: '2019-2-2',
          title: '谁他妈买小米儿啊',
          description: '前端数据流方案包括了 flux, redux 和 mobx. 在其中数据存储的地方, 就叫做 store.',
          type: 'IDLE'
        },
        {
          time: '2019-2-2',
          title: '谁他妈买小米儿啊',
          description: '前端数据流方案包括了 flux, redux 和 mobx. 在其中数据存储的地方, 就叫做 store.',
          type: 'IDLE'
        },
        {
          time: '2019-2-2',
          title: '谁他妈买小米儿啊',
          description: '前端数据流方案包括了 flux, redux 和 mobx. 在其中数据存储的地方, 就叫做 store.',
          type: 'IDLE'
        },
        {
          time: '2019-2-2',
          title: '谁他妈买小米儿啊',
          description: '前端数据流方案包括了 flux, redux 和 mobx. 在其中数据存储的地方, 就叫做 store.',
          type: 'IDLE'
        }
      ]
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

  componentWillMount () {
  }

  componentWillReact () {
    console.log('componentWillReact')
  }

  componentDidMount () {}

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  filterHandle () {

  }

  toCreateMessage () {
    Taro.navigateTo({
      url: '/pages/createMessage/createMessage'
    })
  }

  renderCard(card: ICard) {
    const {
      title,
      description,
      type,
      time
    } = card
    
    if (type === 'NEED') {
      
    }
    
    return <AtCard
      className='card'
      note=''
      extra={time}
      title={title}
      thumb='http://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png'
    >
    {description}
    <Image
          style='width: 300px;height: 100px;background: #fff;'
          src='https://camo.githubusercontent.com/3e1b76e514b895760055987f164ce6c95935a3aa/687474703a2f2f73746f726167652e333630627579696d672e636f6d2f6d74642f686f6d652f6c6f676f2d3278313531333833373932363730372e706e67'
        />
      <View className="at-row row-call at-row__justify--between">
        <AtButton
          className="at-col at-col-12" 
          type='primary'
          size='small'
        >拨打电话</AtButton>
      </View>
    </AtCard>
  }

  render () {
    // const { counterStore: { counter } } = this.props
    const { messagesData } = this.state
    return (
      <View>
        <View className='list'>
          <View className='at-row filter'>
            <View 
              className='at-col'
              onClick={()=> {}}
            >
              最新消息
            </View>
            <View 
              className='at-col'
              onClick={()=> {}}
            >
              选择吨位
            </View>
            <View
              onClick={()=> {}}
              className='at-col'
            >
              选择价位
            </View>
          </View>
          <AtNoticebar marquee>
            这是 NoticeBar 通告栏，这是 NoticeBar 通告栏，这是 NoticeBar 通告栏
          </AtNoticebar>
        </View>
        <View className="list-messages">
          {
            messagesData.map((item)=> this.renderCard(item))
          }
        </View>
        <View className="fab">
          <AtFab onClick={()=> this.toCreateMessage()}>
            <View className='at-icon at-icon-add'></View>
          </AtFab>
        </View>
      </View>
    )
  }
}

export default List  as ComponentType
