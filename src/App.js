import React from 'react';

import TodoList from './component/TodoList/TodoList';
import NewTodo from './component/NewTodo/NewTodo';

import './App.css';

import usersApi from './api/users';
import todosApi from './api/todos';

const usersMap = usersApi
  .reduce((acum, user) => ({ ...acum, [user.id]: user }), {});

function getTodosWithUsers(todosArray) {
  return todosArray.map(todo => ({
    ...todo,
    user: usersMap[todo.userId],
  }));
}

const preparedTodos = getTodosWithUsers(todosApi, usersApi);

class App extends React.Component {
  state = {
    todos: [...preparedTodos],
    users: [...usersApi],
  }

  addNewTodo = (newTodo) => {
    this.setState(({ todos }) => ({
      todos: [...todos, {
        id: todos.length + 1,
        ...newTodo,
      }],
    }));
  };

  render() {
    const { todos, users } = this.state;

    return (
      <div className="app">
        <div className="newtodo__wrapper">
          <NewTodo
            users={users}
            addTodo={this.addNewTodo}
          />
        </div>

        <div className="todolist__wrapper">
          <TodoList todos={todos} />
        </div>
      </div>
    );
  }
}

export default App;
