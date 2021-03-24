import React from 'react';
import { TodoList } from './components/TodoList';
import { UserNameList } from './components/UserNameList';
import { Notification } from './components/Notification';
import './App.css';

import users from './api/users';
import todos from './api/todos';

export class App extends React.PureComponent {
  state = {

    preparedTodod: todos.map(todo => ({
      ...todo,
      user: users.find(user => user.id === todo.userId),
    })),

    title: '',
    selected: 0,
    notify: false,
    notifyTitle: false,
  };

  render() {
    const UpdateUser = () => {
      this.setState(prevState => ({
        preparedTodod: [...prevState.preparedTodod,
          {
            title: prevState.title,
            userId: +prevState.selected,
            completed: false,
          },
        ]
          .map(todo => ({
            ...todo,
            user: users.find(user => user.id === todo.userId),
          })),
      }));
    };

    return (
      <div className="App">
        <h1 className="App__title">Add todo form</h1>

        <p>
          <span>Users :</span>
        </p>

        <form
          className="form"
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <labe>
            <span className="form__description"> Title:</span>
            <input
              type="text"
              className="form__field"
              placeholder="Title"
              value={this.state.title}
              onChange={(inputHandler) => {
                this.setState({
                  title: inputHandler.target.value,
                });
              }}
            />
          </labe>

          <label>
            <span className="form__description"> User:</span>
            <select
              className="form__field"
              type="text"
              placeholder="User"
              value={this.state.selected}
              onChange={(event) => {
                this.setState({
                  selected: event.target.value,
                });
              }}
            >
              <option value={0}>
                Choose user
              </option>
              <UserNameList users={users} />
            </select>

          </label>

          <button
            className="form__submit"
            type="submit"
            onClick={
              () => {
                if (this.state.title.length === 0) {
                  this.setState({
                    notifyTitle: true,
                  });
                } else {
                  this.setState({
                    notifyTitle: false,
                  });
                }

                if (this.state.selected === 0) {
                  this.setState({
                    notify: true,
                  });
                } else {
                  this.setState({
                    notify: false,
                  });
                }

                if (this.state.selected > 0 && this.state.title.length > 0) {
                  UpdateUser();
                  this.setState({
                    title: '',
                    selected: 0,
                    notify: false,
                    notifyTitle: false,
                  });
                }
              }
            }
          >
            Submit
          </button>
        </form>

        {
        this.state.notify
          ? <Notification notify="Please choose a user!" />
          : null

        }
        {
        this.state.notifyTitle
          ? <Notification notify="Please enter the title!" />
          : null
        }
        <TodoList list={this.state.preparedTodod} />

      </div>
    );
  }
}
