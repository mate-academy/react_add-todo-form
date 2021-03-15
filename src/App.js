import React from 'react';

import { TodoList } from './components/TodoList';
import users from './api/users';

import './App.css';

class App extends React.Component {
  state = {
    todos: [],
    title: '',
    userId: '',
    canErrorsBeVisible: false,
  }

  onChangeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  submitHandler = (event) => {
    event.preventDefault();

    const { todos, title, userId } = this.state;

    const id = todos.length ? todos[todos.length - 1].id + 1 : 0;

    if (title && userId) {
      this.setState(prevState => ({
        todos: [...prevState.todos, {
          id,
          title,
          userId,
          userName: users.find(user => user.id === +userId).username,
        }],
        title: '',
        userId: '',
        canErrorsBeVisible: false,
      }));
    } else {
      this.setState({
        canErrorsBeVisible: true,
      });
    }
  }

  render() {
    const { onChangeHandler, submitHandler,
      state: { todos, title, userId, canErrorsBeVisible } } = this;

    return (
      <div className="App">
        <h1>Add todo form</h1>

        <form onSubmit={submitHandler}>
          <label>
            <input
              name="title"
              placeholder="to do"
              value={title}
              onChange={onChangeHandler}
            />
            <span>
              {!title && canErrorsBeVisible && 'Please enter the title'}
            </span>
          </label>

          <label>
            <select
              name="userId"
              value={userId}
              onChange={onChangeHandler}
            >
              <option value="">Choose a user</option>
              {users.map(user => (
                <option value={user.id} key={user.id}>{user.username}</option>
              ))}
            </select>
            <span>
              {!userId && canErrorsBeVisible && 'Please choose a user'}
            </span>
          </label>
          <button type="submit">
            Add
          </button>
        </form>

        <TodoList todos={todos} />
      </div>
    );
  }
}

export default App;
