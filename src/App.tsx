import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';

import { TodoList } from './TodoList';
// import { Todo } from './Types';

// interface State {
//   myTodos: Todo[],
//   title: string,
// }

// interface Destruct {
//   name: string,
//   value: string,
// }

class App extends React.Component<{}, any> {
  state: any = {
    myTodos: todos.map(todo => ({
      ...todo,
      user: users.find(person => person.id === todo.userId) || null,
    })),
    myUsers: users.map(user => ({
      ...user,
    })),
    title: '',
    userId: '',
  };

  change = (event: any) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  updateTodos = () => {
    this.setState((prev: any) => {
      if (prev.title === '' || prev.userId === '') {
        return 0;
      }

      prev.myTodos.push({
        userId: prev.userId,
        id: prev.myTodos.length + 1,
        title: prev.title,
        completed: false,
        user: prev.myUsers.find((person: any) => person.id === +prev.userId),
      });

      return {
        myTodos: prev.myTodos,
        title: '',
        userId: '',
      };
    });
  };

  render() {
    // eslint-disable-next-line
    console.log(this.state);

    return (
      <div className="App">
        <h1>Add todo form</h1>
        <form onSubmit={(event) => event.preventDefault()}>
          <input
            type="text"
            name="title"
            value={this.state.title}
            onChange={this.change}
            required
            // onInvalid={}  question
            // onInput={}
          />
          <select
            name="userId"
            value={this.state.userId}
            onChange={this.change}
            required
          >
            <option value="">Choose a user</option>
            {this.state.myUsers.map((user: any) => (
              <option key={user.id} value={user.id}>
                {user.name}
                {user.username}
                {' '}
                {user.email}
              </option>
            ))}
          </select>
          <button
            type="submit"
            onClick={this.updateTodos}
          >
            Add
          </button>
          <TodoList todos={this.state.myTodos} />
        </form>
      </div>
    );
  }
}

export default App;
