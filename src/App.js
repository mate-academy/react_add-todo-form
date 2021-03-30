import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';

import { TodoList } from './components/TodoList';
import { AddTodoForm } from './components/AddTodoForm';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

class App extends React.Component {
  state = {
    todos: [...preparedTodos],
  }

  addTodo = ({ title, userId }) => {
    this.setState((prevState) => {
      const todo = {
        title,
        id: prevState.todos.length + 1,
        user: users.find(user => user.id === userId),
      };

      return ({
        todos: [...prevState.todos, todo],
      });
    });
  }

  render() {
    return (
      <div className="App">
        <AddTodoForm users={users} addTodo={this.addTodo} />
        <TodoList todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
