/*
包含 n 个接口请求函数的模块 
每个函数返回 promise 
*/ 
// import { message } from 'antd'
// import jsonp from 'jsonp'
import ajax from './ajax'

// 登陆
// export function reqLogin(username,password) {
//     return ajax('/login', {username, password}, 'POST')
// }
export const reqLogin = (username, password) => ajax('/login', {username, password}, 'POST')
//添加用户
export const reqAddUser = (user) => ajax('/manage/user/add', user, 'POST')
//jsonp请求的接口请求函数
//这个api目前失效

// export const reqWeather = (city) => {

//     return new Promise((resolve,reject) => {
//         const url = 'http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2'
//         // 发送jsonp请求
//         jsonp(url, {}, (err, data) => {
//             console.log('jsonp()', err, data)
//             //如果成功了
//             if(!err && data.status==='success') {
//                 //取出需要的数据
//                 const {dayPictureUrl, weather} = data.results[0].weather_data[0]
//                 resolve({dayPictureUrl, weather})
//             } else {
//             //如果失败了
//             message.error('获取天气信息失败')
//             }
//         })
//     })
// }
// reqWeather('北京')