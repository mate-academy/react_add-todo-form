import React from 'react';
import { todosFromServer } from './api/todos';
import usersFromServer from './api/users';
import { Form } from './components/Form/Form';
import { List } from './components/List/List';
import './App.scss';

export class App extends React.Component {
  state = {
    todos: todosFromServer,
  }

  onChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  addTodo = (createdTodo) => {
    this.setState(state => ({
      todos: [...state.todos, createdTodo],
    }));
  }

  getUserName = todo => (
    usersFromServer.find(user => user.id === todo.userId).name
  )

  prepareTodos = todosToUpdate => todosToUpdate.map((todo) => {
    const userName = this.getUserName(todo);
    const changeTodo = {
      ...todo,
      userName,
    };

    return changeTodo;
  })

  render() {
    const { todos } = this.state;
    const { addTodo, prepareTodos } = this;

    return (
      <div className="app">
        <h1>Add todo</h1>

        <Form
          users={usersFromServer}
          addTodo={addTodo}
        />

        <List
          todos={prepareTodos(todos)}
          users={usersFromServer}
        />
      </div>
    );
  }
}

export default App;
