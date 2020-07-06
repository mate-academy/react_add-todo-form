import React from 'react';
import './App.css';
import { NewTodo } from './components/NewTodo/NewTodo';
import { TodoList } from './components/TodoList/TodoList';

import { users as usersFromServer, users } from './api/users';

const usersOptions = usersFromServer.map(({ name, id }) => ({
  value: id,
  label: name,
}));

usersOptions.unshift({
  value: 0,
  label: 'Select user...',
  disabled: true,
});

class App extends React.Component {
  state = {
    todos: [],
    userId: 0,
    name: '',
  }

  handleChange = (value, name) => {
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { name, userId } = this.state;

    this.setState((prevState) => {
      const lastId = prevState.todos.reduce((biggestId, todo) => (
        todo.id > biggestId ? todo.id : biggestId
      ), -Infinity);

      const newGood = {
        id: lastId + 1,
        name,
        userId,
      };

      return {
        todos: [
          ...prevState.todos,
          newGood,
        ],
        name: '',
        userId: 0,
      };
    });
  }

  render() {
    const { todos, name, userId } = this.state;

    return (
      <div className="App">
        <h1>Add todo app</h1>
        <NewTodo
          name={name}
          handleChange={this.handleChange}
          userId={userId}
          usersOptions={usersOptions}
          handleSubmit={this.handleSubmit}
        />
        <TodoList todos={todos} users={users} />
      </div>
    );
  }
}

export default App;
