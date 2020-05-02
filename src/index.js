import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import todos from './api/todos';

ReactDOM.render(<App todos={todos} />, document.getElementById('root'));
