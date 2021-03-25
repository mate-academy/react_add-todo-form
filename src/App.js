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
    selected: '0',
    notifSelect: false,
    notifyTitle: false,
  };

  render() {
    const {
      title,
      selected,
      notifSelect,
      notifyTitle,
      preparedTodod,
    } = this.state;

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

    const handleChange = (event) => {
      event.preventDefault();

      if (title.length === 0) {
        this.setState({
          notifyTitle: true,
        });
      }

      if (selected === '0') {
        this.setState({
          notifSelect: true,
        });
      }

      if (selected > 0 && title.length > 0) {
        UpdateUser();
        this.setState({
          title: '',
          selected: '0',
          notifSelect: false,
          notifyTitle: false,
        });
      }
    };

    return (
      <div className="App">
        <h1 className="App__title">Add todo form</h1>

        <p>
          <span>Users :</span>
        </p>

        <form
          className="form"
          onSubmit={handleChange}
        >
          <labe>
            <span className="form__description"> Title:</span>
            <input
              type="text"
              className="form__field"
              placeholder="Title"
              value={title}
              onChange={(inputHandler) => {
                this.setState({
                  title: inputHandler.target.value,
                });

                if (title.length > 0) {
                  this.setState({
                    notifyTitle: false,
                  });
                }
              }}
            />
          </labe>

          <label>
            <span className="form__description"> User:</span>
            <select
              className="form__field"
              type="text"
              placeholder="User"
              value={selected}
              onChange={(event) => {
                this.setState({
                  selected: event.target.value,
                });

                if (event.target.value !== '0') {
                  this.setState({
                    notifSelect: false,
                  });
                }
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
        notifSelect && (
          <Notification notifSelect="Please choose a user!" />)
        }
        {
        notifyTitle && (
          <Notification notifSelect="Please enter the title!" />)
        }

        <TodoList list={preparedTodod} />

      </div>
    );
  }
}
