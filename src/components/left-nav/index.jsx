import React from 'react'
import {Link, withRouter} from 'react-router-dom'

import * as Icon from '@ant-design/icons'
import logo from '../../assets/images/logo.png'
import menuList from '../../config/menuConfig'
import './index.less'
import { Menu } from 'antd';

const { SubMenu } = Menu;

//左侧导航的组件
class LeftNav extends React.Component {

  //根据menu的数据数组生成对应的标签数组
  //方式一：使用map() + 递归调用
  getMenuNodes_map = (menuList) => {
    return menuList.map(item => {
      const icon = React.createElement(
        Icon[item.icon],
        {
          style:{ fontSize: '16px'}
        }
      )
      if(!item.children) {
        return (
          <Menu.Item key={item.key}  icon={icon}>
            <Link to={item.key}>
            {item.title}
            </Link>
          </Menu.Item>
        )
      } else {
        return (
          <SubMenu key={item.key} icon={icon} title={item.title}>
            {this.getMenuNodes(item.children)}
          </SubMenu>
        )
      }
    })
  }

  //方式二：使用reduce() + 递归调用
  getMenuNodes = (menuList) => {
    //得到当前请求的路由路径
    const path = this.props.location.pathname

    return menuList.reduce((pre, item) => {
      const icon = React.createElement(
        Icon[item.icon],
        {
          style:{ fontSize: '16px'}
        }
      )
      //向pre添加<Menu.Item>
      if(!item.children) {
        pre.push((
          <Menu.Item key={item.key}  icon={icon}>
          <Link to={item.key}>
          {item.title}
          </Link>
        </Menu.Item>
        ))
      } else {
        //查找一个与当前请求路径匹配的子Item
        const cItem = item.children.find(cItem => cItem.key === path)
        //如果存在，说明当前item的子列表需要打开
        if(cItem) {
          this.openkey = item.key
        } 

        //向pre添加<SubMenu>
        pre.push((
          <SubMenu key={item.key} icon={icon} title={item.title}>
            {this.getMenuNodes(item.children)}
          </SubMenu>
        ))
      }

      return pre;
    }, [])
  }
  
  /*
  在第一次render()之前执行一次
  为第一个render()准备数据(必须同步的)
  */
  UNSAFE_componentWillMount () {
     this.menuNodes = this.getMenuNodes(menuList)
  }

  render(){
    //得到当前请求的路由路径
    const path = this.props.location.pathname
    console.log('render()', path)
    //得到需要打开菜单项的key
    const openkey = this.openkey

    return (
      <div className="left-nav">
        <Link to="/" className="left-nav-header">
          <img src={logo} alt=""/>
          <h1>硅谷后台</h1>
        </Link>
        <Menu
          mode="inline"
          theme="dark"
          //defaultSelectedKeys初始选中的菜单项 key 数组;selectedKeys当前选中的菜单项 key 数组，更好用
          selectedKeys={[path]}
          defaultOpenKeys={[openkey]}
        >
          {/* <Menu.Item key="/home" icon={<PieChartOutlined />}>
            <Link to='/home'>
            首页
            </Link>
          </Menu.Item>
          <SubMenu key="sub1" icon={<MailOutlined />} title="商品">
            <Menu.Item key="/category" icon={<AppstoreOutlined />}>
              <Link to='/category'>
              品类管理
              </Link>
            </Menu.Item>
            <Menu.Item key="/product" icon={<AppstoreOutlined />}>
              <Link to='/product'>
              商品管理
              </Link>
            </Menu.Item>
          </SubMenu> */}
          {
            this.menuNodes
          }
        </Menu>
      </div>
    );
  }
}

/*
withRouter高阶组件:
包装非路由组件，返回一个新的组件
新的组件向非路由组件传递3个属性：history/location/match
*/
export default withRouter(LeftNav);
