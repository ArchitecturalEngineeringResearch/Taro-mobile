import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import { AtAvatar, AtDivider, AtGrid, AtModal, AtModalHeader, AtModalContent, AtModalAction } from 'taro-ui'

import './user.scss'
import { UserApi } from '../../api/index'

interface IListProps {

}

interface IListState {
  atModalIsOpened: boolean;
  avatarUrl: string;
  userName: string;
  loading: boolean;
}

@observer
class User extends Component<IListProps, IListState> {
  constructor(props) {
    super(props)
    this.state = {
      atModalIsOpened: false,
      avatarUrl: 'https://files.guangzhaiziben.com/%E6%88%AA%E5%B1%8F2020-04-04%20%E4%B8%8A%E5%8D%8811.18.58.png',
      userName: '未登陆',
      loading: false,
    }
  }

  componentWillMount () { }

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

  handleMenus(item) {
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

  getUserInfo () {
    const { setStorage, login, getUserInfo } = Taro
    const { loading } = this.state
    // 如果属于登陆中
    if( loading ) {
      return
    }

    this.setState({
      loading: true
    })

    // 登陆获取 unionid session_key
    login({}).then((loginRes: any)=> {
      // 获取用户信息
      getUserInfo({}).then((InfoRes)=> {
        const { encryptedData, iv } = InfoRes
        UserApi.login({
          appid: 'wx71cbc64614fcaac6',
          secret: 'b9895a8aa8dfa3916d4df748fd5c8c04',
          jsCode: loginRes.code,
          iv,
          encryptedData
        }).then(({data}: any)=> {
          // 存储当前的微信号信息
          setStorage({ key: 'userInfo', data }).then(()=> {
            this.setState({
              atModalIsOpened: false,
              loading: false,
            })
            Taro.showToast({
              title: `登陆成功！`,
              icon: 'success',
            })
            this.loadUserInfo()
          })
        })
      })
    })
  }

  loadUserInfo () {

    Taro.getStorage({
      key: 'userInfo'
    }).then(({data}: any)=> {
      this.setState({
        userName: data.nickName,
        avatarUrl: data.avatarUrl
      })
    }).catch(()=> {
      this.setState({
        atModalIsOpened: true
      })
    })
  }

  render () {
    const { userName, avatarUrl, atModalIsOpened, loading} = this.state
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
          image: 'http://files.guangzhaiziben.com/%E5%8F%91%E9%80%81%E8%AE%B0%E5%BD%95icon.png',
          value: '已发帖子'
          }]}
        />
        <AtModal isOpened={atModalIsOpened}>
          <AtModalHeader>欢迎使用，请勿发送违规图片和信息</AtModalHeader>
          <AtModalContent>
            使用微信号登陆,将会同步你的微信头像和名称
          </AtModalContent>
          <AtModalAction>
            <Button
              onGetUserInfo={this.getUserInfo.bind(this)}
              open-type='getUserInfo'
              loading={loading}
            >
              立即登陆
            </Button>
          </AtModalAction>
        </AtModal>
      </View>
    )
  }
}

export default User  as ComponentType
