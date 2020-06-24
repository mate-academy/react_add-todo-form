/* eslint-disable consistent-return */
/* eslint-disable no-alert */
import React from 'react';
import './App.css';
import { Select } from './Select&Option/Select';
import { TodosList } from './TodoList&TodoItem/TodosList';

import users from './api/users';

const usersNames = users.map(user => ({
  name: user.name,
  id: user.id,
}));

class App extends React.Component {
  state ={
    todosStates: [],
    selectedUser: 'Select User',
    todoToAdd: '',
    todos: [],
  }

  selectUser = (ev) => {
    ev.persist();

    return (this.setState(prevState => ({
      selectedUser: ev.target.value,
    })));
  }

  addTodo = (ev) => {
    ev.preventDefault();
    if (this.state.selectedUser === 'Select User') {
      alert('you need to choose user');
    } else if (this.state.todoToAdd.length < 3) {
      alert('mon length 10 letters');
    } else {
      return (
        this.setState(prevState => ({
          todosStates: [...prevState.todosStates, false],
          todos: [...prevState.todos, prevState.todoToAdd],
          todoToAdd: '',
          selectedUser: 'Select User',
        })));
    }
  }

  changedInput = (ev) => {
    ev.persist();

    return (this.setState(prevState => ({
      todoToAdd: ev.target.value,
    })));
  }

  flag = i => (
    this.setState(prevState => ({
      todosStates: prevState.todosStates.map(
        (state, index) => ((index === i) ? !state : state),
      ),
    }))
  )

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>
        <form className="Form">
          <input
            className="input-text"
            placeholder="Add TODO"
            type="text"
            name="added_todo"
            value={this.state.todoToAdd}
            onChange={ev => this.changedInput(ev)}
          />

          <Select
            toSelect={this.selectUser}
            selected={this.state.selectedUser}
            users={usersNames}
          />
          <input
            className="btn"
            type="submit"
            name="but"
            value="ADD NEW TODO"
            onClick={ev => this.addTodo(ev)}
          />

        </form>
        <TodosList
          states={this.state.todosStates}
          todos={this.state.todos}
          flag={this.flag}
        />
      </div>
    );
  }
}

export default App;
