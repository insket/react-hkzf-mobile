import React, { Component } from 'react'
import { Carousel, Flex, Grid, WingBlank  } from 'antd-mobile';
import { reqBanners, reqGroups, reqNews } from '../../api/home_page'
import './index.scss'

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
    swipers: [], // swiper
    isSwiperLoaded: false, // 判断 swiper 是否加载完成
    groups: [], // 租房小组数据
    news: [] // 最新资讯
  }

  componentDidMount () {
    this.getswiper()
    this.getGroups()
    this.getNews()
  }

  // 获取 swiper
  async getswiper() {
    const res = await reqBanners()
    // console.log(res.body)
    this.setState({
      swipers: res.body,
      isSwiperLoaded: true
    })
  }

  // 获取 group
  async getGroups() {
    const { body } = await reqGroups('AREA|88cff55c-aaa4-e2e0')
    this.setState({
      groups: body
    })
  }

  // 获取 news
  async getNews() {
    const { body } = await reqNews('AREA|88cff55c-aaa4-e2e0')
    this.setState({
      news: body
    })
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

  // 渲染 news
  renderNews() {
    return this.state.news.map((item) =>
      <div className='news-item' key={item.id}>
        <div className='imgwarp'>
          <img className='img' src={`http://localhost:3001${item.imgSrc}`} alt="" />
        </div>
        <Flex className='content' direction='column' justify='between'>
          <h3 className='title'>{item.title}</h3>
          <Flex className='info' justify='between' align='center'>
            <span>{item.from}</span>
            <span>{item.date}</span>
          </Flex>
        </Flex>
      </div>
    )
  }

  render() {
    return (
      <div className='homepage'>
        <div className='swiper'>
        {/*  Swiper  判断 isSwiperLoaded 是否加载完成， 只有为true 采取渲染 swiper */}
          {this.state.isSwiperLoaded ?
            <Carousel
              autoplay
              infinite
              autoplayInterval={6000}
              className='home_page'
            >
              {this.renderSwiper()}
            </Carousel> : ''
          }
        </div>

        {/* 顶部搜索框 */}
        <Flex className='search-box'>
          {/* 左侧白色区域 */}
          <Flex className='search'>
            {/*  位置  */}
            <div className='location' onClick={() => {this.props.history.push('/citylist')}}>
              <span className='name'>上海</span>
              <i className='iconfont icon-xiala'></i>
            </div>
            {/*  搜索表单 */}
            <div className='form' onClick={() => {this.props.history.push('/search')}}>
              <i className='iconfont icon-sousuo1'></i>
              <span className='text'>请输入小区或地址</span>
            </div>
          </Flex>
          {/* 右侧地图图标 */}
          <i className='iconfont icon-ditu' onClick={() => {this.props.history.push('/map')}}></i>
        </Flex>

        {/*  Flex 导航菜单 */}
        <Flex className='flex'>
          {this.rednerNavs()}
        </Flex>

        {/*  租房小组 */}
        <div className='group'>
          <div className='nav'>
            <span className='title'>租房小组</span>
            <span className='more'>更多</span>
          </div>
          {/*  Grid  */}
          <Grid
            data={this.state.groups}
            columnNum={2}
            square={false}
            hasLine={false}
            renderItem={(item) =>
              <Flex className='group-item' key={item.id}>
                <div className='desc'>
                   <p className='title'>{item.title}</p>
                  <p className='info'>{item.desc}</p>
                </div>
                <img src={`http://localhost:3001${item.imgSrc}`} alt="" />
              </Flex>
            }
          />
        </div>

        {/*  最新资讯  */}
        <div className='news'>
          <h3 className='group-title'>最新资讯</h3>
          <WingBlank size='md'>{this.renderNews()}</WingBlank>
        </div>
      </div>
    );
  }
}
