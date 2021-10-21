import request from '../utils/request'

/*
      getBanners  获取轮播图 数据
*/
export const getBanners = () => {
  return request ({
    methods: 'get',
    url: 'home/swiper'
  })
}