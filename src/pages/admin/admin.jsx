import React from 'react'
import { Redirect } from 'react-router-dom';
import memoryUtils from '../../utils/memoryUtils';

class Admin extends React.Component {

  render(){
    const user = memoryUtils.user
    //如果内存中没有存储user，则说明当前没登录
    if (!user || !user._id) {
      //自动跳转到登录页面（在render()中）
      return <Redirect to="/login"/>
    }
    return (
      <div className="admin">
      Hello {user.username}
      </div>
    );
  }
}

export default Admin;
