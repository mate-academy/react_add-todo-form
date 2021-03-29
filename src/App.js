import React from 'react';
import { TodoList } from './components/TodoList';
import { UserNameList } from './components/UserNameList';
import { Notification } from './components/Notification';
import './App.css';

import users from './api/users';
import todos from './api/todos';

const preparedTodod = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

export class App extends React.PureComponent {
  state = {

    preparedTodod,

    title: '',
    userId: '0',
    hasNotifySelect: false,
    hasNotifyTitle: false,
  };

  updateUser = () => {
    this.setState(prevState => ({
      preparedTodod: [...prevState.preparedTodod,
        {
          title: prevState.title,
          userId: +prevState.userId,
          completed: false,
        },
      ]
        .map(todo => ({
          ...todo,
          user: users.find(user => user.id === todo.userId),
        })),
    }));
  };

  handleChange = (event) => {
    event.preventDefault();

    if (this.state.title.length === 0) {
      this.setState({
        hasNotifyTitle: true,
      });
    }

    if (this.state.userId === '0') {
      this.setState({
        hasNotifySelect: true,
      });
    }

    if (this.state.userId > 0 && this.state.title.length > 0) {
      this.updateUser();
      this.setState({
        title: '',
        userId: '0',
        hasNotifySelect: false,
        hasNotifyTitle: false,
      });
    }
  };

  titleHandle = (inputHandler) => {
    this.setState({
      title: inputHandler.target.value,
    });

    if (this.state.title.length > 0) {
      this.setState({
        hasNotifyTitle: false,
      });
    }
  }

  selectHandler = (selectHandler) => {
    this.setState({
      userId: selectHandler.target.value,
    });

    if (selectHandler.target.value !== '0') {
      this.setState({
        hasNotifySelect: false,
      });
    }
  }

  render() {
    const {
      title,
      userId,
      hasNotifySelect,
      hasNotifyTitle,
    } = this.state;

    return (
      <div className="App">
        <h1 className="App__title">Add todo form</h1>

        <p>
          <span>Users :</span>
        </p>

        <form
          className="form"
          onSubmit={this.handleChange}
        >
          <labe>
            <span className="form__description"> Title:</span>
            <input
              type="text"
              className="form__field"
              placeholder="Title"
              value={title}
              onChange={(event) => {
                this.titleHandle(event);
              }}
            />
          </labe>

          <label>
            <span className="form__description"> User:</span>
            <select
              className="form__field"
              type="text"
              placeholder="User"
              value={userId}
              onChange={(event) => {
                this.selectHandler(event);
              }}
            >
              <option value="0">
                Choose user
              </option>
              <UserNameList users={users} />
            </select>

          </label>

          <button
            className="form__submit"
            type="submit"
          >
            Submit
          </button>
        </form>

        {
        hasNotifySelect && (
          <Notification notifSelect="Please choose a user!" />)
        }
        {
        hasNotifyTitle && (
          <Notification notifSelect="Please enter the title!" />)
        }

        <TodoList list={this.state.preparedTodod} />

      </div>
    );
  }
}
