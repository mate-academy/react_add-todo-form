import React from 'react';
import './App.css';
import todos from './api/todos';
import users from './api/users';
import TodoList from './components/TodoList/TodoList';

class App extends React.Component {
  state = {
    todos,
    users,
    todoTitle: '',
    selected: '',
    userError: '',
    selectError: '',
  };

  handleInput = (event) => {
    this.setState({
      todoTitle: event.target.value,
      userError: '',
    });
  };

  handleSelect = (event) => {
    this.setState({
      selected: event.target.value,
      selectError: '',
    });
  };

  handleClick = (event) => {
    event.preventDefault();
    if (this.state.todoTitle.length === 0) {
      this.setState({
        userError: 'Invalid',
      });
    } else if (!this.state.selected) {
      this.setState({
        selectError: 'Choose a user',
      });
    } else {
      const todoToAdd = {
        title: this.state.todoTitle,
        completed: false,
        id: this.state.todos.length + 1,
        userId: this.state.users.find(user => user.name === this.state.selected)
          .id,
      };

      this.setState(prevState => ({
        todos: [...prevState.todos, todoToAdd],
        todoTitle: '',
        selected: '',
      }));
    }
  };

  render() {
    const {
      selected, todoTitle, userError, selectError,
    } = this.state;

    return (
      <div className="App">
        <TodoList
          users={this.state.users}
          todos={this.state.todos}
          handleInput={this.handleInput}
          handleClick={this.handleClick}
          handleSelect={this.handleSelect}
          userSelect={selected}
          todoTitle={todoTitle}
          userError={userError}
          selectError={selectError}
        />
      </div>
    );
  }
}

export default App;
