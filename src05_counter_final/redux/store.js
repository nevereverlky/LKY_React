/**
 * redux最核心的管理对象：store
 */
// import { createStore } from 'redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; //用来实现redux异步的redux中间件插件
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from './reducer'

export default createStore(reducer, composeWithDevTools(applyMiddleware(thunk))) //创建store对象内部会第一次调用reducer() 得到初始状态值