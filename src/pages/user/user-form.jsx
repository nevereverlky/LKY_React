import React from 'react'
import PropTypes from 'prop-types'
import {Form, Input, Select} from 'antd'

//添加/修改用户的form组件
class UserForm extends React.Component {

  formRef = React.createRef();

  static propTypes = {
    setForm: PropTypes.func.isRequired, //用来传递form对象的函数
    roles: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired
  }

  // componentWillMount () {
  //   this.props.setForm(this.props.form)
  // }

  // UNSAFE_componentWillMount() {
  //   // console.log(this.formRef);
  //   this.props.setForm(this.formRef.current);
  // }

  componentDidMount() {
    this.props.setForm(this.formRef.current);
  }

  render(){

    const {roles, user} = this.props
    // const { getFieldDecorator } = this.props.form

    const formItemLayout = {
        labelCol: {span: 4}, //左侧label的宽度
        wrapperCol: {span: 15}, //右侧包裹的宽度
    }

    return (
      // <Form>
      //   <Form.Item label='用户名' {...formItemLayout}>
      //     {
      //       getFieldDecorator('roleName', {
      //         initialValue: '',
      //         rules: [
      //           {required: true, message: '用户名必须输入'}
      //         ]
      //       })(
      //         <Input placeholder='请输入用户名'/>
      //       )
      //     }
      //   </Form.Item>
      // </Form>
      <Form ref={this.formRef} {...formItemLayout}>
        <Form.Item>
          <p>用户名:</p>
          <Form.Item
            noStyle
            name="username"
            initialValue={user.username}
            rules={[
              { required: true, message: '用户名必须输入' },
            ]}
          >
            <Input placeholder="请输入用户名" />
          </Form.Item>
        </Form.Item>
        {
            user._id ? null : (
                <Form.Item>
                    <p>密码:</p>
                    <Form.Item
                        noStyle
                        name="password"
                        initialValue={user.password}
                        rules={[
                        { required: true, message: '密码必须输入' },
                        ]}
                    >
                        <Input type="password" placeholder="请输入密码" />
                    </Form.Item>
                </Form.Item>
            )
        }
        
        <Form.Item>
          <p>手机号:</p>
          <Form.Item
            noStyle
            name="phone"
            initialValue={user.phone}
            rules={[
              { required: true, message: '手机号必须输入' },
            ]}
          >
            <Input placeholder="请输入手机号" />
          </Form.Item>
        </Form.Item>
        <Form.Item>
          <p>邮箱:</p>
          <Form.Item
            noStyle
            name="email"
            initialValue={user.email}
            rules={[
              { required: true, message: '邮箱必须输入' },
            ]}
          >
            <Input placeholder="请输入邮箱" />
          </Form.Item>
        </Form.Item>
        <Form.Item>
          <p>角色:</p>
          <Form.Item
            noStyle
            name="role_id"
            initialValue={user.role_id}
            rules={[
              { required: true, message: '角色必须输入' },
            ]}
          >
            <Select placeholder='请选择角色'>
                {
                    roles.map(role => <Select.Option key={role._id} value={role._id}>{role.name}</Select.Option>)
                }
            </Select>
          </Form.Item>
        </Form.Item>
      </Form>
    )
  }
}

// export default Form.create()(UserForm)
export default UserForm