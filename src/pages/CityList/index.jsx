import React, { Component } from "react";
import { NavBar, Icon } from 'antd-mobile';
import { reqCityList, reqHotCity } from '../../api/city_list'
import { getCurrentCity } from '../../utils'
import './index.scss'

// 数据格式化的方法
const formarCityData = (list) => {
  const cityList = {}

  // 遍历 list
  list.forEach((item) => {
    const first = item.short.slice(0,1)
    if (cityList[first]) {
      cityList[first].push(item)
    }else{
      cityList[first] = [item]
    }
  })

  // 获取索引数据
  const cityIndex = Object.keys(cityList).sort()

  return {
    cityList,
    cityIndex
  }
}

export default class CityList extends Component {

  componentDidMount() {
    this.getCityList()
  }

  // getCityList
  async getCityList() {
    const { body } = await reqCityList()
    const hotRes = await reqHotCity()
    const { cityList, cityIndex} = formarCityData(body)
    // 将 热门城市 添加到 cityList
    cityList.hot = hotRes.body
     // 将 热门城市索引 添加到 cityIndex
    cityIndex.unshift('hot')
    //  获取当前定位城市
    const curCity = await getCurrentCity()
    console.log(curCity)
  }

  render() {
    return (
      <div className='citylist'>
        {/*  top NavBar */}
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.go(-1)}
        >城市选择</NavBar>
      </div>
    )
  }
}
