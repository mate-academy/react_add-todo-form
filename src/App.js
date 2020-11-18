/* eslint-disable no-nested-ternary */
import React from 'react';
import './App.css';
import usersFromServer from './api/users';
import todos from './api/todos';
import { TodoList } from './Components/TodoList';
import { Form } from './Components/Form';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: usersFromServer.find(user => todo.userId === user.id),
}));

export default class App extends React.Component {
  state = {
    todoList: preparedTodos,
  }

  addTodo = (user, titleTodo) => {
    this.setState(state => ({
      todoList: [
        ...state.todoList,
        {
          userId: usersFromServer.find(item => item.name === user.name).id,
          id: state.todoList.length + 1,
          title: titleTodo,
          completed: false,
          user,
        },
      ],
    }));
  }

  render() {
    const {
      todoList,
    } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>

        <Form addTodo={this.addTodo} usersFromServer={usersFromServer} />
        <TodoList todoList={todoList} />
        <p>
          <span>Users: </span>
          {usersFromServer.length}
        </p>
      </div>
    );
  }
}
