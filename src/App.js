import React from 'react';
import { TodoList } from './components/TodoList/TodoList';

import './App.css';

import users from './api/users';
import todos from './api/todos';

const preparedList = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

class App extends React.Component {
  state = {
    preparedTodos: [...preparedList],
    usersSelect: '',
    title: '',
    titleError: false,
    selectError: false,
  }

  dataChange = (event) => {
    const { name, value } = event.target;

    this.setState(state => ({
      [name]: value.trimStart(),
      titleError: state.title && false,
      selectError: state.usersSelect && false,
    }));
  }

  addTask = () => {
    const { preparedTodos, title, usersSelect } = this.state;

    if (!title) {
      this.setState({ titleError: true });

      return;
    }

    if (!usersSelect) {
      this.setState({
        titleError: false,
        selectError: true,
      });

      return;
    }

    this.setState({
      titleError: false,
      selectError: false,
      title: '',
      usersSelect: '',
      preparedTodos: [
        ...preparedTodos,
        {
          userId: +usersSelect,
          id: preparedTodos.length + 1,
          title,
          completed: false,
          user: users[usersSelect - 1],
        },
      ],
    });
  }

  render() {
    const { preparedTodos, usersSelect, titleError, selectError } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>

        <p>
          <span>Users: </span>
          {users.length}
        </p>

        <form
          className="App__form"
          onSubmit={(event) => {
            event.preventDefault();
            this.addTask();
          }}
        >
          <div className="Arr__form-column">
            <label>
              <input
                type="text"
                name="title"
                value={this.state.title}
                placeholder="New task"
                onChange={this.dataChange}
              />
            </label>
            {titleError && <p>empty value</p>}
          </div>

          <div className="Arr__form-column">
            <select
              className="App__select"
              name="usersSelect"
              value={usersSelect}
              onChange={this.dataChange}
            >
              <option value="">Choose a user</option>
              {users.map(user => (
                <option
                  key={user.id}
                  value={user.id}
                >
                  {user.name}
                </option>
              ))}
            </select>
            {selectError && <p>empty value</p>}
          </div>

          <button type="submit">Add task</button>
        </form>

        <TodoList preparedTodos={preparedTodos} />
      </div>
    );
  }
}

export default App;
