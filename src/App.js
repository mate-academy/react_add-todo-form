import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';

import { TodoList } from './components/TodoList/TodoList';

class App extends React.Component {
  state = {
    todosData: todos,
    todo: '',
    user: '',
    userError: '',
    todoError: '',
  }

  handleChanges = event => (
    this.setState({
      [event.target.name]: event.target.value,
      [`${event.target.name}Error`]: '',
    })
  );

  addNewTodo = (event) => {
    event.preventDefault();

    const { todosData, todo, user } = this.state;

    if (!user) {
      this.setState({ userError: 'Please choose a user' });
    }

    if (!todo) {
      this.setState({ todoError: 'Please enter the title' });
    }

    if (user && todo) {
      this.setState(state => ({
        todosData: [
          ...state.todosData,
          {
            userId: users.find(usr => usr.name === user).id,
            id: todosData.length + 1,
            title: todo,
            completed: false,
          },
        ],
        todo: '',
        user: '',
      }));
    }
  }

  render() {
    const { todosData, todo, user, userError, todoError } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>

        <p>
          <span>Users: </span>
          {users.length}
        </p>

        <form className="App__form">
          <select
            className="App__item App__item--select"
            value={user}
            name="user"
            onChange={this.handleChanges}
          >
            <option>Choose a user</option>
            {users.map(usr => (
              <option key={usr.id} value={usr.name}>
                {usr.name}
              </option>
            ))}
          </select>

          <p className="App__error">
            {userError}
          </p>

          <input
            className="App__item"
            type="text"
            placeholder="Add todo"
            value={todo}
            name="todo"
            maxLength="30"
            onChange={this.handleChanges}
          />

          <p className="App__error">
            {todoError}
          </p>

          <button
            className="App__submit"
            type="submit"
            onClick={this.addNewTodo}
          >
            Add
          </button>
        </form>

        <TodoList todosData={todosData} />
      </div>
    );
  }
}

export default App;
