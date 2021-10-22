import { reqArea } from '../api/home_page'

/*
      获取当前定位城市函数
*/
export const getCurrentCity = () => {
  const localCity = JSON.parse(localStorage.getItem('hkzf_city'))
  if (!localCity) {
    return new Promise((resolve, reject) => {
        // 通过IP定位获取当前城市名称
      const currentCity = new window.BMapGL.LocalCity();
      currentCity.get(async res => {
        try {
          const { body } = await reqArea(res.name)
          localStorage.setItem('hkzf_city', JSON.stringify(body))
          resolve(body)
        } catch (error) {
          reject(error)
        }
      })
    })
  }
  return Promise.resolve(localCity)
}