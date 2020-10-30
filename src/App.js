import React from 'react';
import './App.css';

import todos from './api/todos';
import users from './api/users';

import { TodoList } from './components/TodoList';
import { AddTodo } from './components/AddTodo';

export class App extends React.Component {
  state = {
    todos: [],
  };

  componentDidMount() {
    const preparedTodos = todos.map(todo => ({
      ...todo,
      user: users.find(user => user.id === todo.userId),
    }));

    this.setState({
      todos: preparedTodos,
    });
  }

  addTodo = (todo) => {
    this.setState(prevState => ({
      todos: [...prevState.todos, {
        ...todo,
        user: users.find(user => user.id === todo.userId),
      }],
    }));
  }

  render() {
    return (
      <div className="App">
        <div className="page-content">
          <h1>List of Todos</h1>
          <TodoList todos={this.state.todos} />
        </div>
        <div className="add-todo">
          <AddTodo
            users={users}
            addTodo={this.addTodo}
          />
        </div>
      </div>
    );
  }
}
