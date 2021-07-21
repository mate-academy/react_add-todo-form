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
    this.setState(prevState => (
      prevState.todos.push(todo)
    ));
  }

  getUserName = (todo) => {
    const findUser = users.find(user => user.id === todo.userId);

    return findUser.name;
  }

  preperTodo = () => {
    const updateTodo = this.state.todos.map((todo) => {
      const userName = this.getUserName(todo);
      const changeTodo = {
        ...todo,
        userName,
      };

      return changeTodo;
    });

    return updateTodo;
  }

  render() {
    return (
      <div className="wraper">
        <TodoList
          todos={this.preperTodo()}
        />
        <TodoForm
          todos={this.state.todos}
          addTodo={this.addTodo}
          users={users}
        />
      </div>
    );
  }
}

export default App;
