import React from 'react';
import './App.css';
import { TodoList } from './components/TodoList/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const preparedTodo = todosFromServer.map(todo => (
  {
    ...todo,
    userName: usersFromServer.find(user => user.id === todo.userId).name,
  }
));

class App extends React.Component {
  state = {
    todos: preparedTodo,
    todo: '',
    user: '',
    userError: '',
    titleError: '',
  };

  userChoose = event => (
    this.setState({
      user: event.target.value,
      userError: '',
    })
  );

  addTodo = event => (
    this.setState({
      todo: event.target.value.trimLeft(),
      titleError: '',
    })
  );

  handleSubmit = (event) => {
    event.preventDefault();

    const { todo, todos, user } = this.state;

    if (!user) {
      this.setState({ userError: 'Please choose a user' });
    }

    if (!todo) {
      this.setState({ titleError: 'Please add todo' });
    }

    if (user && todo) {
      this.setState(state => ({
        todos: [
          ...state.todos,
          {
            userName: user,
            title: todo,
            userId: usersFromServer.find(usr => usr.name === user).id,
            completed: false,
            id: todos.length + 1,
          },
        ],
        todo: '',
        user: '',
      }));
    }
  }

  render() {
    const { todo, todos, userError, titleError, user } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>

        <p>
          <span>Users: </span>
          {usersFromServer.length}
        </p>

        <form
          onSubmit={event => this.handleSubmit(event)}
        >
          <select
            name="selectUser"
            value={user}
            onChange={this.userChoose}
          >
            <option>Choose a user</option>
            {usersFromServer.map(usr => (
              <option key={usr.id} value={usr.name}>
                {usr.name}
              </option>
            ))}
          </select>

          <div>{userError}</div>

          <input
            type="text"
            name="todo"
            value={todo}
            onChange={this.addTodo}
            placeholder="Add Todo"
          />

          <div>{titleError}</div>

          <button
            type="submit"
          >
            Add
          </button>

          <div className="todo-list">
            <TodoList todos={todos} />
          </div>
        </form>
      </div>
    );
  }
}

export default App;
