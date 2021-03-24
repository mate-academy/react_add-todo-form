import React from 'react';
import './App.css';
import TodoList from './components/TodoList';

import users from './api/users';
import todos from './api/todos';

class App extends React.Component {
  state = {
    listOfTodos: todos.map((todo) => {
      const user = users.find(person => person.id === todo.userId);

      todo.user = user;

      return todo;
    }),
    potentialTitle: '',
    potentialName: '',
    potentialCompleted: false,
    enterTitleError: false,
    selectUserError: false,
  }

  findMaxId = () => {
    let max = 0;

    this.state.listOfTodos.map(todo => todo.id > max ? max = todo.id : '');

    return max + 1;
  }

  setUser = (event) => {
    this.setState({
      potentialName: event.target.value,
      selectUserError: false,
    });
  }

  setTitle = (event) => {
    this.setState({
      potentialTitle: event.target.value,
      enterTitleError: false,
    });
  }

  setCompleted = (event) => {
    this.setState({
      potentialCompleted: event.target.checked,
    });
  }

  add = () => {
    const {
      listOfTodos,
      potentialName,
      potentialTitle,
      potentialCompleted,
    } = this.state;

    if (potentialName === '') {
      this.setState({
        selectUserError: true,
      });
    }

    if (potentialTitle === '') {
      this.setState({
        enterTitleError: true,
      });
    }

    if (potentialTitle === '' || potentialName === '') {
      return;
    }

    const newListOfTodos = [...listOfTodos];
    const todoOwner = users.find(user => user.name === potentialName);

    const newItemInListOfTodos = {
      userId: todoOwner.id,
      id: this.findMaxId(),
      title: potentialTitle,
      completed: potentialCompleted,
      user: todoOwner,
    };

    newListOfTodos.push(newItemInListOfTodos);
    this.setState({
      listOfTodos: newListOfTodos,
      potentialTitle: '',
      potentialName: '',
      potentialCompleted: false,
    });
  }

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>
        <select
          onChange={this.setUser}
          value={this.state.potentialName}
          required=""
        >
          <option value="">
            Choose a user
          </option>
          {
            users.map(user => (
              <option>
                {user.name}
              </option>
            ))
          }
        </select>
        <input
          type="text"
          onChange={this.setTitle}
          value={this.state.potentialTitle}
          required=""
        />
        <label>
          Comleted:
          <input
            type="checkbox"
            onChange={this.setCompleted}
            checked={this.state.potentialCompleted}
          />
        </label>
        <button
          type="button"
          onClick={this.add}
        >
          Add
        </button>
        {
          this.state.enterTitleError && (
            <p>
              <strong>
                Error:
              </strong>
              please enter title
            </p>
          )
        }
        {
          this.state.selectUserError && (
            <p>
              <strong>
                Error:
              </strong>
              please choose user
            </p>
          )
        }
        <TodoList
          todos={this.state.listOfTodos}
        />
      </div>
    );
  }
}

export default App;
