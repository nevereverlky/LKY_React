import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import 'antd/dist/antd.css'
import App from './App';
import reportWebVitals from './reportWebVitals';
import memoryUtils from './utils/memoryUtils';
import storageUtils from './utils/storageUtils';

//读取local中保存的user,保存到内存中
const user = storageUtils.getUser()
memoryUtils.user = user

ReactDOM.render(
  //<React.StrictMode>
    <App />,
  //</React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
