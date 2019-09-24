import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';
// import { getTodosWithUsers } from './getTodos';
import TodoList from './components/TodoList/TodoList';
// import { tsConstructorType } from '@babel/types';

function getTodosWithUsers(todosArr, usersArr) {
  return todosArr.map((todo) => {
    const todoUser = usersArr.find(user => user.id === todo.userId);

    return {
      ...todo,
      user: todoUser,
    };
  });
}

class App extends React.Component {
  state = {
    newTodos: [...todos],
    newUsers: [...users],
    text: '',
    selectedOption: '',
  }

  handleSelect = (event) => {
    this.setState({
      selectedOption: event.target.value,
    });
    //
  }

  addTodo = (todo) => {
    this.setState(prevState => ({
      newTodos: [todo, ...prevState.newTodos],
    }));
  }

  // addTodo = todo => {
  //   this.setState({
  //     todos: [...this.state.todos, todo],
  //   })
  // }

  handleChange = (event) => {
    this.setState({
      text: event.target.value,
      [event.target.name]: event.target.value,
    });
  }

  // handleSubmit = (event) => {
  //   event.preventDefault();
  //   this.onSubmit({
  //     userId:
  //     text: this.state.text,
  //     complete: false,
  //   });
  // }

  render() {
    const preparedTodos = getTodosWithUsers(
      this.state.newTodos, this.state.newUsers
    );

    return (
      <div className="App">
        <p>
          <span>Users: </span>
          {this.state.newUsers.length}
        </p>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.text}
            onChange={this.handleChange}
            placeholder="add a new task"
          />
          <select
            className="select"
            name="good-length"
            id="selectedLength"
            onChange={this.handleSelect}
            value={this.state.selectedOption}
          >
            {this.state.newUsers.map(user => (
              <option value={user.id}>{user.name}</option>))
            }
          </select>

          <button
            type="submit"
            onClick={this.addTodo}
          >
            AddTodo
          </button>
        </form>

        <TodoList todos={preparedTodos} />
        {/* {JSON.stringify(this.state.newTodos)} */}
      </div>
    );
  }
}

export default App;
