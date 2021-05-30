import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';

import { TodoList } from './components/TodoList';
import { AddTodoForm } from './components/AddTodoForm';

const getUserById = userId => (
  users.find(user => user.id === userId)
);

const todosWithUsers = todos.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

class App extends React.Component {
  state = {
    workingTodos: todosWithUsers,
  }

  addTodo = (title, userId, id) => {
    const newTodo = {
      id,
      title,
      userId,
      user: getUserById(userId),
    };

    this.setState(state => ({
      workingTodos: [...state.workingTodos, newTodo],
    }));
  }

  render() {
    const { workingTodos } = this.state;
    const formProps = {
      lengthForId: workingTodos.length,
      onAdd: this.addTodo,
    };

    return (
      <div className="App">
        <h1 className="title">Add Todo</h1>
        <AddTodoForm {...formProps} />

        <TodoList todos={workingTodos} />
      </div>
    );
  }
}

export default App;
