import React from 'react';
import './App.css';
import { TodoList } from './components/TodoList';

import users from './api/users';
import todos from './api/todos';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.filter(user => user.id === todo.userId),
}));

class App extends React.Component {
  state = {
    todos: preparedTodos,
    user: '',
    todoTitle: '',
    isValidSelect: false,
    isEmpty: false,
    isTooLong: false,
  }

  changeInSelect(e) {
    if (e.target.value === 'none') {
      this.setState({
        isValidSelect: true,
        user: '',
      });
    } else {
      this.setState({
        user: e.target.value,
        isValidSelect: false,
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.user.length > 0 && this.state.todoTitle.length > 0
      && !this.state.isTooLong) {
      this.setState({
        user: '',
        todoTitle: '',
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
      todoTitle: e.target.value,
      isEmpty: false,
    });
  }

  addTodo(todo, user) {
    if (this.state.user.length > 0 && this.state.todoTitle.length > 0
      && !this.state.isTooLong) {
      const newTodo = {
        completed: false,
        id: Math.random(),
        title: todo,
        user: [users.find(person => person.name === user)],
        userId: users.find(person => person.name === user)?.id,
      };

      this.setState(state => ({
        todos: [
          newTodo,
          ...state.todos,
        ],
      }));
    }

    if (user.length === 0) {
      this.setState({
        isValidSelect: true,
      });
    }
  }

  render() {
    const { todos, user, todoTitle, isValidSelect, isEmpty,
      isTooLong } = this.state;

    return (
      <div className="App">
        <div className="App__flex-wrapper">
          <h1>Add todo form</h1>
          <form
            className="form"
            method="POST"
            action="/api/userTodo"
            onSubmit={e => this.handleSubmit(e, user, todoTitle)}
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
            {isValidSelect && <p>Please choose a user</p>}
            <label>
              <input
                className="form__field form__field--wide"
                name="todoTitle"
                placeholder="Add something to do"
                value={todoTitle}
                onChange={e => this.changeInput(e)}
              />
            </label>
            {isEmpty && <p>Please enter a Todo</p>}
            {isTooLong
              && <p>A Todo shouldn&apos;t be longer than 10 characters</p>}
            <button
              type="submit"
              className="form__field"
              onClick={() => this.addTodo(todoTitle, user)}
            >
              Add
            </button>
          </form>
        </div>
        <TodoList todos={todos} />
      </div>
    );
  }
}

export default App;
