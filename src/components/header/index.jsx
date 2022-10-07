import React from 'react'
import { withRouter } from 'react-router';
import menuList from '../../config/menuConfig';
import { formateDate } from '../../utils/dateUtils';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';
import './index.less'
//import {reqWeather} from '../../api/index'
import { Modal} from 'antd';
import LinkButton from '../link-button';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

//头部的组件
class Header extends React.Component {

  state = {
    currentTime: formateDate(Date.now()),//当前时间字符串
    //api当前失效，所以写死
    dayPictureUrl: 'http://api.map.baidu.com/images/weather/day/qing.png',//天气图片url
    weather: '晴',//天气的文本
  }

  getTime = () => {
    //每隔1s获取当前时间，并更新状态数据currentTime
    this.intervalId = setInterval(() => {
      const currentTime = formateDate(Date.now())
      this.setState({currentTime})
    },1000)
  }

  // getWeather = async () => {
  //   //调用接口请求异步获取数据
  //   const {dayPictureUrl, weather} = await reqWeather('北京')
  //   //更新状态
  //   this.setState({dayPictureUrl, weather})
  // }

  getTitle = () => {
    //得到当前请求路径
    const path = this.props.location.pathname;
    let title;
    menuList.forEach(item => {
      if(item.key === path) { // 如果当前item对象的key与path一样,item的title就是需要显示的title
        title = item.title
      } else if(item.children) {
        //在所有子item中查找匹配的
        const cItem = item.children.find(cItem => path.indexOf(cItem.key) === 0)
        //如果有值才说明有匹配的
        if(cItem) {
          //取出它的title
          title = cItem.title
        }
      }
    })
    return title
  } 

  //退出登录
  logout = () => {
    //显示确认框
    confirm({
      icon: <ExclamationCircleOutlined />,
      content: '是否确认退出',
      onOk: () => {
        console.log('OK');
        //删除保存的user数据
        storageUtils.removeUser()
        memoryUtils.user = {}
        //跳转到login
        this.props.history.replace('/login')
      },
      onCancel() {
        console.log('Cancel');
      },
    })
  }

  //第一次render()之后执行一次
  //一般在此执行异步操作：发ajax请求/启动定时器
  componentDidMount () {
    //获取当前的时间
    this.getTime()
    //获取当前天气
    //this.getWeather()
  }

  //当前组件卸载之前调用
  componentWillUnmount () {
    //清除定时器
    clearInterval(this.intervalId)
  }

  render(){

    const {currentTime, dayPictureUrl, weather} = this.state

    const username = memoryUtils.user.username

    //得到当前需要显示的title
    const title = this.getTitle()

    return (
      <div className="header">
        <div className="header-top">
          <span>欢迎，{username}</span>
          {/* <Button type="link" onClick={this.logout}>退出</Button> */}
          <LinkButton onClick={this.logout}>退出</LinkButton>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">
            {title}
          </div>
          <div className="header-bottom-right">
            <span>{currentTime}</span>
            <img src={dayPictureUrl} alt="weather"/>
            <span>{weather}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Header);
