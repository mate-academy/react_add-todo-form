import React from 'react';
import './App.css';

import users from './api/api-users';
import todos from './api/api-todos';

import NewTodo from './Components/NewTodo/NewTodo';
import TodoList from './Components/TodoList/TodoList';

const preparedTodos = getTodosWithUsers(todos, users);


function getTodosWithUsers(todos, usersList) {
  return todos.map(item => (
    {
      ...item,
      user: usersList.find(user => user.id === item.userId),
    }
  ));
}

class App extends React.Component {
  state = {
    users: [...users],
    todos: [...preparedTodos],
    id: 3,
    inputTitle: '',
    inputUser: '',
    errorTitle: null,
    errorUser: null,
  }

  inputTitleChange = (event) => {
    this.setState({
      inputTitle: event.target.value,
      errorTitle: null,
    });
  }

  userChange = (event) => {
    this.setState({
      inputUser: event.target.value,
      errorUser: null,
    });
  }

  buttonSubmit = (event) => {
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
          titleChange={this.inputTitleChange}
          userChange={this.userChange}
          submitClick={this.buttonSubmit}
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
