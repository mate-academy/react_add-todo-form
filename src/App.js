import React, { Component } from 'react';
import './App.css';
import todosFromServer from './api/todos';
import users from './api/users';
import { SelectUser } from './components/SelectUser';

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
      todoId: value === 'error' ? '' : Number(value),
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
        <ul className="ui text container">
          {
            todos.map(todo => (
              <div className="ui message" key={todo.id}>
                {todo.title}
              </div>
            ))
          }
        </ul>

        <div className="App__form">
          <input
            className="ui selection dropdown"
            type="text"
            placeholder="write here"
            value={todoTitle}
            onChange={this.handleTitle}
          />
          <span className="App__error">{errorTitle}</span>
        </div>

        <div className="App__form">
          <SelectUser
            handleSelect={this.handleSelect}
            todoId={todoId}
            users={users}
          />

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
