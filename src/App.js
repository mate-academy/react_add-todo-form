import React from 'react';
import './App.css';
import { TodoList } from './components/TodoList/TodoList';

import usersFromApi from './api/users';
import todosFromApi from './api/todos';

const preparedTodos = todosFromApi.map(todo => ({
  ...todo,
  user: usersFromApi.find(user => user.id === todo.userId),
}));

class App extends React.Component {
  state = {
    todos: preparedTodos,
    selectedUser: '',
    userId: null,
    title: '',
    selectedUserError: '',
    titleError: '',
  }

  userHandler = (e) => {
    const { name, value } = e.target;
    const foundedUser = usersFromApi.find(user => user.name === value);

    this.setState({
      [name]: value,
      userId: foundedUser.id,
      selectedUserError: '',
    });
  }

  titleHandler = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
      titleError: '',
    });
  }

  addTodo = () => {
    const { userId, title, todos } = this.state;
    const newTodo = {
      userId,
      id: todos.length + 1,
      title,
      completed: false,
    };

    this.setState(prevState => ({
      todos: [...prevState.todos, newTodo],
    }));
  }

  reset = () => {
    this.setState({
      selectedUser: '',
      userId: null,
      title: '',
    });
  }

  render() {
    const {
      selectedUser,
      title,
      userId,
      todos,
      selectedUserError,
      titleError,
    } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>

        <form onSubmit={(e) => {
          e.preventDefault();

          if (selectedUser === '') {
            this.setState({ selectedUserError: 'Please choose a user' });
          }

          if (title === '') {
            this.setState({ titleError: 'Please enter the title' });

            return;
          }

          if (userId === null) {
            return;
          }

          this.addTodo();
          this.reset();
        }}
        >
          <span className="error">{titleError}</span>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={title}
            onChange={this.titleHandler}
          />
          <select
            name="selectedUser"
            value={selectedUser}
            onChange={this.userHandler}
          >
            <option>
              Choose a user
            </option>
            {usersFromApi.map(user => (
              <option key={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          <span className="error">{selectedUserError}</span>
          <div>
            <button type="submit">
              add
            </button>
          </div>
        </form>
        <TodoList todos={todos} />
      </div>
    );
  }
}

export default App;
