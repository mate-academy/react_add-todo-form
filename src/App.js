import React from 'react';
import './App.css';
import { TodoList } from './components/TodoList';
import { NamesList } from './components/NamesList';
import { AddToDoButton } from './components/AddToDoButton/AddToDoButton';

import todos from './api/todos';
import users from './api/users';

const copyTodos = [...todos].map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

export class App extends React.Component {
  state={
    title: '',
    isTitleValid: true,
    userName: 'default',
    isUserNameValid: true,
  }

  inputTitle(event) {
    this.setState({
      title: event.target.value,
      isTitleValid: true,
    });
  }

  selectName(event) {
    this.setState({
      userName: event.target.value,
      isUserNameValid: true,
    });
  }

  addNewToDo(event) {
    event.preventDefault();
    const { title, userName } = this.state;

    if (title === '') {
      this.setState({
        isTitleValid: false,
      });
    }

    if (userName === 'default') {
      this.setState({
        isUserNameValid: false,
      });
    }

    if (title !== '' && userName !== 'default') {
      const foundUser = users.find(user => user.name === this.state.userName);

      copyTodos.push({
        title: this.state.title,
        user: foundUser,
        completed: false,
        userId: foundUser.id,
        id: copyTodos.length + 1,
      });

      this.setState({
        title: '',
        userName: 'default',
      });
    }
  }

  render() {
    return (
      <div className="App">
        <TodoList todos={copyTodos} />
        <h1>Add todo form</h1>
        <form
          className="form"
          onSubmit={event => this.addNewToDo(event)}
        >
          <input
            type="text"
            id="add-todo"
            className="input"
            placeholder="Type the name of ToDo"
            value={this.state.title}
            onChange={(event => (
              this.inputTitle(event)
            ))}
          />
          {!this.state.isTitleValid && 'Please enter the title'}
          <NamesList
            users={users}
            selectedUser={this.state.userName}
            onChange={(event => (
              this.selectName(event)
            ))}
          />
          {!this.state.isUserNameValid && 'Please choose a user'}
          <AddToDoButton />
        </form>
      </div>
    );
  }
}

export default App;
