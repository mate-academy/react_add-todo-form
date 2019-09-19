import React from 'react';
import NewTodo from './NewTodo/NewTodo';
import TodoCounter from './Counters/TodoCounter';
import UserCounter from './Counters/UserCounter';
import getTodosWithUsers from './utils/getTodosWithUsers';
import TodoList from './TodoList/TodoList';

import './App.css';

import todos from './api/todos';
import users from './api/users';

const preparedTodos = getTodosWithUsers(todos, users);

class App extends React.Component {
  state = {
    todosList: preparedTodos,
  };

  handleAddTodo = (newTodo) => {
    this.setState(prevState => ({
      todosList: [...prevState.todosList, newTodo],
    }));
  };

  render() {
    const { todosList } = this.state;

    return (
      <div className="app">
        <h1>Static list of todos</h1>
        <TodoCounter todos={todosList.length} />
        <UserCounter users={users} />
        <div className="container">
          <NewTodo
            users={users}
            todoID={todosList.length + 1}
            onAdd={this.handleAddTodo}
          />
          <div className="todo-list">
            <TodoList todos={todosList} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
