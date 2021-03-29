import React, { Component } from 'react';
import './App.css';
import TodoList from './components/TodoList/TodoList';
import { ErrorMessage } from './components/ErrorMessage/ErrorMessage';

import todos from './api/todos';
import users from './api/users';

const preparedTodos = todos.map((item) => {
  const user = users.find(human => human.id === item.userId);
  const todo = {
    user,
    ...item,
  };

  return todo;
});

export class App extends Component {
  state = {
    TODOs: preparedTodos,
    title: '',
    userID: 0,
    value: '',
    isTitleEmpty: true,
    isSelectEmpty: true,
  }

  addTodo = (submitEvent) => {
    submitEvent.preventDefault();
    if (!this.state.title.trim()) {
      this.setState({
        isTitleEmpty: false,
      });
    }

    if (this.state.userID === 0) {
      this.setState({
        isSelectEmpty: false,
      });

      return;
    }

    const newTodo = {
      id: this.state.TODOs.length + 1,
      title: this.state.title,
      user: users.find(user => user.id === +this.state.userID),
      userId: this.state.userID,
    };

    this.setState(prevState => ({
      TODOs: [
        ...prevState.TODOs,
        newTodo,
      ],
      title: '',
      userID: 0,
      value: '',
    }));
  }

  handleTyping = (typingEvent) => {
    this.setState({
      title: typingEvent.target.value,
    });
    if (typingEvent.target.value.length !== 0) {
      this.setState({
        isTitleEmpty: true,
      });
    }
  }

  handleSelect = (selectEvent) => {
    this.setState({
      userID: selectEvent.target.value,
      value: selectEvent.target.value,
    });
    if (!this.state.userID !== 0) {
      this.setState({
        isSelectEmpty: true,
      });
    }
  }

  render() {
    const { TODOs, title, value, isTitleEmpty, isSelectEmpty } = this.state;

    return (
      <div className="App">
        <div>
          <h1>List of todos</h1>

          <form onSubmit={this.addTodo}>
            <div className="inputs">
              <label htmlFor="TODO-adder">
                <div className="title">Add a title</div>
                <input
                  onChange={this.handleTyping}
                  autoComplete="off"
                  value={title}
                  id="TODO-adder"
                  placeholder="Here, please"
                />
              </label>

              <div>
                <select
                  value={value}
                  name="user"
                  onChange={this.handleSelect}
                  id="user-select"
                >
                  <option disabled value="">
                    Choose a user
                  </option>
                  {users.map(user => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>

            </div>
            <button type="submit" id="add">Add</button>
          </form>

        </div>
        <div>
          <ErrorMessage
            errorText="Please enter the title"
            state={isTitleEmpty}
          />
          <ErrorMessage
            errorText="Please choose a user"
            state={isSelectEmpty}
          />
          <TodoList props={TODOs} />
        </div>
      </div>
    );
  }
}
