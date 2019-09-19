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
  }

  getTodosWithUsers = (todosList, usersList) => (
    todosList.map(todo => ({
      ...todo,
      user: usersList.find(user => user.id === todo.userId),
    }))
  )

  updatedTodosList = (newTodo) => {
    const { todosList } = this.state;

    this.setState({
      todosList: [
        ...todosList,
        {
          id: todosList.length + 1,
          ...newTodo,
        },
      ],
    });
  }

  render() {
    const {
      usersList,
      todosList,
    } = this.state;
    const preparedTodos = this.getTodosWithUsers(todosList, usersList);

    return (
      <>
        <Header usersCount={usersList.length} todosCount={todosList.length} />
        <NewTodo
          usersList={usersList}
          addTodo={this.addTodo}
          updatedTodosList={this.updatedTodosList}
        />
        <TodoList preparedTodos={preparedTodos} />
      </>
    );
  }
}

export default App;
