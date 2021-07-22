import React from 'react';
import './App.css';
import TodoForm from './components/TodoForm/TodoForm';
import TodoList from './components/TodoList/TodoList';

import users from './api/users';
import todos from './api/todos';

class App extends React.Component {
  state = {
    todos: [...todos],
  }

  addTodo = (todo) => {
    this.setState({
      todos: [...todos, {
        id: todos.length + 1,
        ...todo,
      }],
    });
  }

  getUserName = (todo) => {
    const findUser = users.find(user => user.id === todo.userId);

    return findUser.name;
  }

  prepereTodos = (todosToUpdate) => {
    const result = todosToUpdate.map((todo) => {
      const userName = this.getUserName(todo);
      const changeTodo = {
        ...todo,
        userName,
      };

      return changeTodo;
    });

    return result;
  }

  render() {
    return (
      <div className="wraper">
        <TodoList todos={this.prepereTodos(this.state.todos)} />
        <TodoForm
          addTodo={this.addTodo}
          users={users}
        />
      </div>
    );
  }
}

export default App;
