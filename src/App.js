import React from 'react';

import todos from './api/todos';
import users from './api/users';

import './App.css';

import TodoList from './components/TodoList/TodoList';
import Header from './components/Header/Header';
import NewTodo from './components/NewTodo/NewTodo';

class App extends React.Component {
  state = {
    usersList: [...users],
    todosList: [...todos],
    selectedUser: 0,
    inputTodoValue: '',
    inputTodoError: false,
    selectUserError: false,
  }

  addTodo = (event) => {
    event.preventDefault();
    const { inputTodoValue, selectedUser, todosList } = this.state;

    if (inputTodoValue && selectedUser !== 0) {
      this.setState({
        todosList: [
          ...todosList,
          {
            userId: Number(selectedUser),
            id: todosList.length + 1,
            title: inputTodoValue,
            completed: false,
          },
        ],
        selectedUser: 0,
        inputTodoValue: '',
      });
    } else {
      this.setState({
        selectUserError: selectedUser === 0,
        inputTodoError: !inputTodoValue,
      });
    }
  }

  onChangeSelectOfUser = ({ target: { value } }) => {
    if (value !== 0) {
      this.setState({
        selectedUser: Number(value),
        selectUserError: false,
      });
    } else {
      this.setState({
        selectedUser: Number(value),
      });
    }
  }

  onChangeInputOfTodo = ({ target: { value } }) => {
    if (value !== '') {
      this.setState({
        inputTodoValue: value,
        inputTodoError: false,
      });
    } else {
      this.setState({
        inputTodoValue: value,
      });
    }
  }

  getTodosWithUsers = (todosList, usersList) => (
    todosList.map(todo => ({
      ...todo,
      user: usersList.find(user => user.id === todo.userId),
    }))
  )

  render() {
    const {
      usersList,
      todosList,
      selectedUser,
      inputTodoValue,
      inputTodoError,
      selectUserError,
    } = this.state;
    const preparedTodos = this.getTodosWithUsers(todosList, usersList);

    return (
      <>
        <Header usersCount={usersList.length} todosCount={todosList.length} />
        <NewTodo
          usersList={usersList}
          selectedUser={selectedUser}
          addTodo={this.addTodo}
          inputTodoValue={inputTodoValue}
          onChangeSelectOfUser={this.onChangeSelectOfUser}
          onChangeInputOfTodo={this.onChangeInputOfTodo}
          inputTodoError={inputTodoError}
          selectUserError={selectUserError}
        />
        <TodoList preparedTodos={preparedTodos} />
      </>
    );
  }
}

export default App;
