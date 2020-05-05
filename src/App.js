import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';
import NewTodo from './components/NewTodo';

const preparedTodos = todos.map(item => (
  {
    ...item,
    user: users.find(user => (user.id === item.id)),
  }
));

class App extends React.Component {
  state = {
    preparedTodos,
  }

  render() {
    return (
      <div className="App">
        <NewTodo preparedTodos={this.state.preparedTodos} />
      </div>
    );
  }
}

export default App;
