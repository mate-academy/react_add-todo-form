/* eslint-disable no-nested-ternary */
import React from 'react';
import './App.css';

import usersFromServer from './api/users';
import todos from './api/todos';
import { TodoList } from './Components/TodoList/TodoList';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: usersFromServer.find(user => todo.userId === user.id),
}));

export default class App extends React.Component {
  state = {
    todoList: preparedTodos,
    users: usersFromServer,
    executor: '',
    titleTodo: '',
    visibilitySelectedUser: false,
    addTaskAlert: false,
  }

  handleSubmit = (event) => {
    event.preventDefault();
  };

  addTodo = () => {
    const { users, executor, todoList, titleTodo } = this.state;
    const selectedUser = users.find(user => user.name === executor);

    if (!executor || !titleTodo) {
      this.setState({
        visibilitySelectedUser: !executor,
        addTaskAlert: !titleTodo,
      });

      return;
    }

    this.setState(state => ({
      todoList: [
        ...state.todoList,
        {
          title: state.titleTodo,
          user: selectedUser,
          id: todoList.length + 1,
          completed: false,
        },
      ],
      executor: '',
      titleTodo: '',
      visibilitySelectedUser: false,
      addTaskAlert: false,
    }));
  }

  render() {
    const {
      todoList,
      users,
      visibilitySelectedUser,
      addTaskAlert,
    } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>
        {addTaskAlert
          ? (<span className="">Please, write a task for user</span>)
          : (visibilitySelectedUser
            ? (<span className="chooseUser">Please, choose a user</span>) : '')
        }

        <form onSubmit={this.handleSubmit}>
          <label
            htmlFor="title"
            className="itemForm"
          >
            <input
              id="title"
              name="title"
              type="text"
              placeholder="Input Tittle"
              value={this.state.titleTodo}
              onChange={event => this.setState({
                titleTodo: event.target.value.trimLeft(),
                addTaskAlert: false,
              })}
            />
          </label>

          <select
            value={this.state.executor}
            onChange={(event) => {
              this.setState({
                executor: event.target.value,
              });
            }}
            className="itemForm"
          >
            <option value="Choose a user">Choose a user</option>
            {users.map(user => (
              <option
                key={user.i
                }
                name="name"
                value={user.name}
              >
                {user.name}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={this.addTodo}
            className="itemForm"
          >
            Add TODO
          </button>
        </form>
        <TodoList preparedTodos={todoList} />
        <p>
          <span>Users: </span>
          {usersFromServer.length}
        </p>
      </div>
    );
  }
}
