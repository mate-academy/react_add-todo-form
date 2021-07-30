import React from 'react';
import { TodosList } from './components/TodosList';
import './App.css';

import users from './api/users';
import todos from './api/todos';
import { AddTodoForm } from './components/AddTodoForm';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

export class App extends React.Component {
    state = {
      todoList: preparedTodos,
      userList: [...users],
      id: preparedTodos[preparedTodos.length - 1].id + 1,
    }

    addTodo = (title, selected) => {
      const curentUser = users.find(user => (
        user.name === selected
      ));

      this.setState(state => ({
        todoList: [
          ...state.todoList,
          {
            userId: curentUser.id,
            id: state.id,
            comleted: false,
            title,
            user: curentUser,
          },
        ],
        id: state.id + 1,
      }));
    }

    render() {
      const { todoList, userList } = this.state;

      return (
        <div className="App">
          <h1>Add todo form</h1>

          <AddTodoForm
            userList={userList}
            addTodo={this.addTodo}
          />
          <TodosList todoList={todoList} />
        </div>
      );
    }
}
