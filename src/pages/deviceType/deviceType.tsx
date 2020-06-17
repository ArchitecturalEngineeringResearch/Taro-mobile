import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtGrid, AtTabs, AtTabsPane, AtButton } from "taro-ui"
import { observer, inject } from '@tarojs/mobx'

import './deviceType.scss'
import deviceTypes from './deviceTypes'

type PageStateProps = {
  deviceTypeStore: {
    setCurrentType: Function
  }
}

interface Devicetype {
  props: PageStateProps;
}

interface IDevicetypeProps {

}

interface IDevicetypeState {
  currentTabs: number
}

@inject('deviceTypeStore')
@observer
class Devicetype extends Component <IDevicetypeProps, IDevicetypeState>{
  constructor(props) {
    super(props)
    this.state = {
      currentTabs: 0,
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
    navigationBarTitleText: '选择设备类型'
  }

  componentWillMount () { }

  componentWillReact () {
    console.log('componentWillReact')
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  handleClick (value) {
    this.setState({
      currentTabs: value
    })
  }

  handleAll() {
    this.props.deviceTypeStore.setCurrentType('全部')
    Taro.navigateBack({ delta: 1 })
  }

  handleClickAtGrid (item: any) {
    this.props.deviceTypeStore.setCurrentType(item.value)
    Taro.navigateBack({ delta: 1 })
  }

  render () {
    return (
      <View className='deviceType'>
        <AtTabs
          current={this.state.currentTabs}
          scroll
          tabList={[
            { title: '全部' },
            { title: '筑养路机械' },
            { title: '土方机械' },
            { title: '混凝土机械' },
            { title: '桩工机械' },
            { title: '起重机械' },
            { title: '高空作业' },
            { title: '工业车辆' }
          ]}
          onClick={this.handleClick.bind(this)}
        >
          <AtTabsPane current={this.state.currentTabs} index={0}>
            <View className='allType'>
              <AtButton onClick={this.handleAll.bind(this)} type='primary'>选择全部车辆类型</AtButton>
            </View>
          </AtTabsPane>
          <AtTabsPane current={this.state.currentTabs} index={1}>
          <AtGrid data={deviceTypes.筑养路机械} onClick={this.handleClickAtGrid.bind(this)} />
          </AtTabsPane>
          <AtTabsPane current={this.state.currentTabs} index={2}>
          <AtGrid data={deviceTypes.土方机械} onClick={this.handleClickAtGrid.bind(this)}/>
          </AtTabsPane>
          <AtTabsPane current={this.state.currentTabs} index={3}>
          <AtGrid data={deviceTypes.混凝土机械} onClick={this.handleClickAtGrid.bind(this)}/>
          </AtTabsPane>
          <AtTabsPane current={this.state.currentTabs} index={4}>
          <AtGrid data={deviceTypes.桩工机械} onClick={this.handleClickAtGrid.bind(this)}/>
          </AtTabsPane>
          <AtTabsPane current={this.state.currentTabs} index={5}>
          <AtGrid data={deviceTypes.起重机械} onClick={this.handleClickAtGrid.bind(this)}/>
          </AtTabsPane>
          <AtTabsPane current={this.state.currentTabs} index={6}>
          <AtGrid data={deviceTypes.高空作业} onClick={this.handleClickAtGrid.bind(this)}/>
          </AtTabsPane>
          <AtTabsPane current={this.state.currentTabs} index={7}>
          <AtGrid data={deviceTypes.工业车辆} onClick={this.handleClickAtGrid.bind(this)}/>
          </AtTabsPane>
        </AtTabs>
      </View>
    )
  }
}

export default Devicetype  as ComponentType
