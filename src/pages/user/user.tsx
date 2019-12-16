import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import { AtAvatar, AtDivider, AtGrid, AtModal, AtModalHeader, AtModalContent, AtModalAction, AtMessage } from 'taro-ui'

import './user.scss'

interface IListProps {

}

interface IListState {
  atModalIsOpened: boolean;
  avatarUrl: string;
  userName: string;
}

@observer
class User extends Component<IListProps, IListState> {
  constructor(props) {
    super(props)
    this.state = {
      atModalIsOpened: false,
      avatarUrl: 'https://jdc.jd.com/img/200',
      userName: '未登陆'
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

  componentDidMount () {
    Taro.setNavigationBarTitle({
      title: '我的'
    })

    this.loadUserInfo()
  }

  componentWillUnmount () { }

  componentDidShow () {
    this.loadUserInfo()
  }

  componentDidHide () { }

  handleMenus(item) {
    console.log(item.value)
    switch (item.value) {
      case '已发帖子':
        Taro.navigateTo({
          url: '/pages/record/record'
        })
        break;

      default:
        break;
    }
  }

  getUserInfo (res) {
    const {setStorage, atMessage} = Taro
    setStorage({ key: 'userInfo', data: res }).then(()=> {
      this.setState({
        atModalIsOpened: false
      })
      atMessage({
        'message': '登陆成功！',
        'type': 'success',
      })
      this.loadUserInfo()
    })
  }

  loadUserInfo () {
    Taro.getStorage({
      key: 'userInfo'
    }).then(({data}:any)=> {
      const {detail} = data

      this.setState({
        userName: detail.userInfo.nickName,
        avatarUrl: detail.userInfo.avatarUrl
      })
    }).catch(()=> {
      this.setState({
        atModalIsOpened: true
      })
    })
  }

  render () {
    const { userName, avatarUrl, atModalIsOpened} = this.state
    return (
      <View className='user'>
        <AtDivider content={userName} fontColor='#2d8cf0' lineColor='#2d8cf0' />
        <View className='at-row at-row__justify--center'>
          <AtAvatar
            circle
            image={avatarUrl}
            size='large'
          />
        </View>
        <AtGrid onClick={this.handleMenus.bind(this)}className='menus' mode='rect' data={[{
          image: 'http://q2bvifwjn.bkt.clouddn.com/%E5%8F%91%E9%80%81%E8%AE%B0%E5%BD%95icon.png',
          value: '已发帖子'
        }]}/>
        <AtModal isOpened={atModalIsOpened}>
          <AtModalHeader>欢迎使用【工程酷】</AtModalHeader>
          <AtModalContent>
            使用微信号登陆,将会同步你的微信头像和名称
          </AtModalContent>
          <AtModalAction>
            <Button
              onGetUserInfo={this.getUserInfo.bind(this)}
              open-type="getUserInfo"
            >
              立即登陆
            </Button>
          </AtModalAction>
        </AtModal>
        <AtMessage/>
      </View>
    )
  }
}

export default User  as ComponentType
