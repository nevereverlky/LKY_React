// import './App.css';
import { HashRouter, Route, Switch } from 'react-router-dom';

import Login from './pages/login/login'
import Admin from './pages/admin/admin'

function App() {

  return (
    /**新版的react路由使用方式改了，需要引入 Routes 作为 Route 的父级标签（最新版本6中Routes代替Switch了），不然会报错，语法也发生了变化，component换成了element，组件要用标签包裹 */
    /**相比使用<BrowserRouter>，<HashRouter>，路由会带#号，功能都正常实现，但商品模块指定商品详情无法获取，具体如何修改见相应组件*/
    /**使用<BrowserRouter>，在生产环境会出现 404 问题，需自定义中间件去读取返回 index 页面展现（相当于配了后台的404页面）去解决*/
    // <BrowserRouter>
    <HashRouter>
      <Switch>{/* 只匹配其中一个 */}
      {/*<Routes>*/}
        <Route path='/login' component={Login}></Route>
        {/*<Route path='/login' element={Login}></Route>*/}
        <Route path='/' component={Admin}></Route>
      </Switch>
      {/*</Routes>*/}
    </HashRouter>
    // </BrowserRouter>
  );
}

export default App;
