import React from 'react'
import PropTypes from 'prop-types'
import {Form, Input} from 'antd'

//添加角色的form组件
class AddForm extends React.Component {

  formRef = React.createRef();

  static propTypes = {
    setForm: PropTypes.func.isRequired, //用来传递form对象的函数
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

    // const { getFieldDecorator } = this.props.form

    const formItemLayout = {
        labelCol: {span: 4}, //左侧label的宽度
        wrapperCol: {span: 15}, //右侧包裹的宽度
    }

    return (
      // <Form>
      //   <Form.Item label='角色名称' {...formItemLayout}>
      //     {
      //       getFieldDecorator('roleName', {
      //         initialValue: '',
      //         rules: [
      //           {required: true, message: '角色名称必须输入'}
      //         ]
      //       })(
      //         <Input placeholder='请输入角色名称'/>
      //       )
      //     }
      //   </Form.Item>
      // </Form>
      <Form ref={this.formRef}>
        <Form.Item {...formItemLayout}>
          <p>分类名称:</p>
          <Form.Item
            noStyle
            name="roleName"
            rules={[
              { required: true, message: '角色名称必须输入' },
            ]}
          >
            <Input placeholder="请输入角色名称" />
          </Form.Item>
        </Form.Item>
      </Form>
    )
  }
}

// export default Form.create()(AddForm)
export default AddForm