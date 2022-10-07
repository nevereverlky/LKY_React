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
  //reduce()不一定用在数字累加，也可以用在往一个数组或对象中，不断加入新的
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
        const cItem = item.children.find(cItem => path.indexOf(cItem.key) === 0)
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
  //已废弃，现在用useEffect
  UNSAFE_componentWillMount () {
     this.menuNodes = this.getMenuNodes(menuList)
  }

  render(){
    //需要withRouter该包装非路由组件，才能获取到location，从而得到当前请求的路由路径
    let path = this.props.location.pathname
    console.log('render()', path)
    if(path.indexOf('/product') === 0){ //当前请求的是商品或其子路由界面
      path = '/product'
    }
    //得到需要展开菜单项的key
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
          //defaultSelectedKeys初始选中的菜单项 key 数组;selectedKeys当前需要展开的选中的菜单项 key 数组，更好用
          selectedKeys={[path]}
          defaultOpenKeys={[openkey]}
        >
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
