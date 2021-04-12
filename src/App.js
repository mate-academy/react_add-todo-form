import React from 'react';

import todos from './api/todos';
import users from './api/users';

import { Form } from './components/Form';
import { TodoList } from './components/TodoList';

const findUserById = id => (
  users.find(user => user.id === id)
);

const userTodos = todos.map(todo => ({
  ...todo,
  user: findUserById(todo.userId),
}));

export class App extends React.Component {
  state = {
    todoList: [...userTodos],
  }

  addTodo = (todo, currentUser) => {
    this.setState(({ todoList }) => {
      const newTodo = {
        userId: currentUser,
        id: todoList.length + 1,
        title: todo,
        completed: false,
        user: findUserById(currentUser),
      };

      return {
        todoList: [newTodo, ...todoList],
      };
    });
  }

  render() {
    const { todoList } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>
        <Form
          addTodo={this.addTodo}
          users={users}
        />
        <TodoList todoList={todoList} />
      </div>
    );
  }
}
