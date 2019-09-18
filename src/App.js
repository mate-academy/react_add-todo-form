import React from 'react';
import TodoList from './components/TodoList/TodoList';
import NewTodo from './components/NewTodo/NewTodo';

import todos from './api/todos';
import users from './api/users';

function getTodosWithUsers(todosList, usersList) {
  return todosList.map(todo => ({
    ...todo,
    user: usersList.find(user => user.id === todo.userId),
  }));
}

const preparedTodos = getTodosWithUsers(todos, users);

class App extends React.Component {
  state = {
    todosList: preparedTodos,
    usersList: [...users],
    titleValue: '',
    userValue: 0,
    isErrorTitle: false,
    isErrorUser: false,
  }

  handleSubmitNewTodo = (event) => {
    event.preventDefault();
    const { title, user } = event.target;

    if (title.value.length > 0 && +user.value !== 0) {
      this.setState(prevState => ({
        todosList: [
          ...prevState.todosList,
          {
            userId: +user.value,
            id: prevState.todosList.length + 1,
            title: title.value,
            completed: false,
            user: prevState.usersList.find(u => u.id === +user.value),
          },
        ],
        titleValue: '',
        userValue: 0,
      }));
    }

    if (title.value.length <= 0 && +user.value === 0) {
      this.setState({
        isErrorTitle: true,
        isErrorUser: true,
      });
    }

    if (title.value.length <= 0) {
      this.setState({
        isErrorTitle: true,
      });
    }

    if (+user.value === 0) {
      this.setState({
        isErrorUser: true,
      });
    }
  }

  handleInputChange = (value) => {
    this.setState({
      titleValue: value.replace(/[^ \w]+/g, ''),
      isErrorTitle: false,
    });
  }

  handleSelectChange = (value) => {
    this.setState({
      userValue: +value,
      isErrorUser: false,
    });
  }

  render() {
    const {
      todosList,
      usersList,
      titleValue,
      userValue,
      isErrorTitle,
      isErrorUser,
    } = this.state;

    return (
      <div>
        <NewTodo
          users={usersList}
          handleSubmitNewTodo={this.handleSubmitNewTodo}
          handleInputChange={this.handleInputChange}
          handleSelectChange={this.handleSelectChange}
          titleValue={titleValue}
          userValue={userValue}
          isErrorTitle={isErrorTitle}
          isErrorUser={isErrorUser}
        />
        <TodoList todos={todosList} />
      </div>
    );
  }
}

export default App;
