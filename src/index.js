import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import createStore from './redux';

ReactDOM.render(<App reduxStore={createStore()}/>, document.getElementById('root'));


