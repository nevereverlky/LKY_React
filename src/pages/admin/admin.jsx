import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import LeftNav from '../../components/left-nav';
import Header from '../../components/header';
import Home from '../home/home';
import Category from '../category/category';
import Product from '../product/product';
import Role from '../role/role';
import User from '../user/user';
import Bar from '../charts/bar';
import Line from '../charts/line';
import Pie from '../charts/pie';
import notFound from '../not-found/not-found';
import { connect } from 'react-redux';
// import memoryUtils from '../../utils/memoryUtils';

const { Footer, Sider, Content } = Layout;

/*
后台管理的路由组件
 */
class Admin extends React.Component {

  render(){
    
    // const user = memoryUtils.user
    const user = this.props.user
    //如果内存中没有存储user，则说明当前没登录
    if (!user || !user._id) {
      //自动跳转到登录页面（在render()中）
      return <Redirect to="/login"/>
    }

    return (
      <Layout style={{minHeight: '100%'}}>
        <Sider>
          <LeftNav/>
        </Sider>
        <Layout>
          <Header/>
          <Content style={{margin: 20, backgroundColor: '#fff'}}>
            <Switch>
              <Redirect from='/' to='/home' exact/>
              <Route path='/home' component={Home}/>
              <Route path='/category' component={Category}/>
              <Route path='/product' component={Product}/>
              <Route path='/role' component={Role}/>
              <Route path='/user' component={User}/>
              <Route path='/charts/bar' component={Bar}/>
              <Route path='/charts/line' component={Line}/>
              <Route path='/charts/pie' component={Pie}/>
              <Route component={notFound}/>{/**上面没有一个匹配的，直接显示 */}
              {/* <Redirect to='/home'/> */}
            </Switch>
          </Content>
          <Footer style={{textAlign: 'center',color: '#cccccc'}}>推荐使用谷歌浏览器，可以获得更佳页面操作</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default connect(
  state => ({user: state.user}),
  {}
)(Admin);
