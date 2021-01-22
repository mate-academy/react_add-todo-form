import React from 'react';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';

import './App.scss';

import users from './api/users';
import todos from './api/todos';

const preparedTodos = todos.map(todo => (
  {
    ...todo,
    user: users.find(user => todo.userId === user.id),
  }
));

class App extends React.Component {
  state = {
    todoList: preparedTodos,
    todoId: todos.length,
  }

  addTodo = (newTodoName, newUserId) => {
    this.setState((state) => {
      const newTodo = {
        userId: newUserId,
        id: state.todoId + 1,
        title: newTodoName,
        completed: false,
        user: users.find(person => person.id === newUserId),
      };

      return ({
        todoList: [...state.todoList, newTodo],
        todoId: state.todoId + 1,
      });
    });
  }

  render() {
    const {
      todoList,
    } = this.state;

    return (
      <div className="App">
        <div className="main">
          <h1 className="main__title">Add todo to form</h1>
          <TodoForm
            users={users}
            addTodo={this.addTodo}
          />
          <TodoList todoList={todoList} />
        </div>
      </div>
    );
  }
}

export default App;
