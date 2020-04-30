import React from 'react';
import './App.scss';
import TodoForm from './TodoForm';
import TodoList from './TodosList';

import users from './api/users';
import todos from './api/todos';

class App extends React.Component {
  state = {
    todos: todos.map(todo => ({
      ...todo,
      executant: users.find(user => user.id === todo.userId),
    })),
  }

  changeStatusComplete = (todoId) => {
    const { todos } = this.state;

    this.setState(() => ({
      todos: todos.map(todo => ({
        ...todo,
        completed: todo.id === todoId
          ? !todo.completed
          : todo.completed,
      })),
    }));
  }

  changeTodo = (todo) => {
    this.setState(() => ({ todos: todo }));
  }

  render() {
    const { todos, hiddenHint } = this.state;

    return (
      <div className="App todo">
        <TodoForm
          hiddenHint={hiddenHint}
          chooseUserName={this.chooseUserName}
          users={users}
          addNewTodo={this.addNewTodo}
          todos={todos}
          changeTodo={this.changeTodo}
        />
        <TodoList
          todos={todos}
          changeStatusComplete={this.changeStatusComplete}
        />
      </div>
    );
  }
}

export default App;
