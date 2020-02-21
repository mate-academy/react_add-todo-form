import React from 'react';
import { NewTodo } from './components/NewTodo/NewTodo';
import { TodoList } from './components/TodoList/TodoList';
import 'bootswatch/dist/flatly/bootstrap.min.css';
import './App.css';
import './reset.css';

import users from './api/users';
import todos from './api/todos';

const todosUsers = todos.map(item => ({
  ...item,
  user: users[item.userId],
}));

export class App extends React.Component {
  state = {
    todoList: [...todosUsers],
  }

  handleSubmit = (e, obj) => {
    e.preventDefault();
    this.setState(prevState => ({ todoList: [
      ...prevState.todoList,
      obj,
    ] }));
  };

  handleCheck = (e) => {
    const checkedItemId = e.target.id;

    const currentItem = this.state.todoList
      .find(item => (`${item.id}`) === checkedItemId);

    const newTodos = this.state.todoList
      .map((item) => {
        if (item.id === currentItem.id) {
          return ({
            ...item,
            completed: e.target.checked,
          });
        }

        return item;
      });

    this.setState({
      todoList: [...newTodos],
    });
  }

  handleDelete = () => {
    const notReadyTodos = this.state.todoList.filter(todo => !todo.completed);

    this.setState(prevState => ({
      todoList: [...notReadyTodos],
    }));
  }

  render() {
    const { todoList } = this.state;

    return (
      <div className="container App">
        <h1 className="title">Add todo form</h1>
        <NewTodo
          users={users}
          submit={(e, obj) => this.handleSubmit(e, obj)}
          deleteDone={this.handleDelete}
        />
        <TodoList todos={todoList} onCheck={this.handleCheck} />
      </div>
    );
  }
}
