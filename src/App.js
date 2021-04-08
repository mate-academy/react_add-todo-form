import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';
import { AddTodoForm } from './components/AddTodoForm';
import TodoList from './components/TodoList';

const getUserById = userId => (
  users.find(user => userId === user.id)
);

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: getUserById(todo.userId)
}));

console.log(preparedTodos);

class App extends React.PureComponent {
  state = {
    todos: preparedTodos,
  }

  addTodo = (newTodoTitle, selectedNameId) => {
    this.setState(({ todos }) => {
      const newTodo = {
        id: todos.length + 1,
        title: newTodoTitle,
        completed: false,
        userId: selectedNameId,
        user: {
          name: getUserById(selectedNameId).name,
        },
      };

      return {
        todos: [newTodo, ...todos],
      };
    });
  }

  render() {
    const { todos } = this.state;

  return (
    <div className="App shadow-sm p-3 mb-5 bg-body rounded">
      <h1>Add todo form</h1>
      <AddTodoForm addTodo={this.addTodo} />
      <TodoList todos={todos}/>
    </div>
  );
  }
}

export default App;