import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import ProductHome from './home';
import ProductAddUpdate from './add-update';
import ProductDetail from './detail';

import './product.less'

//商品路由
class Product extends React.Component {

  render(){
    return (
      <Switch>
        <Route path='/product' component={ProductHome} exact/>{/*exact路径完全匹配*/}
        <Route path='/product/addupdate' component={ProductAddUpdate} />
        <Route path='/product/detail' component={ProductDetail} />
        <Redirect to='/product' />
      </Switch>
    );
  }
}

export default Product;