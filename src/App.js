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

// searching max todoId
let todoMaxId = 0;

const preparedTodos = todos.map((todo) => {
  if (todo.id > todoMaxId) {
    todoMaxId = todo.id;
  }

  return {
    userName: preparedUsers.find(user => user.id === todo.userId).name,
    ...todo,
  };
});

class App extends React.Component {
  state = {
    todos: preparedTodos,
    newTitle: '',
    titleInputError: false,
    newUserId: 0,
    userSelectError: false,
    todoMaxId,
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
            id: prevState.todoMaxId + 1,
            title: prevState.newTitle,
            completed: false,
          }],
          newTitle: '',
          newUserId: 0,
          titleInputError: false,
          userSelectError: false,
          todoMaxId: prevState.todoMaxId + 1,
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
