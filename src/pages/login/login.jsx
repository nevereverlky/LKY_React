import React from 'react'
import './login.less'
import logo from '../../assets/images/logo.png'
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {reqLogin} from '../../api/index'
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';
import { Redirect } from 'react-router-dom';

//const Item = Form.Item;
/*
登录的路由组件
 */
class Login extends React.Component {

  //提交表单且数据验证成功后回调事件
  onFinish = async(values) => {
    console.log('提交登录的ajax请求: ', values);//得到输入的表单数据
    //请求登录
    const {username, password} = values
    const result = await reqLogin(username,password)
    if (result.status === 0) {
      message.success('登录成功')
      const user = result.data
      memoryUtils.user = user//保存在内存中
      storageUtils.saveUser(user)//保存到local中
      //不需要再回退到登陆页面，则用replace，否则用push        
      this.props.history.replace('/')
    } else {
      message.error(result.msg)
    }

    //reqLogin(username, password).then(response => {
    //   console.log(response.data)
    // }).catch(error => {
    //   console.log(error)
    // })
  };

  render(){

    //如果用户已经登录，自动跳转到管理界面
    const user = memoryUtils.user
    if (user && user._id){
      return <Redirect to="/"/>
    }

    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="logo"/>
          <h1>React项目：后台管理系统</h1>
        </header>
        <section className="login-content">
          <h2>用户登陆</h2>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={this.onFinish}
          >
            <Form.Item
              name="username"
              //声明式验证：直接使用定义好的验证规则进行验证
              rules={[
                {
                  required: true,
                  whitespace: true,//空格
                  message: '请输入用户名',
                },
                {
                  min: 4,
                  message: '用户名至少4位',
                },
                {
                  max: 12,
                  message: '用户名最多12位',
                },
                {
                  pattern: /^[a-zA-Z0-9_]+$/,//正则表达式/^*/中填入[a-zA-Z0-9_]+$
                  message: '用户名需由英文、数字或下划线组成',
                }
              ]}
              initialValue="admin"//指定初始值
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} 
              placeholder="用户名" />
            </Form.Item>
            <Form.Item
              name="password"
              //自定义式验证
              rules={[
                {
                  validator: (rules, value) => {
                    //value ? Promise.resolve() : Promise.reject(new Error('请输入密码')),
                    if (!value) {
                      return Promise.reject(new Error('请输入密码'))
                    } else if (value.length < 4) {
                      return Promise.reject(new Error('密码至少4位'))
                    } else if (value.length > 12) {
                      return Promise.reject(new Error('密码最多12位'))
                    } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
                      return Promise.reject(new Error('密码需由英文、数字或下划线组成'))
                    } else {
                      return Promise.resolve()//验证通过
                    }
                  }
                }
              ]}
              initialValue="admin"
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="密码"
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    );
  }
}

export default Login;
