import React from 'react';
import './App.css';
import TodoList from './components/TodoList';

import users from './api/users';
import initialTodos from './api/todos';

const preparedTodos = initialTodos.map((todo) => {
  const user = users.find(person => person.id === todo.userId);

  const copyOfTodo = Object.assign({}, todo);

  copyOfTodo.user = user;

  return copyOfTodo;
});

class App extends React.Component {
  state = {
    todos: preparedTodos,
    potentialTitle: '',
    potentialName: '',
    isCompleted: false,
    isEnterTitleError: false,
    isSelectUserError: false,
  }

  findMaxId = () => {
    let max = 0;

    this.state.todos.forEach((todo) => {
      if (todo.id > max) {
        max = todo.id;
      }
    });

    return max + 1;
  }

  setUser = (event) => {
    this.setState({
      potentialName: event.target.value,
      isSelectUserError: false,
    });
  }

  setTitle = (event) => {
    this.setState({
      potentialTitle: event.target.value,
      isEnterTitleError: false,
    });
  }

  setCompleted = (event) => {
    this.setState({
      isCompleted: event.target.checked,
    });
  }

  addTodo = () => {
    const {
      todos,
      potentialName,
      potentialTitle,
      isCompleted,
    } = this.state;

    if (potentialName === '') {
      this.setState({
        isSelectUserError: true,
      });
    }

    if (potentialTitle === '') {
      this.setState({
        isEnterTitleError: true,
      });
    }

    if (potentialTitle === '' || potentialName === '') {
      return;
    }

    const newtodos = [...todos];
    const todoOwner = users.find(user => user.name === potentialName);

    const newTodo = {
      userId: todoOwner.id,
      id: this.findMaxId(),
      title: potentialTitle,
      completed: isCompleted,
      user: todoOwner,
    };

    newtodos.push(newTodo);
    this.setState({
      todos: newtodos,
      potentialTitle: '',
      potentialName: '',
      isCompleted: false,
    });
  }

  render() {
    return (
      <div className="App">
        <h1>addTodo todo form</h1>
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
            checked={this.state.isCompleted}
          />
        </label>
        <button
          type="button"
          onClick={this.addTodo}
        >
          addTodo
        </button>
        {
          this.state.isEnterTitleError && (
            <p>
              <strong>
                Error:
              </strong>
              please enter title
            </p>
          )
        }
        {
          this.state.isSelectUserError && (
            <p>
              <strong>
                Error:
              </strong>
              please choose user
            </p>
          )
        }
        <TodoList
          todos={this.state.todos}
        />
      </div>
    );
  }
}

export default App;
