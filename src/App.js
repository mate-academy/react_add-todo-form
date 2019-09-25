import React from 'react';
import './App.css';

import apiUsers from './api/apiUsers';
import apiTodos from './api/apiTodos';
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

const preparedTodos = getTodosWithUsers(apiTodos, apiUsers);

class App extends React.Component {
  state = {
    todos: [...preparedTodos],
  }

  handleAddingNewTodo = (todo) => {
    this.setState(prevState => ({
      todos: [...prevState.todos, todo],
    }));
  }

  render() {
    const { todos } = this.state;

    return (
      <section className="section-wrapper">
        <div className="app">
          <h1 className="main-title">Static list of todos</h1>

          <p className="title">
            <span>TODOs: </span>
            {todos.length}
          </p>
          <TodoList todos={todos} />
        </div>
        <NewTodo
          users={apiUsers}
          addNewTodo={this.handleAddingNewTodo}
        />
      </section>
    );
  }
}

export default App;
