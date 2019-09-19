import React from 'react';
import NewTodo from './NewTodo/NewTodo';
import TodoCounter from './Counters/TodoCounter';
import UserCounter from './Counters/UserCounter';
import getTodosWithUsers from './utils/getTodosWithUsers';

import './App.css';

import todos from './api/todos';
import users from './api/users';

const preparedTodos = getTodosWithUsers(todos, users);

class App extends React.Component {
  state = {
    todosCounter: todos.length,
  };

  updateTodosCounter =() => {
    this.setState(prevState => ({ todosCounter: prevState.todosCounter + 1 }));
  };

  render() {
    const { todosCounter } = this.state;

    return (
      <div className="App">
        <h1>Static list of todos</h1>
        <TodoCounter todos={todosCounter} />
        <UserCounter users={users} />
        <div className="container">
          <NewTodo
            users={users}
            todos={preparedTodos}
            todosCounter={this.updateTodosCounter}
          />
        </div>
      </div>
    );
  }
}

export default App;
