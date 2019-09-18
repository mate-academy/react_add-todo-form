import React from 'react';
import './App.css';

import apiUsers from './api/apiUsers';
import apiTodos from './api/apiTodos';
import NewTodo from './Components/NewTodo/NewTodo';
import TodoList from './Components/TodoList/TodoList';

function getTodosWithUsers(todos, usersList) {
  return todos.map(item => (
    {
      ...item,
      user: usersList.find(user => user.id === item.userId),
    }
  ));
}

const preparedTodos = getTodosWithUsers(apiTodos, apiUsers);

class App extends React.Component {
  state = {
    users: [...apiUsers],
    todos: [...preparedTodos],
    id: 3,
    inputTitle: '',
    inputUser: '',
    errorTitle: null,
    errorUser: null,
  }

  handleInputTitleChange = (event) => {
    this.setState({
      inputTitle: event.target.value,
      errorTitle: null,
    });
  }

  handleUserChange = (event) => {
    this.setState({
      inputUser: event.target.value,
      errorUser: null,
    });
  }

  handleButtonSubmit = (event) => {
    event.preventDefault();
    if (!this.state.inputTitle && !this.state.inputUser) {
      this.setState({
        errorTitle: 'Write a title',
        inputUser: '',
        errorUser: 'Choose a user',
        inputTitle: '',
      });
    } else if (!this.state.inputTitle) {
      this.setState({
        errorTitle: 'Write a title',
        inputUser: '',
      });
    } else if (!this.state.inputUser) {
      this.setState({
        errorUser: 'Choose a user',
        inputTitle: '',
      });
    } else {
      this.setState(prevState => ({

        todos: [
          ...prevState.todos,
          {
            userId: prevState.inputUser.id,
            id: prevState.id,
            title: prevState.inputTitle,
            completed: false,
            user: prevState.users
              .find(user => user.name === prevState.inputUser),
          },
        ],
        id: prevState.id + 1,
        inputUser: ' ',
        inputTitle: '',
      }));
    }
  }

  render() {
    const {
      users, todos, inputTitle, inputUser, errorTitle, errorUser,
    } = this.state;

    return (
      <>
        <div className="App">
          <h1>Static list of todos</h1>

          <p>
            <span>TODOs: </span>
            {todos.length}
          </p>
        </div>
        <NewTodo
          users={users}
          onTitleChange={this.handleInputTitleChange}
          onUserChange={this.handleUserChange}
          onSubmitClick={this.handleButtonSubmit}
          inputUser={inputUser}
          inputTitle={inputTitle}
          errorTitle={errorTitle}
          errorUser={errorUser}
        />
        <TodoList todos={todos} />
      </>
    );
  }
}

export default App;
