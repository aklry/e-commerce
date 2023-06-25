import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension'

const store = createStore(() => { }, composeWithDevTools())
ReactDOM.render(
  <Provider store={store}>
    <div>开始写项目了</div>
  </Provider>,
  document.getElementById('root')
);
