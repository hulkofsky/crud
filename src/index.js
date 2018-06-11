import React from 'react';
import ReactDOM from 'react-dom';
import { Provider} from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers' 
import App from './App'
import './main.sass'
import { RECEIVE_USERS, RECEIVE_FIELDS } from './constants';

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

fetch('http://localhost:8080/src/db/fields.json').then(res => res.json()).then(fields => {
  store.dispatch({ type: RECEIVE_FIELDS, payload: fields});
})

fetch('http://localhost:8080/src/db/users.json').then(res => res.json()).then(users => {
  store.dispatch({ type: RECEIVE_USERS, payload: users});
})

ReactDOM.render(<Provider store={store}>
                  <App />
                </Provider>, 
                document.getElementById('root'));