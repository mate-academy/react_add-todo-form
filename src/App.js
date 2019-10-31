import React from 'react';
import './App.css';

import usersApi from './api/users';
import todosApi from './api/todos';
import TodoList from './components/todoList/TodoList';
import AddTodo from './components/addTodo/AddTodo';

class App extends React.Component {
  state = {
    todosData: this.getTodosData(todosApi, usersApi),
  };

  getTodosData(todos, users) {
    return todos.map(todo => ({
      ...todo,
      user: users.find(user => user.id === todo.userId),
    }));
  }

  addTodo = (todoTitle, userName) => {
    this.setState((prevState) => {
      return ({
        ...prevState,
        todosData: [...prevState.todosData, {
          id: prevState.todosData.length + 1,
          title: todoTitle,
          completed: false,
          user: usersApi.find(user => user.name === userName),
        }],
      });
    });
  };

  render() {
    const passingDataForTodoList = this.state.todosData;

    return (
      <>
        <AddTodo users={usersApi} addTodoFunction={this.addTodo} />
        <TodoList todosData={passingDataForTodoList} />
      </>
    );
  }
}

export default App;
