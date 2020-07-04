import React from 'react';
import './App.css';
import { TodoList } from './components/TodoList/TodoList';
import { NewTodo } from './components/NewTodo/NewTodo';

import todos from './api/todos';
import users from './api/users';

const preparedUsers = users.map(user => ({
  id: user.id,
  name: user.name,
}));

// sort by id cause we want add unique id for new todo
const preparedTodos = todos.map(todo => ({
  userName: preparedUsers.find(user => user.id === todo.userId).name,
  ...todo,
})).sort((a, b) => a.id - b.id);

class App extends React.Component {
  state = {
    todos: preparedTodos,
    newTitle: '',
    titleInputError: false,
    newUserId: 0,
    userSelectError: false,
  };

  handleInputChange = (event) => {
    this.setState({
      titleInputError: false,
      newTitle: event.target.value.replace(/[^\s\w]/g, ''),
    });
  };

  handleUserChange = (event) => {
    this.setState({
      userSelectError: false,
      newUserId: +event.target.value,
    });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();

    this.setState((prevState) => {
      if (prevState.newTitle && prevState.newUserId) {
        return ({
          todos: [...prevState.todos, {
            userName: preparedUsers.find(
              user => user.id === prevState.newUserId,
            ).name,
            id: prevState.todos[prevState.todos.length - 1].id + 1,
            title: prevState.newTitle,
            completed: false,
          }],
          newTitle: '',
          newUserId: 0,
          titleInputError: false,
          userSelectError: false,
        });
      }

      return ({
        titleInputError: !prevState.newTitle,
        userSelectError: !prevState.newUserId,
      });
    });
  };

  render() {
    return (
      <div className="app">
        <NewTodo
          users={preparedUsers}
          title={this.state.newTitle}
          titleInputError={this.state.titleInputError}
          userId={this.state.newUserId}
          userSelectError={this.state.userSelectError}
          onInputChange={this.handleInputChange}
          onUserChange={this.handleUserChange}
          onFormSubmit={this.handleFormSubmit}
        />
        <TodoList todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
