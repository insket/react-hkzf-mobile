import request from '../utils/request'

/*
    获取城市列表数据  level  1 表示获取所有城市数据 2 表示城市下区的数据
*/
export const reqCityList = (level=1) => {
  return request({
    methods: 'get',
    url: `/area/city?level=${level}`
  })
}

/*
    获取热门城市列表
*/
export const reqHotCity = () => {
  return request({
    methods: 'get',
    url: '/area/hot'
  })
}