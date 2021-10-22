import request from '../utils/request'

/*
      reqBanners  获取 轮播图 数据
*/
export const reqBanners = () => {
  return request ({
    methods: 'get',
    url: 'home/swiper'
  })
}

/*
      reqGroups  获取 租房小组 数据
*/
export const reqGroups = (area) => {
  return request ({
    methods: 'get',
    url: `/home/groups?area=${area}`
  })
}

/*
      reqNews  获取 最新资讯 数据
*/
export const reqNews = (area) => {
  return request ({
    methods: 'get',
    url: `/home/news?area=${area}`
  })
}

/*
      reqArea  获取 当前城市 数据
*/
export const reqArea = (name) => {
  return request ({
    methods: 'get',
    url: `area/info?name=${name}`
  })
}