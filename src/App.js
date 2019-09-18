import React from 'react';
import './App.css';

import { getTodosWithUsers } from './api/data';
import users from './api/users';
import todos from './api/todos';

import TodoList from './components/TodoList/TodoList';
import NewTodos from './components/NewTodos/NewTodos';

const preparedTodos = getTodosWithUsers(todos, users);

class App extends React.Component {
  state = {
    usersList: [...users],
    todosList: [...preparedTodos],
    inputTitle: '',
    selectedUser: '',
    id: 3,
    placeholder: 'Enter the title for TODO',
  };

  handleChangeTitle = (event) => {
    this.setState({
      inputTitle: event.target.value,
    });
  };

  handleChangeUser = (event) => {
    this.setState({
      selectedUser: event.target.value,
    });
  };

  handleClickButton = () => {
    this.setState(prevState => ({
      todosList: [...prevState.todosList,
        {
          userId: prevState.selectedUser.id,
          title: prevState.inputTitle,
          id: prevState.id,
          user: prevState.usersList
            .find(user => user.name === prevState.selectedUser),
        },
      ],

      id: prevState.id + 1,
      selectedUser: ' ',
      inputTitle: '',
    }));
  };

  render() {
    const {
      usersList, todosList, selectedUser, placeholder, inputTitle,
    } = this.state;

    return (
      <>
        <h1 className="todos__title">
          Todos length:
          {todosList.length}
        </h1>

        <div className="todo-content">
          <TodoList todos={todosList} />
          <NewTodos
            users={usersList}
            handleChangeTitle={this.handleChangeTitle}
            handleClickButton={this.handleClickButton}
            selectedUser={selectedUser}
            handleChangeUser={this.handleChangeUser}
            placeholder={placeholder}
            inputTitle={inputTitle}
          />
        </div>
      </>
    );
  }
}

export default App;
