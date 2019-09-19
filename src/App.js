import React from 'react';

import TodoList from './component/TodoList/TodoList';
import NewTodo from './component/NewTodo/NewTodo';

import './App.css';

import users from './api/users';
import todos from './api/todos';

const usersMap = users
  .reduce((acum, user) => ({ ...acum, [user.id]: user }), {});

function getTodosWithUsers(todosArray) {
  return todosArray.map(todo => ({
    ...todo,
    user: usersMap[todo.userId],
  }));
}

const preparedTodos = getTodosWithUsers(todos, users);

class App extends React.Component {
  state = {
    listTodos: [...preparedTodos],
    usersApi: [...users],
  }

  addNewTodo = (newTodo) => {
    this.setState(({ listTodos }) => ({
      listTodos: [...listTodos, {
        id: listTodos.length + 1,
        ...newTodo,
      },
      ],
    }));
  };

  render() {
    const {
      listTodos,
      usersApi,
    } = this.state;

    return (
      <div className="app">
        <div className="newtodo__wrapper">
          <NewTodo
            users={usersApi}
            addTodo={this.addNewTodo}
          />
        </div>

        <div className="todolist__wrapper">
          <TodoList todos={listTodos} />
        </div>
      </div>
    );
  }
}

export default App;
