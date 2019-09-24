import React from 'react';
import './App.css';

import users from './api/api-users';
import todos from './api/api-todos';

import NewTodo from './Components/NewTodo/NewTodo';
import TodoList from './Components/TodoList/TodoList';

function getTodosWithUsers(todos, users) {
  return todos.map(todo => (
    {
      ...todo,
      user: users.find(user => user.id === todo.userId),
    }
  ));
}

const preparedTodos = getTodosWithUsers(todos, users);

class App extends React.Component {
  state = {
    todos: [...preparedTodos],
  }

  handleAddNewTodo = (todo) => {
    this.setState(prevState => ({
      todos: [...prevState.todos, todo],
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
          addNewTodo={this.handleAddNewTodo}
        />
        <TodoList todos={todos} />
      </>
    );
  }
}

export default App;
