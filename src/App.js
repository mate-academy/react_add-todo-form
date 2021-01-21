import React from 'react';
import './App.css';
import { TodoList } from './components/TodoList/TodoList';
import { Error } from './components/Error/Error';

import users from './api/users';
import todos from './api/todos';

const prepearedtodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

class App extends React.Component {
  state = {
    todoTitle: '',
    userName: '',
    todosOnPage: prepearedtodos,
    valid: true,
  }

  changeHandler = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  }

  submitHandler = (e) => {
    e.preventDefault();

    const { todoTitle, userName } = this.state;

    if (todoTitle && userName) {
      this.setState(state => ({
        valid: true,
        todosOnPage: [...state.todosOnPage, {
          title: todoTitle,
          completed: false,
          id: state.todosOnPage[state.todosOnPage.length - 1].id + 1,
          user: {
            ...users.find(user => user.name === userName),
          },
        }],
        todoTitle: '',
        userName: '',
      }));
    } else {
      this.setState({
        valid: false,
      });
    }
  }

  render() {
    const { todoTitle, userName, todosOnPage, valid } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>

        <form
          action=""
          method="POST"
          onSubmit={this.submitHandler}
        >
          <label htmlFor="todo">
            What to do:
            {' '}
          </label>
          <input
            type="text"
            id="todo"
            placeholder="todo"
            name="todoTitle"
            value={todoTitle}
            onChange={this.changeHandler}
            onClick={(e) => {
              // eslint-disable-next-line
              e.target.placeholder = '';
            }}
          />
          <br />

          <label htmlFor="todo-user">
            Who should do:
            {' '}
            {' '}
          </label>
          <select
            name="userName"
            id="todo-user"
            value={userName}
            onChange={this.changeHandler}
          >
            <option>Choose user</option>
            {users.map(user => (
              <option
                key={user.id}
                value={user.name}
              >
                {user.name}
              </option>
            ))}
          </select>
          <br />
          <button
            type="submit"
          >
            Add new todo
          </button>
        </form>

        {!valid ? <Error /> : null}

        <p>
          <span>Users: </span>
          {users.length}
        </p>

        <TodoList todos={todosOnPage} />
      </div>
    );
  }
}

export default App;
