import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/main.css';
import BoardX from './board/BoardX';
import BoardY from './board/BoardY';
import Ships from './board/Ships';


import * as serviceWorker from './serviceWorker';

ReactDOM.render(<BoardX />, document.getElementById('boardx'));
ReactDOM.render(<BoardY />, document.getElementById('boardy'));
ReactDOM.render(<Ships />, document.getElementById('shipsX'));
ReactDOM.render(<Ships />, document.getElementById('shipsY'));




// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
