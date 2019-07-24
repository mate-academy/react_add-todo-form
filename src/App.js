import React from 'react';
import './App.css';
import users from './api/users';
import todos from './api/todos';
import TodoList from './TodoList';
import NewTodo from './NewTodo';

const prepared = () => {
  const todoWithUser = todos.map(todo => ({
    ...todo,
    userName: users
      .filter(user => user.id === todo.userId)
      .map(person => person.name),
  }));

  return todoWithUser;
};

class App extends React.Component {
  state = {
    todos: prepared(),
    counter: 3,
  };

  addTodo = (todo) => {
    this.setState(prevState => ({
      todos: [
        ...prevState.todos,
        {
          userName: todo.userName,
          title: todo.title,
          id: prevState.counter,
          completed: false,
        },
      ],
      counter: prevState.counter + 1,
    }));
  }

  render() {
    return (
      <div className="app">
        <NewTodo
          users={users}
          onSubmit={this.addTodo}
        />
        <h1>list of todos</h1>
        <div className="app-count">
          <p>Users: </p>
          {users.length}
        </div>
        <TodoList
          todos={this.state.todos}
        />
      </div>
    );
  }
}

export default App;
