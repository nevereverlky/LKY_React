import React from 'react'
import PropTypes from 'prop-types'
import {Form, Input} from 'antd'

//更新分类的form组件
class UpdateForm extends React.Component {

  formRef = React.createRef()

  static propTypes = {
    categoryName: PropTypes.string.isRequired,
    setForm: PropTypes.func.isRequired
  }

  // componentWillMount () {
  //   // 将form对象通过setForm()传递父组件
  //   this.props.setForm(this.props.form)
  // }

  componentDidMount() {
    // console.log(this.formRef);
    this.props.setForm(this.formRef.current);
  }

  render(){

    const {categoryName} = this.props
    // const { getFieldDecorator } = this.props.form

    return (
      <Form ref={this.formRef}>
        <Form.Item
          name="categoryName"
          initialValue={categoryName}
          rules={[
            { required: true, message: '分类名称必须输入' },
          ]}
        >
          <Input placeholder="请输入分类名称" />
        </Form.Item>
      </Form >
      // <Form>
      //   <Form.Item>
      //     {
      //       getFieldDecorator('categoryName', {
      //         initialValue: categoryName,
      //         rules: [
      //           {required: true, message: '分类名称必须输入'}
      //         ]
      //       })(
      //         <Input placeholder='请输入分类名称'/>
      //       )
      //     }
      //   </Form.Item>
      // </Form>
    )
  }
}

// export default Form.create()(UpdateForm)
export default UpdateForm