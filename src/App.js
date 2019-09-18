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
  };

  handleChangeTitle = () => {
  };

  handleClickbutton = () => {
  };

  render() {
    const { usersList, todosList } = this.state;

    return (
      <>
        <h1 className="todos__title">
          Todos for different users, todos length:
          {todosList.length}
        </h1>

        <div className="todo-content">
          <TodoList todos={todosList} />
          <NewTodos
            users={usersList}
            handleChangeTitle={this.handleChangeTitle}
            handleClickbutton={this.handleClickbutton}
          />
        </div>
      </>
    );
  }
}

export default App;
