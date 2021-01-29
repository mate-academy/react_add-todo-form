import React from 'react';
import './App.css';
import { ToDoList } from './components/ToDoList';

import users from './api/users';
import todos from './api/todos';

const prepearedTodos = todos.map(todo => ({
  ...todo,
  user: users.filter(user => user.id === todo.userId),
}));

class App extends React.Component {
  state = {
    listOfTodos: prepearedTodos,
    user: '',
    todo: '',
    inValidSelect: false,
    isEmpty: false,
    isTooLong: false,
  }

  changeInSelect(e) {
    if (e.target.value === 'none') {
      this.setState({
        inValidSelect: true,
      });
    } else {
      this.setState({
        user: e.target.value,
        inValidSelect: false,
      });
    }
  }

  formSubmit(e) {
    e.preventDefault();
    if (this.state.user.length > 0 && this.state.todo.length > 0
      && !this.state.isTooLong) {
      this.setState({
        user: '',
        todo: '',
      });
    }
  }

  changeInput(e) {
    if (e.target.value.length > 10) {
      this.setState({
        isTooLong: true,
      });
    } else {
      this.setState({
        isTooLong: false,
      });
    }

    this.setState({
      todo: e.target.value,
      isEmpty: false,
    });
  }

  clickOnButton(todo, user) {
    if (this.state.user.length > 0 && this.state.todo.length > 0
      && !this.state.isTooLong) {
      const newTodo = {
        completed: false,
        id: Math.random(),
        title: todo,
        user: [users.find(person => person.name === user)],
        userId: users.find(person => person.name === user)?.id,
      };

      this.setState(state => ({
        listOfTodos: [
          newTodo,
          ...state.listOfTodos,
        ],
      }));
    }

    if (user.length === 0) {
      this.setState({
        inValidSelect: true,
      });
    }

    if (todo.length === 0) {
      this.setState({
        isEmpty: true,
      });
    }
  }

  render() {
    const { listOfTodos, user, todo, inValidSelect, isEmpty,
      isTooLong } = this.state;

    return (
      <div className="App">
        <div>
          <h1>Add todo form</h1>
          <form
            className="form"
            method="POST"
            action="/api/userTodo"
            onSubmit={e => this.formSubmit(e, user, todo)}
          >
            <select
              className="form__field"
              name="user"
              value={user}
              onChange={e => this.changeInSelect(e)}
            >
              <option
                value="none"
              >
                Choose a user
              </option>
              {users.map(person => (
                <option
                  key={person.id}
                  value={person.name}
                >
                  {person.name}
                </option>
              ))}
            </select>
            {inValidSelect && <p>Please choose a user</p>}
            <label>
              <input
                className="form__field form__field--wide"
                name="todo"
                placeholder="Add something to do"
                value={todo}
                onChange={e => this.changeInput(e)}
              />
            </label>
            {isEmpty && <p>Please enter a Todo</p>}
            {isTooLong
              && <p>A Todo shouldn&apos;t be longer than 10 characters</p>}
            <button
              type="submit"
              className="form__field"
              onClick={() => (this.clickOnButton(todo, user))}
            >
              Add
            </button>
          </form>
        </div>
        <ToDoList listOfTodos={listOfTodos} />
      </div>
    );
  }
}

export default App;
