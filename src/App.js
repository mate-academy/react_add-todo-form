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
    todos: preparedList,
    selectedUserId: '',
    newTodoTitle: '',
    titleError: false,
    selectError: false,
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState(state => ({
      [name]: value.trimStart(),
      // titleError: state.newTodoTitle && false,
      // selectError: state.selectedUserId && false,
      titleError: !state.newTodoTitle,
      selectError: !state.selectedUserId,
    }));
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.addTask();
  }

  addTask = () => {
    // eslint-disable-next-line
    const { todos, newTodoTitle, selectedUserId } = this.state;

    if (!newTodoTitle) {
      this.setState({ titleError: true });

      return;
    }

    if (!selectedUserId) {
      this.setState({
        selectError: true,
      });

      return;
    }

    this.setState({
      titleError: false,
      selectError: false,
      newTodoTitle: '',
      selectedUserId: '',
      todos: [
        ...todos,
        {
          userId: +selectedUserId,
          id: todos.length + 1,
          title: newTodoTitle,
          completed: false,
          user: users.find(user => user.id === +selectedUserId),
        },
      ],
    });
  }

  render() {
    const {
      // eslint-disable-next-line
      todos,
      newTodoTitle,
      selectedUserId,
      titleError,
      selectError,
    } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>

        <p>
          <span>Users: </span>
          {users.length}
        </p>

        <form
          className="App__form"
          onSubmit={this.handleSubmit}
        >
          <div className="Arr__form-column">
            <label>
              <input
                type="text"
                name="newTodoTitle"
                value={newTodoTitle}
                placeholder="New task"
                onChange={this.handleChange}
              />
            </label>
            {titleError && <p>empty value</p>}
          </div>

          <div className="Arr__form-column">
            <select
              className="App__select"
              name="selectedUserId"
              value={selectedUserId}
              onChange={this.handleChange}
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

        <TodoList todos={todos} />
      </div>
    );
  }
}

export default App;
