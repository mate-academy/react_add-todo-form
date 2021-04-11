import React from 'react';
import './App.css';

import { Form } from './components/Form';
import users from './api/users';
import todos from './api/todos';

const getUserById = userId => (
  users.find(user => user.id === userId)
);

const todosWithUsers = todos.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export class App extends React.Component {
  state = {
    allTodos: todosWithUsers,
  }

  addTodo = (newTodoTitle, selectedUserId) => {
    this.setState(({ allTodos }) => {
      const newTodo = {
        userId: selectedUserId,
        id: allTodos.length + 1,
        title: newTodoTitle,
        completed: false,
        user: getUserById(selectedUserId),
      };

      return {
        allTodos: [...allTodos, newTodo],
      };
    });
  }

  render() {
    const { allTodos } = this.state;

    return (
      <div className="App">
        <h1 className="title">Add todo form</h1>

        <ul
          className="list"
        >
          {allTodos.map(todo => (
            <li
              key={todo.id}
              className="item"
            >
              {todo.title}
            </li>
          ))}
        </ul>

        <Form
          users={users}
          addTodo={this.addTodo}
        />
      </div>
    );
  }
}
