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
    inputTitle: null,
    inputUser: null,
    error: null,
  }

  handleInputTitleChange = (event) => {
    this.setState({
      inputTitle: event.target.value,
    });
  }

  handleUserChange = (event) => {
    this.setState({
      inputUser: event.target.value,
    });
  }

  handleButtonSubmit = (event) => {
    event.preventDefault();
    this.setState(prevState => ({
      todos: [
        ...prevState.todos,
        {
          userId: this.state.inputUser.id,
          id: prevState.id,
          title: prevState.inputTitle,
          completed: false,
          user: this.state.inputUser,
        },
      ],
      id: prevState.id + 1,
      inputUser: ' ',
      inputTitle: '',
    }));
  }

  render() {
    const {
      users, todos, inputTitle, inputUser,
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
        />
        <TodoList todos={todos} />
      </>
    );
  }
}

export default App;
