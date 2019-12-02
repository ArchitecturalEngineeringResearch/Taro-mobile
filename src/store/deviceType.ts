import { observable } from 'mobx'

const deviceTypeStore = observable({
  currentType: '全部',
  setCurrentType(value: string) {
    this.currentType = value
  },
})

export default deviceTypeStore
