import React from 'react';
import './App.css';

import { Form } from './components/Form';
import users from './api/users';
import todosFromServer from './api/todos';

const getUserById = userId => (
  users.find(user => user.id === userId)
);

const todosWithUsers = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export class App extends React.Component {
  state = {
    todos: todosWithUsers,
  }

  addTodo = (newTodoTitle, selectedUserId) => {
    this.setState(({ todos }) => {
      const newTodo = {
        userId: selectedUserId,
        id: todos[todos.length - 1].id + 1,
        title: newTodoTitle,
        completed: false,
        user: getUserById(selectedUserId),
      };

      return {
        todos: [...todos, newTodo],
      };
    });
  }

  render() {
    const { todos } = this.state;

    return (
      <div className="App">
        <h1 className="title">Add todo form</h1>

        <ul
          className="list"
        >
          {todos.map(todo => (
            <li
              key={todo.id}
              className="item"
            >
              <div>
                {todo.title}
              </div>
              <div className="user-name">
                {todo.user.name}
              </div>
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
