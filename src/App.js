import React from 'react';
import './App.css';

import TodoList from './components/TodoList';
import NewTodo from './components/NewTodo';

import todos from './api/todos';
import users from './api/users';

const getUser = userId => (
  users.find(user => user.id === userId)
);

const todosWithUsers = todos.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

class App extends React.Component {
  state = {
    todos: todosWithUsers,
  };

  addTodo = (todo) => {
    this.setState(prevState => (
      {
        todos: [...prevState.todos, todo],
      }
    ));
  };

  render() {
    const { todosList } = this.state;

    return (
      <main>
        <div className="App">
          <h1>Static list of todos</h1>
          <p>
            <span>Users: </span>
            {users.length}
          </p>
        </div>

        <NewTodo
          onSubmit={this.addTodo}
          todos={todosList}
        />

        <TodoList
          allTodos={todosList}
        />

      </main>
    );
  }
}

export default App;
