import React from 'react'
import {Modal, Card, Button, Table, message} from 'antd'
import { PAGE_SIZE } from '../../utils/constants'
import {reqRoles, reqAddRole, reqUpdateRole} from '../../api' 
import AddForm from './add-form'
import AuthForm from './auth-form'
// import memoryUtils from '../../utils/memoryUtils'
import { connect } from 'react-redux'
import { logout } from '../../redux/actions'
// import storageUtils from '../../utils/storageUtils'
import {formateDate} from '../../utils/dateUtils'

//角色管理路由
class Role extends React.Component {

  state = {
    roles:[], //所有角色的列表
    role: {}, //选中的role
    isShowAdd: false, //是否显示添加界面
    isShowAuth: false, //是否显示设置权限界面
  }

  constructor (props) {
    super(props);
    //创建容器
    this.auth = React.createRef()
  }

  initColumn = () => {
    this.columns = [
      {
        title: '角色名称',
        dataIndex: 'name',
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        render: (create_time) => formateDate(create_time)
      },
      {
        title: '授权时间',
        dataIndex: 'auth_time',
        render: formateDate
      },
      {
        title: '授权人',
        dataIndex: 'auth_name'
      }
    ]
  }

  getRoles = async () => {
    const result = await reqRoles()
    if(result.status === 0){
      const roles = result.data
      this.setState({
        roles
      })
    }
  }

  onRow=(role) => {
    return {
      onClick: event => { //点击行
        console.log('row', role)
        this.setState({
          role
        })
      }
    }
  }

  //添加角色
  addRole = () => {
    //进行表单验证，只能通过了才向下处理
    this.form.validateFields(async (error, values) => {
      if(!error) {
        //隐藏确认框
        this.setState({
          isShowAdd: false
        })
        //收集输入数据
        const {roleName} = values;
        //清空输入数据
        this.form.resetFields();
        //请求添加
        const result = await reqAddRole(roleName);
        //根据结果提示/更新列表显示
        if(result.status === 0){
          message.success('添加角色成功')
          //1. 发送请求的更新方式
          //this.getRoles()
          //2. 不发送请求的更新方式
          //新产生的角色
          const role = result.data
          //更新roles状态
          //const roles = this.state.roles
          //react建议尽量不要直接去更新状态数据，如果要更新就先产生一个新的再去setState
          // const roles = [...this.state.roles]
          // roles.push(role);
          // this.setState({
          //   roles
          // })
          //3. 最推荐的更新方式
          //更新roles状态：基于原本状态数据更新
          //传对象语法是传函数语法的简洁语法
          //传函数语法是传对象语法的原始语法
          this.setState(state => ({
            roles: [...state.roles, role]
          }))
        } else {
          message.error('添加角色失败')
        }
      }
    })
  }

  //更新角色
  updateRole = async() => {

    //隐藏确认框
    this.setState({
      isShowAuth: false
    })

    const role = this.state.role;
    //得到最新的menus
    const menus = this.auth.current.getMenus()
    role.menus = menus
    role.auth_time = Date.now()
    // role.auth_name = memoryUtils.user.username
    role.auth_name = this.props.user.username
    //请求更新
    const result = await reqUpdateRole(role)
    if(result.status === 0) {
      //this.getRoles()
      //如果当前更新的是自己角色的权限，则强制退出
      // if(role._id === memoryUtils.user.role_id) {
      if(role._id === this.props.user.role_id) {
        // memoryUtils.user = {}
        // storageUtils.removeUser()
        // this.props.history.replace('/login')
        this.props.logout()
        message.success('当前用户角色权限修改成功，请重新登录')
      } else {
        message.success('设置角色权限成功')
        this.setState({
          roles: [...this.state.roles]
        })
      }
    } else {
      message.error('设置角色权限失败')
    }
  }

  componentWillMount() {
    this.initColumn()
  }

  componentDidMount() {
    this.getRoles()
  }

  render(){

    const {roles, role, isShowAdd, isShowAuth} = this.state

    const title = (
      <span>
        <Button type='primary' onClick={() => this.setState({isShowAdd: true})}>创建角色</Button>&nbsp;&nbsp;
        <Button type='primary' disabled={!role._id} onClick={() => this.setState({isShowAuth: true})}>设置角色权限</Button>
      </span>
    )

    return (
      <Card title={title}>
        <Table
          bordered
          rowKey='_id'
          dataSource={roles}
          columns={this.columns}
          pagination={{defaultPageSize: PAGE_SIZE}}
          rowSelection={{
            type: 'radio', 
            selectedRowKeys: [role._id],
            rowSelection: (role) => { //选择某个radio的回调
              this.setState({
                role
              })
            }
          }}
          onRow={this.onRow}
        />
        <Modal
          title="添加角色"
          visible={isShowAdd}
          onOK={this.addRole}
          onCancel={() => {
            this.setState({isShowAdd: false})
            this.form.resetFields()
          }}
        >
          <AddForm
            setForm={(form) => {this.form = form}}
          />
        </Modal>
        <Modal
          title="设置角色权限"
          visible={isShowAuth}
          onOK={this.updateRole}
          onCancel={() => {
            this.setState({isShowAuth: false})
          }}
        >
          <AuthForm
            ref={this.auth}
            role={role}
          />
        </Modal>
      </Card>
    );
  }
}

export default connect(
  state => ({user: state.user}),
  {logout}
)(Role);