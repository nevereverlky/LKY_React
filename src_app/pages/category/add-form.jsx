import React from 'react'
import PropTypes from 'prop-types'
import {Form, Select, Input} from 'antd'

//添加分类的form组件
class AddForm extends React.Component {

  formRef = React.createRef();

  static propTypes = {
    setForm: PropTypes.func.isRequired, //用来传递form对象的函数
    categorys: PropTypes.array.isRequired, //一级分类的数组
    parentId: PropTypes.string.isRequired //父分类的ID
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

    const {categorys, parentId} = this.props
    // const { getFieldDecorator } = this.props.form

    return (
      // <Form>
      //   <Form.Item>
      //     {
      //       getFieldDecorator('parentId', {
      //         initialValue: parentId
      //       })(
      //         <Select>
      //           <Select.Option value='0'>一级分类</Select.Option>
      //           {
      //             categorys.map(c => <Select.Option value={c._id}>{c.name}</Select.Option>)
      //           }
      //         </Select>
      //       )
      //     }

      //   </Form.Item>

      //   <Form.Item>
      //     {
      //       getFieldDecorator('categoryName', {
      //         initialValue: '',
      //         rules: [
      //           {required: true, message: '分类名称必须输入'}
      //         ]
      //       })(
      //         <Input placeholder='请输入分类名称'/>
      //       )
      //     }
      //   </Form.Item>
      // </Form>
      <Form ref={this.formRef}>
        <Form.Item>
          <p>所属分类:</p>
          <Form.Item
            noStyle
            name="parentId"
            initialValue={parentId}>
            <Select value={parentId} style={{ width: "100%" }}>
              <Select.Option value='0'>一级分类</Select.Option>
              {
                categorys.map((item) => {
                  return <Select.Option key={item._id} value={item._id}>{item.name}</Select.Option>
                })
              }
            </Select>
          </Form.Item>
        </Form.Item>
        <Form.Item>
          <p>分类名称:</p>
          <Form.Item
            noStyle
            name="categoryName"
            rules={[
              { required: true, message: '分类名称必须输入' },
            ]}
          >
            <Input placeholder="请输入分类名称" />
          </Form.Item>
        </Form.Item>
      </Form>
    )
  }
}

// export default Form.create()(AddForm)
export default AddForm