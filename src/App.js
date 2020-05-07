import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';

import { TodoList } from './components/TodoList/TodoList';
import { NewTodo } from './components/NewTodo/NewTodo';

const findUserById = userId => (
  users.find(user => user.id === userId)
);

const preparedTodoList = todos.map(todosItem => ({
  ...todosItem,
  user: findUserById(todosItem.userId),
}));

export class App extends React.Component {
  state = {
    todoList: preparedTodoList,
  };

  addNewTodo = (newTodo) => {
    this.setState(state => (
      {
        todoList: [...state.todoList, newTodo],
      }
    ));
  }

  render() {
    const { todoList } = this.state;

    const lastTodoId = this.state.todoList[this.state.todoList.length - 1].id;

    return (
      <>
        <NewTodo
          users={users}
          addNewTodo={this.addNewTodo}
          lastTodoId={lastTodoId}
          findUserById={findUserById}
        />
        <div className="todos-container">
          <TodoList todoList={todoList} />
        </div>
      </>
    );
  }
}
