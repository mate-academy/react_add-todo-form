import React from 'react';
import { TodoList } from './components/TodoList';
import './App.css';

import users from './api/users';
import todos from './api/todos';

export class App extends React.Component {
  state = {
    todos: [...todos],
    titleValue: '',
    selectValue: '',
    idCounter: todos.length + 1,
    titleError: false,
    selectError: false,
  }

  changeTitleValue = (event) => {
    this.setState({
      titleValue: event.target.value,
      titleError: false,
    });
  }

  changeSelectValue = (event) => {
    this.setState({
      selectValue: +event.target.value,
      selectError: false,
    });
  }

  addNewTask = (event) => {
    event.preventDefault();

    if (this.state.titleValue.trim().length === 0) {
      this.setState({
        titleError: true,
      });

      return;
    }

    if (+this.state.selectValue === 0) {
      this.setState({
        selectError: true,
      });

      return;
    }

    this.setState(state => ({
      idCounter: state.idCounter + 1,
      todos: [
        ...state.todos,
        {
          userId: state.selectValue,
          id: state.idCounter,
          title: state.titleValue,
          completed: false,
        },
      ],

      titleValue: '',
      selectValue: '',
    }));
  }

  render() {
    return (
      <>
        <div className="App">
          <h1>Add todo form</h1>

          <form
            className="form"
            onSubmit={this.addNewTask}
          >

            <label className="label">
              What to do:
              {' '}

              <input
                className="input"
                type="text"
                name="title"
                value={this.state.titleValue}
                placeholder="type a title here"
                onChange={this.changeTitleValue}
              />

            </label>

            {this.state.titleError && (
              <div className="titleError">
                write a title
              </div>
            )}

            <select
              name="select"
              className="users-list"
              size="6"
              value={this.state.selectValue}
              onChange={this.changeSelectValue}
            >
              <option value="0" key={0}>Choose a user</option>
              {users.map(user => (
                <option value={user.id} key={user.email}>{user.name}</option>
              ))}

            </select>

            {this.state.selectError && (
              <div className="selectError">
                choose a user
              </div>
            )}

            <button
              type="submit"
              className="submit"
            >
              ADD
            </button>

          </form>

          <TodoList users={users} todos={this.state.todos} />

        </div>
      </>
    );
  }
}
