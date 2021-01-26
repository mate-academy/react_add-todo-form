import React from 'react';
import { TodoList } from './TodoList';

import './App.css';

import users from './api/users';
import todos from './api/todos';

const preparedList = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),

}));

class App extends React.Component {
  state = {
    preparedTodoList: [...preparedList],
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
    const { preparedTodoList, title, usersSelect } = this.state;

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
      preparedTodoList: [
        ...preparedTodoList,
        {
          userId: +usersSelect,
          id: preparedTodoList.length + 1,
          title,
          completed: false,
          user: users[usersSelect - 1],
        },
      ],
    });
  }

  render() {
    const {
      preparedTodoList,
      usersSelect,
      titleError,
      selectError,
    } = this.state;

    return (
      <div>
        <h1>Add todo form</h1>

        <p>
          <span>Users: </span>
          {users.length}
        </p>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            this.addTask();
          }}
        >
          <div>
            <label>
              <input
                className="input"
                type="text"
                name="title"
                value={this.state.title}
                placeholder="New task"
                onChange={this.dataChange}
              />
            </label>
            {titleError && <p>Please enter a task</p>}
          </div>

          <div>
            <select
              className="select"
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
            {selectError && <p>Please choose a user</p>}
          </div>

          <button type="submit">
            Add task
          </button>
        </form>
        <TodoList preparedTodoList={preparedTodoList} />
      </div>
    );
  }
}

export default App;
