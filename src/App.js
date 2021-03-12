import React from 'react';
import { TodosList } from './components/TodosList';
import './App.css';

import users from './api/users';
import todos from './api/todos';

const todosWithUsers = todos.map(todo => (
  {
    ...todo,
    user: users.find(user => todo.userId === user.id),
  }
));

class App extends React.Component {
  state = {
    fullTodos: todosWithUsers,
    selectedUserId: '',
    newUser: null,
    title: '',
    selectErorr: false,
    inputError: false,
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { title, newUser } = this.state;

    if (title && newUser) {
      const newTodo = {
        user: newUser,
        userId: newUser.id,
        id: title,
        title,
        completed: false,
      };

      this.setState(state => (
        {
          fullTodos: [...state.fullTodos, newTodo],
          selectedUserId: '',
          title: '',
          newUser: null,
          inputError: false,
          selectErorr: false,
        }
      ));
    }

    if (!title) {
      this.setState({
        inputError: true,
      });
    }

    if (!newUser) {
      this.setState({
        selectErorr: true,
      });
    }
  }

  handleChange = (event) => {
    const userId = event.target.value;

    this.setState(
      {
        newUser: users.find(user => user.id === +userId),
        selectedUserId: userId,
        selectErorr: false,
      },
    );
  }

  handleTitle = (event) => {
    this.setState({
      title: event.target.value,
      inputError: false,
    });
  }

  render() {
    const { fullTodos,
      selectedUserId,
      title,
      inputError,
      selectErorr } = this.state;

    return (
      <div className="App">
        <h1
          className="App__title"
        >
          ADD TODO
        </h1>
        {inputError
        && (
        <div
          className="App__input-error"
        >
          <h3>error</h3>
          <p>Please, write a title</p>
        </div>
        )
        }
        {selectErorr
        && (
        <div
          className="App__select-error"
        >
          <h3>error</h3>
          <p>Please, choose a user</p>
        </div>
        )

        }
        <form
          onSubmit={this.handleSubmit}
          className="App__form form"
        >
          <input
            className="form__input"
            placeholder="Title"
            value={title}
            onChange={this.handleTitle}
          />
          <select
            className="form__select"
            value={selectedUserId}
            onChange={this.handleChange}
          >
            <option>
              Choose a User
            </option>
            {users.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))
          }
          </select>
          <button
            className="form__button"
            type="submit"
          >
            Submit
          </button>
        </form>
        <TodosList todos={fullTodos} />
      </div>
    );
  }
}

export default App;
