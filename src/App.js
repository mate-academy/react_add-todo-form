import React from 'react';
import { TodoList } from './components/TodoList';
import { Form } from './components/Form';
import './app.scss';

import users from './api/users';
import todos from './api/todos';

export const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => todo.userId === user.id),
}));

export class App extends React.Component {
  state = {
    todoList: [...preparedTodos],
    userList: [...users],
    id: preparedTodos[preparedTodos.length - 1].id + 1,
  }

  addTodo = (title, selected) => {
    const currentUser = users.find(user => (
      user.name === selected
    ));

    this.setState(state => ({
      todoList: [...state.todoList,
        {
          id: state.id,
          userId: currentUser,
          title,
          user: currentUser,
        },
      ],
    }));
  }

  render() {
    const { todoList, userList } = this.state;

    return (
      <div className="app">
        <h1 className="app__title">Add todo form</h1>
        <p className="app__text">
          <span>Users: </span>
          {users.length}
        </p>
        <Form
          userList={userList}
          addTodo={this.addTodo}
        />
        <TodoList todoList={todoList} />
      </div>
    );
  }
}
