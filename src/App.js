import React from 'react';
import { todosFromServer } from './api/todos';
import usersFromServer from './api/users';
import { Form } from './components/Form/Form';
import { List } from './components/List/List';
import './App.scss';

export class App extends React.Component {
  state = {
    selectedUser: '',
    enteredTodo: '',
    todos: todosFromServer,
    users: usersFromServer,
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

  setDefaultState = () => {
    this.setState({
      selectedUser: '',
      enteredTodo: '',
    });
  }

  render() {
    const { enteredTodo, selectedUser, todos, users } = this.state;
    const { onChange, addTodo, setDefaultState } = this;

    return (
      <div className="app">
        <h1>Add todo</h1>

        <Form
          todos={todos}
          users={users}
          selectedUser={selectedUser}
          enteredTodo={enteredTodo}
          addTodo={addTodo}
          onChange={onChange}
          setDefaultState={setDefaultState}
        />

        <List
          todos={todos}
          users={users}
        />
      </div>
    );
  }
}

export default App;
