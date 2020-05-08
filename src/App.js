/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import NewTodo from './Components/NewTodo/NewTodo';
import { TodoList } from './Components/TodoList/TodoList';
import './App.css';

import users from './api/users';
import todos from './api/todos';

class App extends React.Component {
  state = {
    todosList: todos.map(todo => ({
      ...todo,
      user: users.find(user => user.id === todo.userId),
    })),
  };

  render() {
    const { todosList } = this.state;

    return (
      <div className="App">
        <h1 className="App__heading">
          todos
        </h1>

        <NewTodo users={users} todos={todosList} />

        <TodoList
          todos={todosList}
          setStatus={this.handleCompleteChange}
        />

      </div>
    );
  }
}

export default App;
