import React from 'react';
import './App.css';

import users from './api/api-users';
import todos from './api/api-todos';

import NewTodo from './Components/NewTodo/NewTodo';
import TodoList from './Components/TodoList/TodoList';

const preparedTodos = getTodosWithUsers(todos, users);

function getTodosWithUsers(todos, usersList) {
  return todos.map(todo => (
    {
      ...todo,
      user: usersList.find(user => user.id === todo.userId),
    }
  ));
}

class App extends React.Component {
  state = {
    todos: [...preparedTodos],
  }

  addNewTodo = (todo) => {
    this.setState(prevState => ({
      todos: [...prevState, todo],
    }));
  }

  render() {
    const { todos } = this.state;

    return (
      <>
        <div className="app">
          <h1>Static list of todos</h1>
          <p>
            <span>TODOs: </span>
            {todos.length}
          </p>
        </div>
        <NewTodo
          users={users}
          addNewTodo={this.addNewTodo}
        />
        <TodoList todos={todos} />
      </>
    );
  }
}

export default App;
