import React from 'react';
import './App.css';

import todos from './api/todos';
import users from './api/users';
import { TodoList } from './components/TodoList/TodoList';
import { AddTodoForm } from './components/AddTodo/AddTodoForm';

class App extends React.Component {
  state = {
    preparedTodos: todos.map(todo => ({
      ...todo,
      user: users.find(({ id }) => id === todo.userId),
    })),
    authors: users,
  }

  addTodoHandler = (title, author) => {
    this.setState(state => ({
      preparedTodos: [
        ...state.preparedTodos,
        {
          id: state.preparedTodos.length + 1,
          title,
          user: users.find(({ name }) => name === author),
          completed: false,
        },
      ],
    }));
  }

  render() {
    const { preparedTodos, authors } = this.state;

    return (
      <div className="App">
        <AddTodoForm authors={authors} addTodo={this.addTodoHandler} />
        <TodoList todos={preparedTodos} />
      </div>
    );
  }
}

export default App;
