import { Component } from 'react';
import './App.scss';
import { uuid } from 'uuidv4';

import users from './api/users';
import todos from './api/todos';

import { TodoList } from './components/TodoList';

const findUser = (userId: number) => {
  return users.find((user) => user.id === userId) || null;
};

const userTodos: Todo[] = todos.map((todo) => ({
  ...todo,
  uuid: uuid(),
  user: findUser(todo.userId),
}));

interface State {
  usersFromServer: User[];
  todoList: Todo[];
}

export class App extends Component<{}, State> {
  state: State = {
    usersFromServer: users,
    todoList: userTodos,
  };

  addTodo = (newTodo: Todo) => {
    this.setState((currentState: State) => {
      return {
        todoList: [...currentState.todoList, newTodo],
      };
    });
  };

  render() {
    const { usersFromServer, todoList } = this.state;

    return (
      <div className="center">
        <h1>Add todo form</h1>
        <TodoList
          addTodo={this.addTodo}
          todos={todoList}
          users={usersFromServer}
        />
      </div>
    );
  }
}
