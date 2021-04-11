import React from 'react';

import todos from './api/todos';
import users from './api/users';

import { Form } from './components/Form';
import { TodoList } from './components/TodoList';

const matchId = id => (
  users.find(user => user.id === id)
);

const userTodos = todos.map(todo => ({
  ...todo,
  user: matchId(todo.userId),
}));

export class App extends React.Component {
  state = {
    tasks: [...userTodos],
  }

  addTodo = (todo, currentUser) => {
    this.setState(({ tasks }) => {
      const newTodo = {
        userId: currentUser,
        id: tasks.length + 1,
        title: todo,
        completed: false,
        user: matchId(currentUser),
      };

      return {
        tasks: [newTodo, ...tasks],
      };
    });
  }

  render() {
    const { tasks } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>
        <Form addTodo={this.addTodo} />
        <TodoList todos={tasks} />
      </div>
    );
  }
}
