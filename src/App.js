import React from 'react';
import './App.css';

import todos from './api/todos';
import users from './api/users';
import { TodoList } from './components/TodoList/TodoList';
import { AddTodoForm } from './components/AddTodo/AddTodoForm';

class App extends React.Component {
  state = {
    todos: todos.map(todo => ({
      ...todo,
      user: users.find(({ id }) => id === todo.userId),
    })),
  }

  handleAddTodo = (title, author) => {
    this.setState(state => ({
      todos: [
        ...state.todos,
        {
          id: state.todos.length + 1,
          title,
          user: users.find(({ name }) => name === author),
          completed: false,
        },
      ],
    }));
  }

  render() {
    // eslint-disable-next-line
    const { todos } = this.state;

    return (
      <div className="App">
        <AddTodoForm addTodo={this.handleAddTodo} />
        <TodoList todos={todos} />
      </div>
    );
  }
}

export default App;
