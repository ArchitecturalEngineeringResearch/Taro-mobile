import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { AtNoticebar, AtCard, AtButton, AtFab } from 'taro-ui'

import './list.scss'
import { ListApi } from '../../api/index'

type PageStateProps = {
  deviceTypeStore: {
    currentType: string
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
  messagesData: Array<ICard>;
  selectedTonnage: number;
  selectedTonnageIndex: number;
  currentPage: number,
  pageSzie: number,
}

@inject('deviceTypeStore')
@observer
class List extends Component<IListProps, IListState> {

  constructor(props) {
    super(props)
    this.state = {
      selectedTonnageIndex: 0,
      selectedTonnage: 0,
      currentPage: 1,
      pageSzie: 5,
      messagesData: []
    }
  }

  config: Config = {
    navigationBarTitleText: '首页'
  }

  componentWillMount () {
  }

  componentDidMount () {
    this.nextPage()
  }

  componentWillReact () {
    console.log('componentWillReact')
  }

  onReachBottom() {
    this.nextPage()
  }

  filterHandle () {

  }

  nextPage () {
    const { messagesData, pageSzie, currentPage } = this.state
    const { currentType } = this.props.deviceTypeStore
    ListApi.getNextPage({
      conditions: {
        deviceType: currentType
      },
      page: currentPage,
      size: pageSzie
    }).then((res)=> {
      this.setState({
        currentPage: currentPage + 1,
        messagesData: messagesData.concat(res.data as any)
      })
    })
  }

  toCreateMessage () {
    Taro.navigateTo({
      url: '/pages/createMessage/createMessage'
    })
  }

  toDeviceType () {
    Taro.navigateTo({
      url: '/pages/deviceType/deviceType'
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
    const { messagesData } = this.state
    const { deviceTypeStore: {currentType} } = this.props
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
              onClick={()=> {this.toDeviceType()}}
              className='at-col'
            >
              选择设备: {currentType}
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
