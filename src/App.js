import React from 'react';
import { TodoList } from './components/TodoList/TodoList';
import { NewTodoForm } from './components/NewTodoForm/NewTodoForm';
import './App.scss';

import todos from './api/todos';
import users from './api/users';

class App extends React.Component {
  state = {
    todos: todos.map(todo => ({
      ...todo,
      user: users.find(user => user.id === todo.userId),
    })),
  }

  setNewTodo = (todo) => {
    this.setState(state => ({
      todos: [...state.todos, todo],
    }));
  }

  changeStatus = (id, status) => {
    this.setState(state => ({
      todos: state.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: status,
          };
        }

        return todo;
      }),
    }));
  }

  render() {
    return (
      <div className="app">
        <h1>Add todo form</h1>

        <p>
          <span>Users: </span>
          {users.length}
        </p>
        <NewTodoForm
          todos={this.state.todos}
          users={users}
          todosLength={todos.length}
          setNewTodo={this.setNewTodo}
        />
        <TodoList
          todos={this.state.todos}
          changeStatus={this.changeStatus}
        />
      </div>
    );
  }
}

export default App;
