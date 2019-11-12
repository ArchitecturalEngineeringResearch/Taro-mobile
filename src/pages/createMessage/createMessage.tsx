import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Picker } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { AtForm, AtInput, AtRadio, AtButton, AtImagePicker } from 'taro-ui'

import './createMessage.scss'

type PageStateProps = {
  counterStore: {
    counter: number,
    increment: Function,
    decrement: Function,
    incrementAsync: Function
  }
}

interface Createmessage {
  props: PageStateProps;
}

@inject('counterStore')
@observer
class Createmessage extends Component {

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
      title: '发布消息'
    })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  handleChange () {}

  handleClose () {}

  render () {
    return (
      <View className='createMessage'>
        <AtForm>
          <AtInput
            name='value'
            title='说明'
            type='text'
            placeholder='请输入简要说明'
            value={this.state.value}
            onChange={this.handleChange.bind(this)}
          />
          <AtInput
            name='value'
            title='详情描述'
            type='text'
            placeholder='请输入详情描述'
            value={this.state.value}
            onChange={this.handleChange.bind(this)}
          />
          <View className="picker-box">
            <Picker mode='date' onChange={this.onDateChange}>
              <View className='picker'>
                选择时间 {this.state.dateSel}
              </View>
            </Picker>
          </View>
          <AtInput
            name='value6'
            border={false}
            title='手机号码'
            type='phone'
            placeholder='请输入手机号码'
            value={this.state.value6}
            onChange={this.handleChange.bind(this)}
          />
          <AtRadio
            options={[
              { label: '租车', value: 'option1', desc: '如果你想租别人的车点击此处' },
              { label: '闲置', value: 'option2', desc: '如果你想把闲置的车租给别人点击此处' },
            ]}
            value={this.state.value}
            onClick={this.handleChange.bind(this)}
          />
        <View className='at-article__info'>
          拍照或上传相册图片
        </View>
          <AtImagePicker
            length={5}
            files={this.state.files}
            onChange={()=> {}}
            onFail={()=> {}}
            onImageClick={()=> {}}
          />
        </AtForm>
        <View className='at-article__info'>
          小程序会获取您的位置信息,以便把这条消息推送到附近的用户。
        </View>
        <View className='published at-row at-row__justify--center'>
          <View className='at-col at-col-5'>
            <AtButton type='primary'>发布信息</AtButton>
          </View>
        </View>
      </View>
    )
  }
}

export default Createmessage  as ComponentType
