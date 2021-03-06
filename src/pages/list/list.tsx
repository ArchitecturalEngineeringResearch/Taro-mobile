import { ComponentType } from 'react'
import Taro, { Component } from '@tarojs/taro'
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
  status: 'NEED' | 'IDLE',
  endDate: string,
  title: string,
  description: string,
  type: string,
  phoneNumber: string | number,
  photos: Array<any>,
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
  currentCity: string
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
      messagesData: [],
      currentCity: '眉山市东坡区',
    }
  }

  componentWillMount () {

  }

  componentDidMount () {
    this.nextPage()
  }

  componentWillReact () {
    console.log('componentWillReact')
  }

  config: Taro.Config = {
    navigationBarTitleText: '首页'
  }

  onReachBottom() {
    this.nextPage()
  }

  componentDidShow() {
    this.getCity()
    // this.setState({
    //   currentPage: 1,
    //   messagesData: []
    // },()=> {
    //   this.nextPage()
    // })
  }

  filterHandle () {

  }


  getCity () {

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
    const userInfo = Taro.getStorage({
      key:'userInfo',
    })
    const { navigateTo, switchTab, showToast } = Taro

    userInfo.then(()=> {
      navigateTo({
        url: '/pages/createMessage/createMessage'
      })
    }).catch(() => {

      showToast({
        title: `请先登陆`,
        icon: 'none',
      })

      setTimeout(()=> {
        switchTab({
          url: '/pages/user/user'
        })
      }, 1000)
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

  previewImage (url) {
    Taro.previewImage({
      urls:[url],
    })
  }

  onShareAppMessage (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '我发布了一个工程车辆快来看看吧',
      path: 'pages/list/list'
    }
  }

  renderCard(card: ICard) {
    const {
      title,
      description,
      endDate,
      phoneNumber,
      status,
      type,
      created,
      photos = []
    } = card

    const flag = status == 'IDLE' ? 'http://files.guangzhaiziben.com/true (123.png' : 'http://files.guangzhaiziben.com/%E9%9C%80%E6%B1%82%E6%97%97%E5%B8%9C'

    return <AtCard
      className='card'
      note={`${status == 'IDLE' ? '闲置' : '需要' } ${type}/${endDate} 截止`}
      extra={moment(created).format('YYYY-MM-DD')}
      key={title}
      title={title}
      thumb={status == 'IDLE' ? 'http://files.guangzhaiziben.com/hornicon.png' : 'http://files.guangzhaiziben.com/BTCicon.png'}
    >
      {description}
      <View className='flag'>
        <Image className='img' src={flag}/>
      </View>
      <Swiper
        className='swiper-h'
        indicatorColor='#999'
        indicatorActiveColor='#333'
        circular
        indicatorDots
        autoplay>
          {
            photos.map((url:string)=>
              <SwiperItem className='swiper-item'>
              <Image
                className='img'
                src={url}
                onClick={this.previewImage.bind(this,url)}
              />
              </SwiperItem>
            )
          }
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
    const { messagesData, currentCity } = this.state
    const { deviceTypeStore: {currentType} } = this.props
    return (
      <View>
        <View className='list-top'>
          <View className='at-row filter'>
            <View
              className='at-col'
              onClick={()=> {}}
            >
              当前信息来自:{currentCity}
            </View>
            <View
              onClick={()=> {this.toDeviceType()}}
              className='at-col'
            >
              选择设备: {currentType}
            </View>
          </View>
          <AtNoticebar marquee>
            欢迎使用【机凭邦】 欢迎使用【机凭邦】 欢迎使用【机凭邦】
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
