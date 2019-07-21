import React from 'react';
import './App.css';

import todos from './api/todos';
import users from './api/users';
import TodoList from './TodoList';
import NewTodo from './NewTodo';

const prepared = () => {
  const todowithUser = todos.map(todo => ({
    ...todo,
    userName: users
      .filter(user => user.id === todo.userId)
      .map(person => person.name),
  }));

  return todowithUser;
};

class App extends React.Component {
    state = {
      todos: prepared(),
    };

  addTodo = (todo) => {
    this.setState(prevState => ({
      todos: [
        ...prevState.todos,
        {
          userName: todo.userName,
          title: todo.title,
          id: prevState.todos.length + 1,
          completed: false,
        },
      ],
    }));
  }

  render() {
    return (
      <div className="App">
        <NewTodo
          users={users}
          onSubmit={this.addTodo}
        />
        <h1>Static list of todos</h1>
        <p>
          <span>Users: </span>
          {users.length}
        </p>
        <TodoList todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
