import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from './lib/react-redux';
import App from './containers/App';
import store from './redux/store'

// ReactDOM.render(
//     //<React.StrictMode>
//     <App store={store}/>,
//     //</React.StrictMode>,
//     document.getElementById('root')
// );
ReactDOM.render(
    (<Provider store={store}>
        <App/>
    </Provider>), 
    document.getElementById('root')
);