import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './global.css'
import Routes from './router'
import { store } from './store'
ReactDOM.render(
  <Provider store={store}>
    { Routes }
  </Provider>,
  document.getElementById('root')
);

//设置html字体大小,即设置单位rem的大小
window.onload = function () {
  document.documentElement.style.fontSize = (document.documentElement.clientWidth / 750) * 100 + 'px'
}

window.onresize = function () {
  document.documentElement.style.fontSize = (document.documentElement.clientWidth / 750) * 100 + 'px'
}
