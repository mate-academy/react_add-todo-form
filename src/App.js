import React from 'react';
import './App.css';
import TodoList from './TodoList';
import Selector from './Selector';

import users from './api/users';
import todos from './api/todos';

const todosWistUsers = todos.map((todo) => {
  const user = users.find(person => person.id === todo.userId);

  return {
    ...todo,
    user,
  };
});

class App extends React.Component {
  state = {
    todosArr: [...todosWistUsers],

    inputValue: '',
    selectedUserId: 0,

    hasInputError: false,
    hasNameError: false,
  };

  handleInput = (event) => {
    this.setState({
      inputValue: event.target.value,
      hasInputError: false,
    });
  };

  handleUserChange = (event) => {
    this.setState({
      selectedUserId: +event.target.value,
      hasNameError: false,
    });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { inputValue, selectedUserId, todosArr } = this.state;

    if (!inputValue || !selectedUserId) {
      this.setState({
        hasInputError: !inputValue,
        hasNameError: !selectedUserId,
      });

      return;
    }

    this.setState((state) => {
      const inputedTodo = {
        id: todosArr.length + 1,
        title: inputValue,
        userId: selectedUserId,
        user: users.find(person => person.id === selectedUserId),
      };
      const newTodosArr = [...todosArr];

      return {
        todosArr: [...newTodosArr, inputedTodo],
      };
    });

    this.setState({
      inputValue: '',
      selectedUserId: 0,
    });
  };

  render() {
    return (
      <div className="App">
        <h1>Static list of todos</h1>

        <p>
          <span>Users: </span>
          {users.length}
        </p>

        <Selector
          todos={this.state.todosArr}
          inputValue={this.state.inputValue}
          usersList={users}
          handleInput={this.handleInput}
          addTodo={this.addTodo}
          selectedUserId={this.state.selectedUserId}
          handleUserChange={this.handleUserChange}
          handleFormSubmit={this.handleFormSubmit}
          hasInputError={this.state.hasInputError}
          hasNameError={this.state.hasNameError}
        />

        <TodoList
          todos={this.state.todosArr}
        />
      </div>
    );
  }
}

export default App;
