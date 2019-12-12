import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Swiper, SwiperItem } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { AtNoticebar, AtCard, AtButton, AtFab } from 'taro-ui'
import moment from 'moment'

import './list.scss'
import { ListApi } from '../../api/index'

type PageStateProps = {
  deviceTypeStore: {
    currentType: string
  }
}

interface ICard {
  created: string,
  status: string,
  endDate: string,
  title: string,
  description: string,
  type: 'NEED' | 'IDLE',
  phoneNumber: string | number
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

  componentDidShow() {
    this.setState({
      currentPage: 1,
      messagesData: []
    },()=> {
      this.nextPage()
    })
  }

  filterHandle () {

  }

  onPullDownRefresh() {
    this.setState({
      currentPage: 1,
      messagesData: []
    },()=> {
      this.nextPage()
    })

    setTimeout(()=> {
      Taro.stopPullDownRefresh()
    },1000)
  }

  nextPage () {
    const { messagesData, pageSzie, currentPage } = this.state
    const { currentType } = this.props.deviceTypeStore
    let deviceType = ''

    if(currentType != '全部') {
      deviceType = currentType
    }

    ListApi.getNextPage({
      deviceType,
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

  phoneCall (phoneNumber) {
    Taro.makePhoneCall({
      phoneNumber
    })
  }

  renderCard(card: ICard) {
    const {
      title,
      description,
      endDate,
      phoneNumber,
      status,
      type,
      created
    } = card

    return <AtCard
      className='card'
      note={`${status == 'IDLE' ? '闲置' : '需要' } ${type}/${endDate} 截止`}
      extra={moment(created).format('YYYY-MM-DD')}
      key={title}
      title={title}
      thumb={status == 'IDLE' ? 'http://q2bvifwjn.bkt.clouddn.com/hornicon.png' : 'http://q2bvifwjn.bkt.clouddn.com/BTCicon.png'}
    >
    {description}
      <Swiper
        className='swiper-h'
        indicatorColor='#999'
        indicatorActiveColor='#333'
        circular
        indicatorDots
        autoplay>
        <SwiperItem className='swiper-item'>
          <Image
            className='img'
            src='https://t7.baidu.com/it/u=1473459495,4243489015&fm=199&app=68&f=JPEG?w=750&h=750&s=9EB35D87438A1EE80E1134380300E040'
          />
        </SwiperItem>
        <SwiperItem className='swiper-item'>
          <Image
            className='img'
            src='https://ss0.bdstatic.com/-0U0b8Sm1A5BphGlnYG/kmarketingadslogo/0c192ad67cccebb67bbcaef7804f9674_259_194.jpg'
          />
        </SwiperItem>
      </Swiper>
      <View className="at-row row-call at-row__justify--between">
        <AtButton
          className="at-col at-col-12"
          type='primary'
          size='small'
          onClick={()=> {this.phoneCall(String(phoneNumber))}}
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
