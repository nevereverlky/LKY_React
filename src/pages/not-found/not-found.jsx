import React, {Component} from 'react'
import {Button, Row, Col} from 'antd'
import {connect} from 'react-redux'
import {setHeadTitle} from '../../redux/actions'
import './not-found.less'

/**
 * 前台 404 页面
*/
class NotFound extends Component {

    goHome = () => {
        this.props.setHeadTitle('首页')
        this.props.history.replace('/home')
    }

    render() {
        return (
            <Row className='not-found'>
                <Col span={12} className='left'></Col>
                <Col span={12} className='right'>
                    <h1>404</h1>
                    <h2>抱歉，你访问的页面不存在</h2>
                    <div>
                        <Button type='primary' onClick={this.goHome}>
                        回到首页
                        </Button>
                    </div>
                </Col>
            </Row>
        )
    }
}

export default connect(
    null,
    {setHeadTitle}
)(NotFound)