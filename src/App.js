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

  addTodo = (newTodo) => {
    this.setState(prevState => ({
      todosList: [...prevState.todosList, newTodo],
    }));
  }

  render() {
    const {
      usersList, todosList,
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
            todos={todosList}
            addTodo={this.addTodo}
          />
        </div>
      </>
    );
  }
}

export default App;
