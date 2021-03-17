import React from 'react';
import './App.css';
import { TodoList } from './components/TodoList/TodoList';
// import { AddTodoForm } from './components/AddTodoForm/AddTodoForm'

import usersFromApi from './api/users';
import todosFromApi from './api/todos';

const preparedTodos = todosFromApi.map(todo => ({
  ...todo,
  user: usersFromApi.find(user => user.id === todo.userId),
}));

class App extends React.Component {
  state = {
    todos: preparedTodos,
    title: '',
    selectedUser: null,
    selectedUserError: false,
    titleError: false,
  }

  userHandler = (e) => {
    const { value } = e.target;
    const foundedUser = usersFromApi.find(user => user.id === +value);

    console.log(foundedUser);

    this.setState({
      selectedUser: foundedUser,
      selectedUserError: false,
    });
  }

  titleHandler = (e) => {
    const { value } = e.target;

    this.setState({
      title: value,
      titleError: false,
    });
  }

  addTodo = () => {
    const { title, todos, selectedUser } = this.state;

    const newTodo = {
      id: todos.length + 1,
      title,
      completed: false,
      user: selectedUser,
      userId: selectedUser.id,
    };

    this.setState(prevState => ({
      todos: [...prevState.todos, newTodo],
    }));
  }

  reset = () => {
    this.setState({
      selectedUser: '',
      title: '',
    });
  }

  render() {
    const {
      selectedUser,
      title,
      todos,
      selectedUserError,
      titleError,
    } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>

        {/* <AddTodoForm /> */}
        <form onSubmit={(e) => {
          e.preventDefault();

          if (selectedUser === null) {
            this.setState({ selectedUserError: true });
          }

          if (title === '') {
            this.setState({ titleError: true });
          }

          if (selectedUser === null || title === '') {
            return
          }

          this.addTodo();
          this.reset();
        }}
        >
          <span className="error">
            {titleError && 'Please enter the title'}
          </span>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={this.titleHandler}
          />
          <select
            name="selectedUser"
            value={selectedUser && selectedUser.id}
            onChange={this.userHandler}
          >
            <option >
              Choose a user
            </option>
            {usersFromApi.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          <span className="error">
            {selectedUserError && 'Please choose a user'}
            </span>
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
