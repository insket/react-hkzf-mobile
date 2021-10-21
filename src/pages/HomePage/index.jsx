import React, { Component } from 'react'
import { Carousel, Flex } from 'antd-mobile';
import { getBanners } from '../../api/home_page'
import './index.css'

// 导航菜单navs数据
const navs = [
  {
    id: 1,
    icon: 'icon-pinzhizhengzu',
    title: '整租',
    path: '/home/list'
  },
  {
    id: 2,
    icon: 'icon-hezu',
    title: '合租',
    path: '/home/list'
  },
  {
    id: 3,
    icon: 'icon-dituzhaofang',
    title: '地图找房',
    path: '/map'
  },
  {
    id: 4,
    icon: 'icon-woyaochuzu',
    title: '去出租',
    path: '/rent'
  }
]

export default class HomePage extends Component {
  state = {
    swipers: [] // swiper
  }

  componentDidMount () {
    this.getswiper()
  }

  // 获取 swiper
  async getswiper() {
    const res = await getBanners()
    // console.log(res.body)
    this.setState({swipers: res.body})
  }

  // 渲染 swiper
  renderSwiper() {
    return (
      this.state.swipers.map(item => (
        <a
          key={item.id}
          href="http://www.alipay.com"
          style={{ display: 'inline-block', width: '100%', height: '212px' }}
        >
          <img
            src={`http://localhost:3001${item.imgSrc}`}
            alt=""
            style={{ width: '100%', verticalAlign: 'top' }}
          />
        </a>
      ))
    )
  }

  // 渲染 navs
  rednerNavs() {
    return navs.map((item) =>
      <Flex.Item key={item.id} onClick={() => this.props.history.push(item.path)}>
        <i className={`iconfont ${item.icon}`}></i>
        <h2>{item.title}</h2>
      </Flex.Item>
    )
  }

  render() {
    return (
      <div className='homepage'>
        {/*  Swiper */}
        <Carousel
          autoplay
          infinite
          autoplayInterval={6000}
          className='home_page'
        >
          {this.renderSwiper()}
        </Carousel>

        {/*   Flex */}
        <Flex className='flex'>
          {this.rednerNavs()}
        </Flex>
      </div>
    );
  }
}
