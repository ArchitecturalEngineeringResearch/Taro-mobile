import { ComponentType } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { View, Picker } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { AtForm, AtInput, AtRadio, AtButton, AtImagePicker } from 'taro-ui'

import validation from './validation'
import './createMessage.scss'
import { MessageApi, BaiduApi } from '../../api'


type PageStateProps = {
  deviceTypeStore: {
    currentType: string
  }
}


interface Createmessage {
  props: PageStateProps;
}

interface ICreatemessageProps {

}

export interface ICreatemessageState {
  title: string;
  description: string;
  dateSel: string;  //到期时间
  phoneNumber: number | string;
  status: string;
  files: Array<any>;
  lat: number;
  lng: number;
  loading: boolean;
  upLoadToken: string;
  upLoadfils: Array<string>
}

@inject('deviceTypeStore')
@observer
class Createmessage extends Component<ICreatemessageProps, ICreatemessageState> {

  constructor (props) {
    super(props)
    this.state = {
      lat: 0,
      lng: 0,
      title: '',
      description: '',
      dateSel: '',
      phoneNumber: '',
      status: '',
      files: [],
      loading: false,
      upLoadToken: '',
      upLoadfils: [], // 已经上传的文件
    }
  }

  componentWillMount () {
    this.getLocation()
    this.getUpLoadToken()
  }

  componentDidMount () {
    Taro.setNavigationBarTitle({
      title: '发布消息'
    })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  config: Taro.Config = {
    navigationBarTitleText: '首页'
  }

  handleChange (status) {
    this.setState({
      status
    })
  }

  getLocation() {
    Taro.getLocation({}).then((res)=> {
      const {latitude, longitude} = res
      this.setState({
        lat: latitude,
        lng: longitude
      })
    })
  }

  getUpLoadToken () {
    MessageApi.getUploadToken(
      'zKFedO2YgtdODJL_e0PasNzLXEk1aMhVMnTZJdsK',
      'mnUZT-JuivsbhxdXNTMRP7rXMiWdmrgWs5Uwjua_',
      'iconlogo').then((res: any)=> {

        this.setState({
          upLoadToken: res.data
        })
      })
  }

  handleClose () {}

  onDateChange ({currentTarget}) {
    this.setState({
      dateSel: currentTarget.value
    })
  }

  submit() {
    const { currentType: type } = this.props.deviceTypeStore

    const {
      title,
      description,
      dateSel: endDate,
      phoneNumber,
      status,
      lat: latitude,
      lng: longitude,
      upLoadfils: photos
    } = this.state

    const validate = validation(this.state)
    if(validate) {
      for (let item in validate) {
        Taro.showToast({
          title: `错误通知: ${validate[item]}`,
          icon: 'none',
        })
      }
      return
    }

    if(type == '全部') {
      Taro.showToast({
        title: `错误通知: 请选择设备类型`,
        icon: 'none',
      })
      return
    }

    const { getStorage} = Taro
    this.setState({
      loading: true
    })

    Taro.showLoading({
      title: '提交中...',
      mask: true
    })

    getStorage({ key: 'userInfo' }).then(({data}: any)=> {
      const { openId, unionId } = data

      MessageApi.createMessage({
        type,
        title,
        endDate,
        phoneNumber,
        description,
        status,
        latitude,
        longitude,
        photos,
        openId,
        unionId,
      }).then((res)=> {
        console.log(res.statusCode)

        if(res.statusCode == 412) {
          Taro.hideLoading()
          Taro.showToast({
            title: res.data.errors,
            icon: 'none',
          })
          this.setState({
            loading: false
          })
          return
        }
        Taro.hideLoading()

        Taro.showToast({
          title: '发送成功！',
          icon: 'success',
        })

        setTimeout(()=> {
          Taro.navigateBack({ delta: 1 })
        }, 1000)
      })
    })
  }

  toDeviceType () {
    Taro.navigateTo({
      url: '/pages/deviceType/deviceType'
    })
  }

  imagePickeronChange (files: Array<any>, operationType: string, index: any) {
    const { uploadFile } = Taro

    if (operationType == 'add') {
      const last = files[files.length - 1]
      const { upLoadToken } = this.state
      uploadFile({
        url: 'https://upload-z2.qiniup.com',
        filePath: last.url,
        name: 'file',
        header: {
          "Content-Type": "multipart/form-data"
        },
        formData: {
          token: upLoadToken,
        }
      }).then(({data})=> {
        const {hash} = JSON.parse(data)

        const { upLoadfils } = this.state
        const imgUrl = `http://files.guangzhaiziben.com/${hash}`

        Taro.showLoading({
          title: '检查中...',
          mask: true
        })

        BaiduApi.user_defined(imgUrl, Taro.getStorageSync('baidu_access_token').access_token).then((res)=> {
          const { conclusion = '', conclusionType = ''} = res.data
          Taro.hideLoading()
          Taro.showToast({
              title: `图片识别:${conclusion}`,
              icon: 'none',
              duration: 2000
            })

          // 1：合规，2：不合规，3：疑似，4：审核失败
          if (conclusionType != 1) return

          upLoadfils.push(imgUrl)
          this.setState({
            upLoadfils,
            files,
          })
        })
      })
    }

    if (operationType == 'remove') {
      const { upLoadfils } = this.state
      this.setState({
        upLoadfils: upLoadfils.filter((item, i)=> i != index ),
        files
      })
    }
  }

  onFailonChange (msg: string) {
    console.log(msg)
  }

  onImageClick (index: number, file: Object) {
    console.log(index, file)
  }


  render () {
    const { currentType: type } = this.props.deviceTypeStore
    const { loading } = this.state
    return (
      <View className='createMessage'>
        <AtForm>
          <View className='at-row at-row__justify--between device-type-box'>
            <View className='at-col at-col-5 device-type'>
              当前选择的设备：{type}
            </View>
            <View className='at-col at-col-5'>
              <View
                className='device-type-icon'
                onClick={()=> {this.toDeviceType()}}
              >
                选择设备
                <View className='at-icon at-icon-chevron-right'></View>
              </View>
            </View>
          </View>
          <AtInput
            name='value'
            title='标题'
            type='text'
            placeholder='请输入标题'
            value={this.state.title}
            onChange={(title: string)=> this.setState({title})}
          />
          <AtInput
            name='value'
            title='详情描述'
            type='text'
            placeholder='请输入详情描述'
            value={this.state.description}
            onChange={(description: string)=> this.setState({description})}
          />
          <View className='picker-box'>
            <Picker value='' mode='date' onChange={this.onDateChange}>
              <View className='picker'>
              <View className='endTime'>截止时间</View>{this.state.dateSel}
              </View>
            </Picker>
          </View>
          <AtInput
            name='value6'
            border={false}
            title='手机号码'
            type='phone'
            placeholder='请输入手机号码'
            value={this.state.phoneNumber as string}
            onChange={(phoneNumber)=> this.setState({phoneNumber})}
          />
          <AtRadio
            options={[
              { label: '租车', value: 'NO_IDLE', desc: '如果你想租别人的车点击此处' },
              { label: '闲置', value: 'IDLE', desc: '如果你想把闲置的车租给别人点击此处' },
            ]}
            value={this.state.status}
            onClick={(status)=> this.setState({status})}
          />
        <View className='at-article__info'>
          拍照或上传相册图片
        </View>
          <AtImagePicker
            length={5}
            files={this.state.files}
            onChange={this.imagePickeronChange.bind(this)}
            onFail={this.onFailonChange.bind(this)}
            onImageClick={this.onImageClick.bind(this)}
          />
        </AtForm>
        <View className='at-article__info'>
          小程序会获取您的位置信息,以便把这条消息推送到附近的用户。
        </View>
        <View className='published at-row at-row__justify--center'>
          <View className='at-col at-col-5'>
            <AtButton disabled={loading} type='primary' onClick={this.submit.bind(this)}>发布信息</AtButton>
          </View>
        </View>
      </View>
    )
  }
}

export default Createmessage as ComponentType
