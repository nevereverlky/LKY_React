// import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './pages/login/login'
import Admin from './pages/admin/admin'

function App() {

  return (
    /**新版的react路由使用方式改了，需要引入 Routes 作为 Route 的父级标签（最新版本6中Routes代替Switch了），不然会报错，语法也发生了变化，component换成了element，组件要用标签包裹 */
    <BrowserRouter>
      <Switch>{/* 只匹配其中一个 */}
      {/*<Routes>*/}
        <Route path='/login' component={Login}></Route>
        {/*<Route path='/login' element={Login}></Route>*/}
        <Route path='/' component={Admin}></Route>
      </Switch>
      {/*</Routes>*/}
    </BrowserRouter>
  );
}

export default App;
