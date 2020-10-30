import React, { Component } from 'react';
import './App.css';
import todosFromServer from './api/todos';
import users from './api/users';
// import { TodoList } from './components/TodoList';

class App extends Component {
  state = {
    todos: [...todosFromServer],
    todoTitle: '',
    todoId: '',
    errorTitle: '',
    errorUser: '',
  }

  handleTitle = (event) => {
    const { value } = event.target;

    this.setState({
      todoTitle: value,
      errorTitle: '',
    });
  }

  handleSelect = (event) => {
    const { value } = event.currentTarget;

    this.setState({
      todoId: Number(value),
      errorUser: '',
    });
  }

  handleSubmit = () => {
    const { todoTitle, todoId } = this.state;

    if (todoId === '') {
      this.setState({ errorUser: 'Please choose a user' });
    }

    if (todoTitle === '') {
      this.setState({ errorTitle: 'Please enter the title' });
    }

    if (todoTitle !== '' && todoId !== '') {
      const userNew = {
        userId: todoId,
        id: this.state.todos.length + 1,
        title: todoTitle,
        completed: false,
      };

      this.setState(state => ({
        todos: [
          ...state.todos,
          userNew,
        ],
        todoTitle: '',
        todoId: '',
      }));
    }
  }

  render() {
    const { todos, todoTitle, todoId, errorTitle, errorUser } = this.state;

    return (
      <div className="App">
        <ul className="App__list ui text container">
          {
            todos.map(todo => (
              <div className="ui message" key={todo.id}>
                {todo.title}
              </div>
            ))
          }
        </ul>

        <div className="App__title">
          <input
            className="ui selection dropdown"
            type="text"
            placeholder="write here"
            value={todoTitle}
            onChange={this.handleTitle}
          />
          <span className="App__error">{errorTitle}</span>
        </div>

        <div className="App__users">
          <select
            className="ui selection dropdown"
            value={todoId}
            onChange={this.handleSelect}
          >
            <option>---- Choose a user ----</option>
            {
              users.map(user => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))
            }
          </select>
          <span className="App__error">{errorUser}</span>
        </div>

        <button
          className="ui primary button"
          type="submit"
          onClick={this.handleSubmit}
        >
          Add
        </button>
      </div>
    );
  }
}

export default App;
