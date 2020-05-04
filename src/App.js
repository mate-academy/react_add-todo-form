import React from 'react';
import './App.css';
import todosFromServer from './api/todos';
import TodoList from './TodoList';
import users from './api/users';
import NewTodo from './NewTodo';

const preparedTodos = todosFromServer.map((todo) => {
  const user = users.find(curUser => curUser.id === todo.userId);

  return {
    ...todo,
    name: user.name,
  };
});

class App extends React.Component {
  state = {
    todos: [...preparedTodos],
  }

  addTodo = (id, title, completed, user) => {
    this.setState(prev => ({
      todos: [
        ...prev.todos,
        {
          id,
          title,
          completed,
          user,
        },
      ],
    }));
  }

  render() {
    const { todos } = this.state;

    return (
      <div className="app">
        <div className="todo__add">
          <NewTodo users={users} addTodo={this.addTodo} id={todos.length + 1} />
        </div>
        <div className="todo__list">
          <TodoList todos={todos} />
        </div>
      </div>
    );
  }
}

export default App;
